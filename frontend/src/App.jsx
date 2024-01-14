import 'tailwindcss/base.css'; // Import the base styles
import 'tailwindcss/components.css'; // Import the component styles
import 'tailwindcss/utilities.css';
import Auth from './components/Auth';
import { Route, Routes } from 'react-router-dom';
import SalaryList from './components/SalaryList';
import Home from './components/Home';
import Header from './components/Header';

export default function App() {
  return (
    <div className='bg-gradient-to-b to-indigo-950 from-black min-h-screen'>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<Auth />}
        />
        <Route
          path='/Home'
          element={<Home />}
        />
        <Route
          path='/salarylist'
          element={<SalaryList />}
        />
      </Routes>
    </div>
  );
}
