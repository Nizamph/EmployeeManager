import React, { useEffect, useState } from 'react';
import EmployeeCard from './EmployeeCard';
import { DELETE_EMPLOYEE, GET_ALL_EMPLOYEES } from '../constants/utils';
import EmployeeModal from './EmployeeModal';
import DeleteModal from './DeleteModal';
import Search from './Search';

const Home = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalHeading, setModalheading] = useState('');
  const [editData, setEditData] = useState({});
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [filteredSearch, setFilteredSearch] = useState(allEmployees);
  const [searchValues, setSearchValues] = useState({
    category: 'category',
    search: '',
  });
  useEffect(() => {
    getAllEmployees();
  }, [triggerRefresh]);

  useEffect(() => {
    if (!searchValues.search) {
      setFilteredSearch(allEmployees);
    }
  }, [searchValues.search]);

  console.log('searchValues', searchValues);
  const getAllEmployees = async () => {
    const res = await fetch(GET_ALL_EMPLOYEES);
    const data = await res.json();
    console.log('data is here', data.allEmployees);
    setAllEmployees(data.allEmployees);
    setFilteredSearch(data.allEmployees);
  };

  console.log('editData is here', editData);
  console.log('filteredSearch', filteredSearch);
  const addEmployeeHandler = () => {
    setModalheading('Add Employee');
    setIsModalOpen(true);
    setTriggerRefresh(false);
  };

  const handleDelete = async (editData) => {
    console.log('inside handle delete data', editData);
    const dataAfterDelete = allEmployees.filter((itm) => {
      return itm._id !== editData._id;
    });
    console.log('data after delete', dataAfterDelete);
    setAllEmployees(dataAfterDelete);
    setFilteredSearch(dataAfterDelete);
    const res = await fetch(DELETE_EMPLOYEE, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: editData._id,
      }),
    });
    const data = await res.json();
    console.log('data backend delete', data);
    setIsDeleteModalOpen(false);
  };

  console.log('all employees', allEmployees);

  const handleSearch = () => {
    if (searchValues.category === 'position') {
      let filteredArray = filteredSearch.filter((itm) =>
        itm.designation
          .toUpperCase()
          .includes(searchValues.search.toUpperCase())
      );
      setFilteredSearch(filteredArray);
    } else {
      let filteredArray = allEmployees.filter((itm) =>
        itm.name.toUpperCase().includes(searchValues.search.toUpperCase())
      );
      setFilteredSearch(filteredArray);
    }
  };
  return (
    <div className='flex flex-col justify-start gap-4 items-center'>
      <Search
        searchValue={searchValues.search}
        setSearchValue={setSearchValues}
        handleSearch={handleSearch}
      />

      <div className='w-full max-h-6 p-4 m-4 mt-9 flex justify-center items-center'>
        <button
          className='bg-gradient-to-r from-blue-900 to-blue-700 text-light-blue-300 shadow-lg px-8 py-4 font-bold text-lg rounded-md'
          onClick={addEmployeeHandler}>
          Add Employee
        </button>
      </div>

      <EmployeeModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        editData={editData}
        heading={modalHeading}
        setTotalEmployees={setAllEmployees}
        setFilteredSearch={setFilteredSearch}
        totalEmployees={allEmployees}
        setTriggerRefresh={setTriggerRefresh}
      />
      <DeleteModal
        deleteDataHandler={() => handleDelete(editData)}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModal={setIsDeleteModalOpen}
      />

      <div className='w-full p-9 m-4 justify-start flex gap-5 flex-wrap'>
        {filteredSearch.map((itm) => (
          <>
            <EmployeeCard
              key={itm._id}
              details={itm}
              setIsModalOpen={setIsModalOpen}
              setEditData={setEditData}
              setModalHeading={setModalheading}
              setIsDeleteModal={setIsDeleteModalOpen}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default Home;
