import 'tailwindcss/base.css'; // Import the base styles
import 'tailwindcss/components.css'; // Import the component styles
import 'tailwindcss/utilities.css';
import SignUp from './components/SignUp';

export default function App() {
  return (
    <div className='bg-gradient-to-b flex justify-center items-center to-indigo-950 from-black min-h-screen'>
      <SignUp />
    </div>
  );
}
