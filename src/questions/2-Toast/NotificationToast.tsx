import { useEffect, useRef, useState } from 'react';
import Toast from './Toast';
import './toast-style.css';

export type ToastVariantType = 'success' | 'error' | 'warning' | 'info';

export type ToastType = {
  id: number;
  message: string;
  type: ToastVariantType;
};

const NotificationToast = () => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const timerRef = useRef({});

  const handleRemove = (id: number) => {
    setToasts((prev: ToastType[]) => {
      const reducedList = prev.filter((item) => item.id !== id);
      return reducedList;
    });

    clearTimeout(
      (timerRef.current as Record<number, ReturnType<typeof setTimeout>>)[id]
    );
    delete (timerRef.current as Record<number, ReturnType<typeof setTimeout>>)[
      id
    ];
  };

  const handleAdd = (message: string, type: ToastVariantType, delay = 2000) => {
    const newId = new Date().getTime();
    const newList = [
      ...toasts,
      {
        id: newId,
        message,
        type,
      },
    ];

    setToasts(newList);
    (timerRef.current as Record<number, ReturnType<typeof setTimeout>>)[newId] =
      setTimeout(() => {
        handleRemove(newId);
      }, delay);
  };

  useEffect(() => {
    return () => {
      Object.values(
        timerRef.current as Record<number, ReturnType<typeof setTimeout>>
      ).forEach(clearTimeout);
      timerRef.current = {};
    };
  }, []);

  return (
    <div className='toast-app-container'>
      <div className='toast-container'>
        {toasts.map((toast: ToastType) => (
          <Toast key={toast.id} toastData={toast} handleClose={handleRemove} />
        ))}
      </div>

      <button
        className='toast-btn success'
        onClick={() => handleAdd('yay', 'success', 10000)}
      >
        success toast
      </button>
      <button
        className='toast-btn warning'
        onClick={() => handleAdd('oh shit', 'warning')}
      >
        warning toast
      </button>
      <button
        className='toast-btn error'
        onClick={() => handleAdd('oh fuck', 'error')}
      >
        error toast
      </button>
      <button
        className='toast-btn info'
        onClick={() => handleAdd('oh really?', 'info')}
      >
        info toast
      </button>
    </div>
  );
};

export default NotificationToast;
