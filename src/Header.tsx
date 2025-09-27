import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const goHome = () => navigate('/');

  return (
    <div className='flex items-center gap-4 mb-8'>
      <button
        onClick={goHome}
        className='p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all'
      >
        <ArrowLeft className='w-6 h-6 text-gray-600' />
      </button>
      <div>
        <h1 className='text-3xl font-bold text-gray-800'>Todo App</h1>
      </div>
    </div>
  );
};

export default Header;
