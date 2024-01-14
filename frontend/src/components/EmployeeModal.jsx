import React, { useEffect, useState } from 'react';
import { ADD_EMPLOYEE, EDIT_EMPLOYEE } from '../constants/utils';

const ProductModal = ({
  heading,
  isOpen,
  setIsOpen,
  editData,
  setTotalEmployees,
  totalEmployees,
  setTriggerRefresh,
  setFilteredSearch,
}) => {
  console.log('modal heading is here', heading);
  const [form, setForm] = useState({
    name: '',
    salary: 0,
    designation: '',
    contactNo: 0,
    Age: 0,
    imageUrl: '',
  });

  useEffect(() => {
    setForm({
      name: editData.name,
      Age: editData.age,
      salary: editData.salary,
      imageUrl: editData.pic,
      contactNo: editData.contactNo,
      designation: editData.designation,
    });
  }, [editData]);

  console.log('editData', editData);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (heading === 'Add Employee') {
      const res = await fetch(ADD_EMPLOYEE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          age: form.Age,
          salary: form.salary,
          imgUrl: form.imageUrl,
          contactNo: form.contactNo,
          designation: form.designation,
        }),
      });
      const data = await res.json();
      console.log('data after employee adding', data);
      setTriggerRefresh(true);
    } else {
      let editedEmployeeList = totalEmployees.map((itm) => {
        if (itm._id === editData._id) {
          return {
            _id: editData._id,
            name: form.name,
            age: form.Age,
            salary: form.salary,
            pic: form.imageUrl,
            contactNo: form.contactNo,
            designation: form.designation,
          };
        }
        return itm;
      });
      setTotalEmployees(editedEmployeeList);
      setFilteredSearch(editedEmployeeList);
      const res = await fetch(EDIT_EMPLOYEE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editData._id,
          name: form.name,
          age: form.Age,
          salary: form.salary,
          imgUrl: form.imageUrl,
          contactNo: form.contactNo,
          designation: form.designation,
        }),
      });
      const data = await res.json();
      console.log('data edited from backend', data);
    }
    setIsOpen(false);
    setForm({
      name: '',
      salary: 0,
      designation: '',
      contactNo: 0,
      Age: 0,
      imageUrl: '',
    });
  };
  return (
    <>
      {isOpen && (
        <div
          id='crud-modal'
          tabIndex='-1'
          aria-hidden='true'
          className=' overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full'>
          <div className='relative p-4 ml-[26rem] mt-16 w-full max-w-md max-h-full'>
            {/* Modal content */}
            <div className='relative bg-gradient-to-r from-blue-900 to-blue-950 rounded-lg shadow dark:bg-blue-900'>
              {/* Modal header */}
              <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {heading ? heading : 'Add Employee'}
                </h3>
                <button
                  type='button'
                  className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  data-modal-toggle='crud-modal'
                  onClick={() => setIsOpen(false)}>
                  <svg
                    className='w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'>
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'></path>
                  </svg>
                  <span className='sr-only'>Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form
                className='p-4 md:p-5'
                onSubmit={formSubmitHandler}>
                <div className='grid gap-4 mb-4 grid-cols-2'>
                  <div className='col-span-2'>
                    <label
                      htmlFor='name'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                      Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-950 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Type product name'
                      required=''
                    />
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <label
                      htmlFor='price'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                      Age
                    </label>
                    <input
                      type='text'
                      name='Age'
                      value={form.Age}
                      onChange={(e) =>
                        setForm({ ...form, Age: e.target.value })
                      }
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-950 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='$2999'
                      required=''
                    />
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <label
                      htmlFor='category'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                      Designation
                    </label>
                    <input
                      type='text'
                      name='designation'
                      value={form.designation}
                      onChange={(e) =>
                        setForm({ ...form, designation: e.target.value })
                      }
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-950 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='software engineer'
                      required=''
                    />
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <label
                      htmlFor='price'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                      Salary
                    </label>
                    <input
                      type='text'
                      name='salary'
                      value={form.salary}
                      onChange={(e) =>
                        setForm({ ...form, salary: e.target.value })
                      }
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-950 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='$2999'
                      required=''
                    />
                  </div>
                  <div className='col-span-2 sm:col-span-1'>
                    <label
                      htmlFor='place'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                      Contact No
                    </label>
                    <input
                      type='text'
                      name='contact'
                      value={form.contactNo}
                      onChange={(e) =>
                        setForm({ ...form, contactNo: e.target.value })
                      }
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-950 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='9045989333'
                      required=''
                    />
                  </div>
                  <div className='col-span-2'>
                    <label
                      htmlFor='description'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                      ImageUrl
                    </label>
                    <input
                      type='text'
                      name='imageUrl'
                      value={form.imageUrl}
                      onChange={(e) =>
                        setForm({ ...form, imageUrl: e.target.value })
                      }
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-950 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='https://image.com'
                      required=''
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  className='text-white inline-flex items-center bg-gradient-to-r from-blue-900 to-blue-950 hover:bg-blue-950 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:from-blue-950 dark:to-blue-950 dark:hover:bg-blue-800 dark:focus:ring-blue-900'>
                  {heading !== 'update' && (
                    <svg
                      className='me-1 -ms-1 w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fill-rule='evenodd'
                        d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                        clip-rule='evenodd'></path>
                    </svg>
                  )}
                  {heading === 'update'
                    ? 'Update Employee'
                    : 'Add new Employee'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
