import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Progress = () => {
const axiosSecure=useAxiosSecure()
    const { data: sheets = [] } = useQuery({
        queryKey: ['sheets'],
        queryFn: async () => {
            const res = await axiosSecure.get('/sheets')
            return res.data
        }
        
    })

    const [selectedName, setSelectedName] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const handleNameChange = (e) => setSelectedName(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleYearChange = (e) => setSelectedYear(e.target.value);


  const handleReset = () => {
    setSelectedName('');
    setSelectedMonth('');
    setSelectedYear('');
  };

    // Filter logic
    const filteredSheets = sheets.filter((sheet) => {
      const sheetDate = new Date(sheet.date);
      const matchesName = selectedName ? sheet.name === selectedName : true;
      const matchesMonth = selectedMonth
        ? sheetDate.getMonth() + 1 === parseInt(selectedMonth)
        : true;
      const matchesYear = selectedYear
        ? sheetDate.getFullYear() === parseInt(selectedYear)
        : true;
  
      return matchesName && matchesMonth && matchesYear;
    });
    return (
        <div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-4">
        {/* Employee Name */}
        <select
          name="employee"
          id="employee"
          value={selectedName}
          onChange={handleNameChange}
          className="border font-bold text-2xl  p-4 rounded-lg"
        >
          <option value="">Filter by Employee</option>
          {Array.from(new Set(sheets.map((sheet) => sheet.name))).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        {/* Month */}
        <select
          name="month"
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border font-bold text-2xl  p-4 rounded-lg"
        >
          <option value="">Filter by Month</option>
          {[...Array(12).keys()].map((month) => (
            <option key={month + 1} value={month + 1}>
              {new Date(0, month).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>

        {/* Year */}
        <select
          name="year"
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          className="border font-bold text-2xl  p-4 rounded-lg"
        >
          <option value="">Filter by Year</option>
          {Array.from(new Set(sheets.map((sheet) => new Date(sheet.date).getFullYear()))).map(
            (year) => (
              <option key={year} value={year}>
                {year}
              </option>
            )
          )}
        </select>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="bg-green-500 font-bold text-2xl  text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Reset
        </button>
      </div>
            <h2 className='font-roboto  lg:text-3xl mb-3
             text-black font-bold text-xs md:text-lg'> Employee: {filteredSheets?.length}</h2>
              <div className="overflow-x-auto w-60 sm:w-96 md:w-11/12 lg:w-full  text-xs">
        <table className="table table-xs font-roboto ">
          {/* head */}
          <thead>
            <tr className='font-roboto font-semibold text-whitetext-xs md:text-lg' >
              <th className='text-center bg-blue-500'>No</th>
              <th className='text-center bg-blue-600'>Name</th>
              <th className='text-center bg-blue-500'>Email</th>
              <th className='text-center bg-blue-600'>Tasks</th>
              <th className='text-center bg-blue-500'>Hours</th>
              <th className='text-center bg-blue-600'>Date</th>
             
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              filteredSheets.map((sheet, index) => <tr className='font-roboto font-semibold text-black '  key={sheet._id}>
                <th className='text-xs md:text-lg text-center ' >{index + 1}</th>
                <td className='text-xs md:text-lg bg-slate-200'>{sheet.name}</td>
                <td className='text-xs md:text-lg '>{sheet.email}</td>
                <td className='text-xs md:text-lg  bg-slate-200'>{sheet.tasks}</td>
                <td className='text-xs md:text-lg text-center '>{sheet.hours}</td>
                <td className='text-xs md:text-lg  bg-slate-200'>{sheet.date}</td>
               
              </tr>)
            }

          </tbody>
        </table>
      </div>
        </div>
    );
};

export default Progress;