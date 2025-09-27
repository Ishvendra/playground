import { useParams } from 'react-router-dom';
import TodoApp from './questions/1-TodoApp/TodoApp';

const QuestionWrapper = () => {
  const { questionId } = useParams<{ questionId: string }>();

  const components: Record<string, React.ComponentType> = {
    '1': TodoApp,
  };

  const Component = questionId ? components[questionId] : undefined;

  if (!Component) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>
            404 - Question Not Found
          </h1>
          <p className='text-gray-600 mb-6'>
            The question you're looking for doesn't exist.
          </p>
          <button
            onClick={() => (window.location.href = '/')}
            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return <Component />;
};

export default QuestionWrapper;
