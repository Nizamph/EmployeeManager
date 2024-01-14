import React from 'react';

const Table = ({ allData }) => {
  return (
    <table className='min-w-full rounded-lg font-roboto  bg-gradient-to-r mt-32 from-blue-800 to-lightBlue-500 text-white'>
      <thead>
        <tr>
          <th className='px-6 py-3 text-left'>Name</th>
          <th className='px-6 py-3 text-left'>Contact No</th>
          <th className='px-6 py-3 text-left'>Salary</th>
        </tr>
      </thead>
      <tbody className='bg-gradient-to-r mt-32 from-blue-750 to-lightBlue-800 divide-y divide-gray-200'>
        {allData.map((itm) => (
          <tr key={itm._id}>
            <td className='px-6 py-4 whitespace-nowrap'>{itm.name}</td>
            <td className='px-6 py-4 whitespace-nowrap'>{itm.contactNo}</td>
            <td className='px-6 py-4 whitespace-nowrap'>${itm.salary}</td>
          </tr>
        ))}
        {/* Add more rows as needed */}
      </tbody>
    </table>
  );
};

export default Table;
