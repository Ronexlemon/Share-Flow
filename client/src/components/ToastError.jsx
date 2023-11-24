import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastError(message,boolvalue){
    // const showToastMessage = () => {
        toast.error(`${message}`, {
          position: toast.POSITION.TOP_LEFT,
          autoClose:boolvalue
      });
    // }
    // return showToastMessage();
}