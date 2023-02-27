import { ToastContainer } from 'react-toastify';
import React from 'react';

const ToastContainerConfig = (): JSX.Element => {
  return (
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default ToastContainerConfig;
