import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import QuestionWrapper from './QuestionWrapper';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/question/:questionId' element={<QuestionWrapper />} />
        <Route
          path='*'
          element={
            <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
              <div className='text-center'>
                <h1 className='text-4xl font-bold text-gray-800 mb-4'>
                  404 - Page Not Found
                </h1>
                <p className='text-gray-600 mb-6'>
                  The page you're looking for doesn't exist.
                </p>
                <button
                  onClick={() => (window.location.href = '/')}
                  className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                >
                  Go Home
                </button>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
