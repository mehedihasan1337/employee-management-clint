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
    const [isLoading, setIsLoading] = useState(false);
  
    const axiosSecure = useAxiosSecure();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) return;
  
      const card = elements.getElement(CardElement);
      if (!card) return;
  
      try {
        setIsLoading(true);
        // Create Payment Intent
        const { data } = await axiosSecure.post('/create-payment-intent', { amount });
        const { clientSecret } = data;
  
        // Confirm Payment
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name,
              email,
            },
          },
        });
  
        if (error) {
          setErrorMessage(error.message);
          return;
        }
  
        if (paymentIntent.status === 'succeeded') {
          setPaymentSuccess(true);
          const payment = {
            email,
            name,
            photoURL,
            salary: amount,
            month,
            year,
            designation,
            transactionId: paymentIntent.id,
            date: new Date(),
            status: 'pending',
          };
  
          await axiosSecure.post('/payments', payment);
        }
      } catch (err) {
        setErrorMessage('Failed to process payment. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
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
          />
          <button
            className="btn text-2xl btn-primary"
            type="submit"
            disabled={!stripe || isLoading}
          >
            {isLoading ? 'Processing...' : `Pay $${amount}`}
          </button>
          {paymentSuccess && <p style={{ color: 'green' }}>Payment successful!</p>}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </div>
    );
  };
  
  export default CheckoutForm;