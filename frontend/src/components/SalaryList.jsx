import React, { useEffect, useState } from 'react';
import Table from './Table';
import { PAGINATED_DATA } from '../constants/utils';

const SalaryList = () => {
  const [pageCount, setPageCount] = useState(1);
  const [pagiLimit, setPagiLimit] = useState(10);
  const [totalLimit, setTotalLimit] = useState(0);
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    getPaginationDataHandler();
  }, [pageCount]);

  const getPaginationDataHandler = async () => {
    const res = await fetch(
      `${PAGINATED_DATA}?page=${pageCount}&limit=${pagiLimit}`
    );
    const data = await res.json();
    console.log('data', data);
    setTotalLimit(data.totalLimit);
    setAllData(data.paginatedData);
  };

  console.log('totalLimit', totalLimit);
  return (
    <div className='flex flex-col p-4 w-full '>
      <Table allData={allData} />
      <div className='flex w-full mt-6 justify-end '>
        <div className='flex items-center gap-2'>
          {pageCount > 1 && (
            <button
              className='w-12 h-8 bg-white border border-gray-300 rounded-xl'
              onClick={() => {
                if (pageCount > 1) {
                  setPageCount((prev) => prev - 1);
                }
              }}>
              ◀️
            </button>
          )}
          {Array(Math.ceil(totalLimit / pagiLimit))
            .fill('')
            .map((_, i) => (
              <>
                <button
                  className={`w-12 h-8 ${
                    i + 1 === pageCount
                      ? 'bg-blue-500  text-white font-semibold'
                      : 'bg-white border'
                  }   border-gray-300 rounded-xl`}
                  onClick={() => setPageCount(i + 1)}>
                  {i + 1}
                </button>
              </>
            ))}
          {pageCount < Math.ceil(totalLimit / pagiLimit) && (
            <button
              className='w-12 h-8 bg-white border border-gray-300 rounded-xl'
              onClick={() => {
                if (pageCount < Math.ceil(totalLimit / pagiLimit)) {
                  setPageCount((prev) => prev + 1);
                }
              }}>
              ▶️
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalaryList;
