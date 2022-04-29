import { Button } from 'primereact/button';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const Notification = (type, msg) => {
  const options={
      style:{
        // backgroundColor : "black",
        // color : "white",
        fontWeight : "bold"
      },
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
  }
    if(type === 'success') {
      toast.success(msg, options);
    } else if(type === 'warning') {
      toast.warning(msg, options);
    } else if(type === 'info') {
      toast.info(msg, options);
    } else if(type === 'error') {
      toast.error(msg, options)
    } else {

    }
};

export const showMessage = (toast, severity, summary, detail) => {
  toast.current.show({
    severity: severity,
    summary: summary,
    detail: detail,
    life: 3000
  });
};

export const showConfirm = (toast) => {
  toast.current.show({
    severity: 'warn',
    sticky: true,
    content: (
      <div className='p-flex p-flex-column' style={{ flex: '1' }}>
        <div className='p-text-center'>
          <i
            className='pi pi-exclamation-triangle'
            style={{ fontSize: '3rem' }}
          ></i>
          <h4>Are you sure?</h4>
          <p>Confirm to proceed</p>
        </div>
        <div className='p-grid p-fluid'>
          <div className='p-col-6'>
            <Button type='button' label='Yes' className='p-button-success' />
          </div>
          <div className='p-col-6'>
            <Button type='button' label='No' className='p-button-secondary' />
          </div>
        </div>
      </div>
    )
  });
};
