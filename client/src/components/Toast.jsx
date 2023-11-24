import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastIT(message,boolvalue){
    // const showToastMessage = () => {
        toast.success(`${message}`, {
          position: toast.POSITION.TOP_LEFT,
          autoClose:boolvalue
      });
    // }
    // return showToastMessage();
}