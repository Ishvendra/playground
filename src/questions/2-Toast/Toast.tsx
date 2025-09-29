import './toast-style.css';
import { type ToastType } from './NotificationToast';

type ToastProps = {
  toastData: ToastType;
  handleClose: (id: number) => void;
};

const Toast = ({ toastData, handleClose }: ToastProps) => {
  return (
    <div className={`toast ${toastData.type}`}>
      <p>{toastData.message}</p>
      <button className='cross' onClick={() => handleClose(toastData.id)}>
        x
      </button>
    </div>
  );
};

export default Toast;
