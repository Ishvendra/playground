import { useState } from 'react';
import {
  CheckCircle,
  Circle,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
} from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React hooks', completed: false },
    { id: 2, text: 'Build a todo app', completed: true },
    { id: 3, text: 'Practice machine coding', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState<number | null>();
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          completed: false,
        },
      ]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 py-8 max-w-2xl'>
        <h1 className='text-lg'>Todo App</h1>
        {/* Stats */}
        <div className='grid grid-cols-3 gap-4 mb-6'>
          <div className='bg-white rounded-lg p-4 text-center shadow-sm border'>
            <div className='text-2xl font-bold text-blue-600'>
              {stats.total}
            </div>
            <div className='text-sm text-gray-600'>Total</div>
          </div>
          <div className='bg-white rounded-lg p-4 text-center shadow-sm border'>
            <div className='text-2xl font-bold text-green-600'>
              {stats.completed}
            </div>
            <div className='text-sm text-gray-600'>Completed</div>
          </div>
          <div className='bg-white rounded-lg p-4 text-center shadow-sm border'>
            <div className='text-2xl font-bold text-orange-600'>
              {stats.active}
            </div>
            <div className='text-sm text-gray-600'>Active</div>
          </div>
        </div>

        {/* Add Todo */}
        <div className='bg-white rounded-xl shadow-sm border p-6 mb-6'>
          <div className='flex gap-2'>
            <input
              type='text'
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder='Add a new todo...'
              className='text-black flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <button
              onClick={addTodo}
              className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2'
            >
              <Plus className='w-4 h-4' />
              Add
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className='flex gap-2 mb-6'>
          {['all', 'active', 'completed'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                filter === filterType
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border'
              }`}
            >
              {filterType}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className='bg-white rounded-xl shadow-sm border'>
          {filteredTodos.length === 0 ? (
            <div className='p-8 text-center text-gray-500'>
              <Circle className='w-12 h-12 mx-auto mb-4 opacity-50' />
              <p>No todos found. Add one above!</p>
            </div>
          ) : (
            <div className='divide-y divide-gray-100'>
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-4 ${
                    todo.completed ? 'bg-gray-50' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className='flex-shrink-0'
                  >
                    {todo.completed ? (
                      <CheckCircle className='w-5 h-5 text-green-600' />
                    ) : (
                      <Circle className='w-5 h-5 text-gray-400 hover:text-gray-600' />
                    )}
                  </button>

                  {editingId === todo.id ? (
                    <div className='flex-1 flex gap-2'>
                      <input
                        type='text'
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        className='flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        autoFocus
                      />
                      <button
                        onClick={saveEdit}
                        className='p-1 text-green-600 hover:bg-green-100 rounded'
                      >
                        <Check className='w-4 h-4' />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className='p-1 text-red-600 hover:bg-red-100 rounded'
                      >
                        <X className='w-4 h-4' />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span
                        className={`flex-1 ${
                          todo.completed
                            ? 'text-gray-500 line-through'
                            : 'text-gray-800'
                        }`}
                      >
                        {todo.text}
                      </span>
                      <button
                        onClick={() => startEdit(todo)}
                        className='p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded'
                      >
                        <Edit3 className='w-4 h-4' />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className='p-1 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded'
                      >
                        <Trash2 className='w-4 h-4' />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Problem Statement */}
        <div className='mt-8 bg-white rounded-xl shadow-sm border p-6'>
          <h3 className='text-lg font-semibold text-gray-800 mb-3'>
            Problem Statement
          </h3>
          <div className='text-sm text-gray-600 space-y-2'>
            <p>
              <strong>Requirements:</strong>
            </p>
            <ul className='list-disc list-inside ml-4 space-y-1'>
              <li>Add new todos</li>
              <li>Mark todos as completed/uncompleted</li>
              <li>Edit existing todos</li>
              <li>Delete todos</li>
              <li>Filter todos by status (All, Active, Completed)</li>
              <li>Display statistics</li>
            </ul>
            <p className='mt-3'>
              <strong>Concepts Practiced:</strong> useState, Event Handling,
              Conditional Rendering, Array Methods
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
