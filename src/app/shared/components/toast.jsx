import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-green/theme.css';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef } from 'react';

const ShowToast = (props) => {
  const myToast = useRef(null);

  useEffect(() => {
    showToaster();
  }, []);

  const showToaster = () => {
    myToast.current.show({
      severity: props.severity,
      summary: props.summary,
      detail: props.detail,
      life: 3000
    });
  };

  return (
    <>
      <Toast ref={myToast} position='top-right' />
      {/* <Button label='Info' className='p-button-info' onClick={showToaster} /> */}
    </>
  );
};

export default ShowToast;
