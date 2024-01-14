import React from 'react';

const EmployeeCard = ({
  details,
  setIsModalOpen,
  setEditData,
  setModalHeading,
  setIsDeleteModal,
}) => {
  const editHandler = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    setEditData(details);
    setModalHeading('update');
  };
  const handleDelete = (e) => {
    e.preventDefault();
    setEditData(details);
    setIsDeleteModal(true);
  };
  return (
    <div className='max-w-xl w-64 mx-auto bg-gradient-to-r from-blue-950 to-blue-900 rounded-md overflow-hidden shadow-lg'>
      {/* Employee Image */}
      {details.pic && (
        <img
          className='w-full h-48 object-cover'
          src={details.pic}
          alt={`Image of ${details.name}`}
        />
      )}

      {/* Employee Information */}
      <div className='p-4'>
        {/* Employee Name */}
        <h2 className='text-white text-2xl font-bold mb-2'>{details.name}</h2>

        {/* Employee Age */}
        <p className='text-gray-300 text-sm mb-2'>Age: {details.age}</p>

        {/* Employee Designation */}
        <p className='text-gray-300 text-sm mb-2'>
          Position: {details.designation}
        </p>

        {/* Employee Place */}
        <p className='text-gray-300 text-sm mb-2'>
          Contact: {details.contactNo}
        </p>

        {/* Employee Salary */}
        <p className='text-gray-300 text-sm mb-4'>Salary: ${details.salary}</p>

        {/* Edit and Delete Buttons */}
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue'
            type='button'
            onClick={editHandler}>
            Edit
          </button>
          <button
            onClick={handleDelete}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red'
            type='button'>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
