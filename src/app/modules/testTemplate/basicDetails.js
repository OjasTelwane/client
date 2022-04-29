import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider , KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import { BasicDetailsStyle, TitleField } from './components/testTemplateElements';

const BasicDetails = ({values, handleChange, nextStep, testDate, handleTestDate, startTime, handleStartTime, endTime, handleEndTime }) => {
    const dateFormatter = str => {
        return str;
    };
    return(
        <>
            <BasicDetailsStyle>
            <AppBar title='Enter Basic Details' />
            <TitleField>Test Name</TitleField>
            <TextField
              placeholder='Enter Test Name'
              label='Name'
              margin='normal'
              fullWidth
              variant='outlined'
              style={{
                backgroundColor: '#f5f5f5',
                border: '0.8px solid #4b5454',
                borderRadius: '10px'
              }}
              defaultValue={values.name}
              onChange={handleChange('name')}
            />
            <br />
            <br />
            <TitleField>Description</TitleField>
            <TextField
              placeholder='Enter Test Description'
              label='Description goes here'
              margin='normal'
              fullWidth
              rows={4}
              multiline
              variant='outlined'
              style={{
                backgroundColor: '#f5f5f5',
                border: '0.8px solid #4b5454',
                borderRadius: '10px'
              }}
              defaultValue={values.description}
              onChange={handleChange('description')}
            />
            <br />
            <br />
            <Grid container={true}>
            <Grid item>
            <TitleField>Duration</TitleField>
            <TextField
              placeholder='Enter Test Duration in minutes'
              margin='normal'
              variant='outlined'
              style={{
                backgroundColor: '#f5f5f5',
                border: '0.8px solid #4b5454',
                borderRadius: '10px'
              }}
              type='number'
              InputProps={{ inputProps: { min: 0 }}}
              defaultValue={values.duration}
              onChange={handleChange('duration')}
            />
            </Grid>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Grid item>
              <TitleField>Attempts</TitleField>
              <TextField
                placeholder='Enter Number of Attempts'
                margin='normal'
                variant='outlined'
                style={{
                  backgroundColor: '#f5f5f5',
                  border: '0.8px solid #4b5454',
                  borderRadius: '10px'
                }}
                InputProps={{ inputProps: { min: 0 }}}
                type='number'
                defaultValue={values.noOfAttempts}
                onChange={handleChange('noOfAttempts')}
              />
              </Grid>
            </Grid>
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
            <KeyboardDatePicker
                variant='inline'
                margin='normal'
                label='Test Date'
                value={testDate}
                style={{
                  backgroundColor: '#f5f5f5',
                  border: '0.8px solid #4b5454',
                  paddingLeft: '5px'
                }}
                onChange={handleTestDate}
                format='yyyy/MM/DD'
                rifmFormatter={dateFormatter}
            />     
            &nbsp;&nbsp;&nbsp;&nbsp;         
            <KeyboardTimePicker
                variant='inline'
                margin='normal'
                label='Start Time'
                value={startTime}
                style={{
                  backgroundColor: '#f5f5f5',
                  border: '0.8px solid #4b5454',
                  paddingLeft: '5px'
                }}
                onChange={handleStartTime}
                rifmFormatter={dateFormatter}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <KeyboardTimePicker
                variant='inline'
                margin='normal'
                label='End Time'
                value={endTime}
                style={{
                  backgroundColor: '#f5f5f5',
                  border: '0.8px solid #4b5454',
                  paddingLeft: '5px'
                }}
                onChange={handleEndTime}
                rifmFormatter={dateFormatter}
            />
            </MuiPickersUtilsProvider>
            <br/>
            <br />

            <Button color='primary' variant='contained' onClick={nextStep}>
              Continue
            </Button>            
            </BasicDetailsStyle>
        </>
    )
}
export default BasicDetails;