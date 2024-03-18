import toast, { Toaster } from 'react-hot-toast';
import style from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const notify = () => {
    toast.error('Page not found');
  };

  return (
    <div className={style.error} onClick={notify}>
      Click here to show error
      <Toaster />
    </div>
  );
};

export default NotFoundPage;