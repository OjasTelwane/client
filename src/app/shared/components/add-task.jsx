import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import moment from 'moment';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useState } from 'react';
import ShowToast from 'src/app/shared/components/toast';
import { APIRoutes } from 'src/app/shared/constants/routes';
import styled from 'styled-components';

const TransparentBg = styled.div`
  .p-dialog-mask.p-component-overlay {
    background-color: transparent !important;
  }

  .p-dialog {
    border-radius: 3px;
    box-shadow: 2px 2px 2px 0px grey;
    border: 1px solid grey;
  }
`;

// Add Task
const AddTask = (props) => {
  const dateFormat = 'yyyy-MM-DDThh:mm';
  const getDateInFormat = (givenDate = new Date()) => {
    return moment(givenDate).format(dateFormat);
  };

  let tempDate = new Date();
  tempDate.setMinutes(tempDate.getMinutes() + props?.durationInMinutes);
  const [title, setTitle] = useState(props.title.toString());
  const [description, setDescription] = useState(props.description.toString());
  const [startDate, setStartDate] = useState(getDateInFormat());
  const [endDate, setEndDate] = useState(getDateInFormat(tempDate));
  const [assignedToId, setAssignedToId] = useState(props.empId);
  const [isShowToast, SetIsShowToast] = useState(false);

  const renderFooter = () => {
    return (
      <div>
        <Button
          label='No'
          icon='pi pi-times'
          onClick={props.closeDialog}
          className='p-button-text'
        />
        <Button label='Yes' icon='pi pi-check' onClick={createTask} autoFocus />
      </div>
    );
  };

  const ShowToaster = () => {
    SetIsShowToast(false);
    return (
      <ShowToast
        severity='success'
        summary='Success'
        detail='The task was created successfully.'
      />
    );
  };

  const createTask = () => {
    const newTask = {
      title: title,
      description: description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      assignedToId: assignedToId
    };
    axios.post(APIRoutes.task.url, newTask).then((response) => {
      props.closeDialog();
      SetIsShowToast(true);
    });
  };

  return (
    <TransparentBg>
      <Dialog
        header='Header'
        visible={props.isVisible}
        onHide={props.closeDialog}
        position='left'
        style={{ width: '540px' }}
        footer={renderFooter}
        baseZIndex={1000}
      >
        <div className='row'>
          <div className='col-12'>
            <label>Details</label>
            <br />
            <InputText
              className='w-100'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='col-12'>
            <div className='row'>
              <div className='col-sm-6 col-12'>
                <TextField
                  id='datetime-local'
                  label='Start Time'
                  type='datetime-local'
                  defaultValue={startDate}
                  onChange={(e) =>
                    setStartDate(getDateInFormat(e.target.value))
                  }
                  // className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
              <div className='col-sm-6 col-12'>
                <TextField
                  id='datetime-local'
                  label='End Time'
                  type='datetime-local'
                  defaultValue={endDate}
                  onChange={(e) => setEndDate(getDateInFormat(e.target.value))}
                  // className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>
            </div>
          </div>
          <div className='col-12'>
            <label>Description</label>
            <br />
            <InputTextarea
              className='w-100'
              rows={5}
              cols={30}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoResize
            />
          </div>
        </div>
      </Dialog>

      {isShowToast ? <ShowToaster /> : null}
    </TransparentBg>
  );
};

export default AddTask;
