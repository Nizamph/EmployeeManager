import React, { useState } from 'react';

const Search = ({ searchValue, setSearchValue, handleSearch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentDropdown, setCurrentDropdown] = useState('Category');
  const categories = [
    { id: 1, value: 'position', label: 'Position' },
    { id: 2, value: 'name', label: 'Name' },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onChangeHandler = (e) => {
    setSearchValue((prevValue) => {
      return { ...prevValue, search: e.target.value };
    });
  };

  return (
    <div className='flex items-center mt-28 space-x-4'>
      <div className='relative inline-block text-left'>
        <button
          type='button'
          onClick={toggleDropdown}
          className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-200 bg-transparent border border-gray-300 rounded-md shadow-sm hover:from-blue-950 to-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-transparent dark:text-white dark:border-gray-600'
          id='category-dropdown'
          aria-haspopup='true'
          aria-expanded={isDropdownOpen}>
          {currentDropdown}
          <svg
            className={`w-4 h-4 ml-2 -mr-1 text-gray-600 transform transition-transform ${
              isDropdownOpen ? 'rotate-180' : 'rotate-0'
            }`}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 9l-7 7-7-7'></path>
          </svg>
        </button>
        {isDropdownOpen && (
          <div
            className='origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-transparent ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:bg-transparent'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='category-dropdown'>
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => {
                  setCurrentDropdown(category.value);
                  setIsDropdownOpen(false);
                  setSearchValue((prevValue) => {
                    return { ...prevValue, category: category.value };
                  });
                }}
                className='py-1 hover:bg-gradient-to-r cursor-pointer from-blue-950 to-blue-900 rounded-md'>
                <button
                  type='button'
                  className='text-gray-400 block px-4 py-2 text-sm  dark:hover:text-white'
                  role='menuitem'>
                  {category.label}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        type='search'
        value={searchValue}
        onChange={onChangeHandler}
        className='bg-transparent border-none w-[300px] placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:border-none focus:ring-0'
        placeholder='Search by Position or Name...'
      />

      <button
        type='button'
        onClick={handleSearch}
        className='bg-gray-400 text-white px-4 py-2 text-sm font-medium rounded-md shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600'>
        Search
      </button>
    </div>
  );
};

export default Search;
