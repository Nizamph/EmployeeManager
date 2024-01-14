import React, { useState } from 'react';

const DeleteModal = ({
  deleteDataHandler,
  isDeleteModalOpen,
  setIsDeleteModal,
}) => {
  const onCloseHandler = () => {
    setIsDeleteModal(false);
  };
  return (
    <>
      {isDeleteModalOpen && (
        <div>
          <div
            id='popup-modal'
            tabIndex='-1'
            className='  flex  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
            <div className='relative p-4 w-full max-w-md max-h-full'>
              <div className='relative bg-gradient-to-r from-blue-950 to-blue-700 rounded-lg shadow dark:bg-gradient-to-r dark:from-blue-950 dark:to-blue-900'>
                <button
                  type='button'
                  onClick={onCloseHandler}
                  className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  data-modal-hide='popup-modal'>
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
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                    />
                  </svg>
                  <span className='sr-only'>Close modal</span>
                </button>
                <div className='p-4 md:p-5 text-center'>
                  <svg
                    className='mx-auto mb-4 text-gradient text-white w-12 h-12 dark:text-gradient dark:text-gray-200'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'>
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                  <h3 className='mb-5 text-gradient text-lg font-normal text-white dark:text-gradient dark:text-gray-400'>
                    Are you sure you want to delete this product?
                  </h3>
                  <button
                    data-modal-hide='popup-modal'
                    type='button'
                    className=' mr-4 bg-gradient-to-r from-red-950 to-blue-950 text-white hover:from-red-800 hover:to-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2'
                    onClick={deleteDataHandler}>
                    Yes, I'm sure
                  </button>
                  <button
                    data-modal-hide='popup-modal'
                    type='button'
                    onClick={onCloseHandler}
                    className='ml-5 text-white bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gradient-to-r dark:from-blue-00 dark:to-blue-400 dark:hover:from-blue-700 dark:hover:to-blue-500 dark:focus:ring-blue-800'>
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
