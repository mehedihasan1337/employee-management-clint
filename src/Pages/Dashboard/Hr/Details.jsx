import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const Details = () => {
    const { slug } = useParams(); 
    const axiosSecure = useAxiosSecure();

    const { data: userEmployees, isLoading, error } = useQuery({
        queryKey: ['userEmployees',slug],
        queryFn: async () => {
          const res = await axiosSecure.get(`/employees/${slug}`);
          return res.data;
        },
        enabled: !!slug,
      });
  
    // Loading and error states
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data: {error.message}</p>;

    return (
        <div className="p-4">
      {userEmployees && userEmployees.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold">{userEmployees[0].name}</h2>
          <p>Email: {userEmployees[0].email}</p>
          <p>Designation: {userEmployees[0].designation}</p>
          <img
            src={userEmployees[0].photoURL}
            alt={userEmployees[0].name}
            className="rounded-full w-24 h-24 my-2"
          />

          <h3 className="text-xl font-semibold">Salary History</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={userEmployees.map((employee) => ({
                monthYear: `${employee.month} ${employee.year}`,
                salary: employee.salary,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthYear" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="salary" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>No records found for this email.</p>
      )}
    </div>
    );
};

export default Details;
