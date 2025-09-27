import { Code, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { questions } from './questionList';

function Home() {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const startQuestion = (questionId: string) => {
    navigate(`/question/${questionId}`);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className='p-3 bg-blue-600 rounded-xl'>
              <Code className='w-8 h-8 text-white' />
            </div>
            <h1 className='text-4xl font-bold text-gray-800'>
              Machine Coding Practice
            </h1>
          </div>
        </div>

        {/* Questions Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {questions.map((question) => (
            <div
              key={question.id}
              className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 p-6`}
            >
              {/* Header */}
              <div className='flex items-start justify-between mb-4'>
                <div>
                  <h3 className='text-xl font-semibold text-gray-800 mb-1'>
                    {question.title}
                  </h3>
                  <div className='flex items-center gap-2'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                        question.difficulty
                      )}`}
                    >
                      {question.difficulty.charAt(0).toUpperCase() +
                        question.difficulty.slice(1)}
                    </span>
                    <div className='flex items-center gap-1 text-gray-500 text-sm'>
                      <Clock className='w-4 h-4' />
                      {question.estimatedTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                {question.description}
              </p>

              {/* Concepts */}
              <div className='mb-4'>
                <div className='flex flex-wrap gap-1'>
                  {question.concepts.map((concept) => (
                    <span
                      key={concept}
                      className='px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md'
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className='flex gap-2'>
                <button
                  onClick={() => startQuestion(question.id)}
                  className='flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
