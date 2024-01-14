import React, { useEffect, useState } from 'react';
import { LOGIN, SIGN_UP } from '../constants/utils';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const authenticationHandler = async (e) => {
    try {
      e.preventDefault();
      if (isLogin) {
        const res = await fetch(LOGIN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });
        const data = await res.json();
        if (data.ErrorMessage) {
          alert(data.ErrorMessage);
          return;
        }
        console.log('auth ', data.token);
        setAuthToken(data.authToken);
        localStorage.setItem('token', data.token);
        navigate('/Home');
      } else {
        const res = await fetch(SIGN_UP, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        });
        const data = await res.json();
        if (data.ErrorMessage) {
          alert(data.ErrorMessage);
          return;
        }
        console.log('data from auth', data);
        setAuthToken(data.token);
        localStorage.setItem('token', data.token);
        navigate('/Home');
      }
    } catch (err) {
      console.log('error', err);
      alert(err);
    }
  };

  console.log('form is here', form);

  const changeAuthHandler = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className='rounded-xl flex items-center mt-28 justify-center bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md w-96'>
          {isLogin ? (
            <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
          ) : (
            <h2 className='text-2xl font-bold mb-4 text-center'>SignUp</h2>
          )}
          <form onSubmit={authenticationHandler}>
            <div className='mb-4'>
              {!isLogin && (
                <>
                  <label
                    htmlFor='name'
                    className='block text-gray-700 text-sm font-bold mb-2'>
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    value={form.name}
                    name='name'
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
                  />
                </>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block text-gray-700 text-sm font-bold mb-2'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block text-gray-700 text-sm font-bold mb-2'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                value={form.password}
                className='w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500'
              />
            </div>
            <div className='text-center'>
              <button
                type='submit'
                className='bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-900 focus:outline-none focus:shadow-outline-blue'>
                {isLogin ? 'Login' : 'SignUp'}
              </button>
            </div>
            <div className='text-center'>
              <button
                type='submit'
                className='bg-blue-900 mt-5 text-white py-2 px-4 rounded-md hover:bg-blue-900 focus:outline-none focus:shadow-outline-blue'
                onClick={changeAuthHandler}>
                {isLogin
                  ? 'Dont have account?Signup'
                  : 'Login if you already have account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
