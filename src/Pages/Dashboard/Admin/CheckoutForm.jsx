import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import usePay from '../../../hooks/usePay';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = ({ amount,name,email,month,year ,photoURL,designation }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
   
    const axiosSecure =useAxiosSecure()
  
  

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {    
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        // 
        try {
            // Use Axios to call the backend for creating a payment intent
            const response = await axiosSecure.post('/create-payment-intent', {
              amount, 
            });
      
            const { clientSecret } = response.data;
            console.log("Amount to be charged:", amount);
            console.log("Stripe client secret:", clientSecret);
            // Confirm the payment
            const {paymentIntent,email:confirmError} = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                card: card,
                billing_details: {
                  name:name, 
                  email:email,
               

                },
              },
             
            });
            if(confirmError){
                console.log('confirm error')
              }
              else{
                console.log('payment intent',paymentIntent)
                if(paymentIntent.status === 'succeeded'){
                    console.log('transaction id', paymentIntent.id)
                    const payment={
                        email:email,
                        name:name,
                        photoURL:photoURL,
                        salary:amount,
                        month:month, 
                        year:year,
                        designation:designation,
                        transactionId:paymentIntent.id,
                        date:new Date(),
                        status:'pending'
        
                      }
                      const res= await axiosSecure.post('/payments',payment)
                      console.log('payment save',res)
                }
              }
         
          } catch (error) {
            setErrorMessage('Failed to process payment. Please try again.');
            console.error('Payment Error:', error);
          }

    }
   

    return (
        <div>
            <form onSubmit={handleSubmit}
                className="lg:flex-row flex-col gap-3 mt-3 lg:items-center">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                ></CardElement>
                <button className='btn text-2xl btn-primary' type="submit" disabled={!stripe }>
                    Pay  ${amount}
                    
                </button>
                {paymentSuccess && <p>Payment successful!</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;