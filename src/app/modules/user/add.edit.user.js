/*******************************************************************************************************
 * Add Company file
 * @company : Imatmi.
 * @author : Ojas Telwane.
 * @Copyright : 2021 Imatmi.
 * =====================================================================================================
 * Modification History
 * Date				Modified By		Changes Description
 * 31/09/2021 Ojas Telwane	Created, migrated from component module to function module
 * 19/10/2021 Ojas Telwane  Modified add.user.js to add.edit.user.js 
 *                          as it can Add New User and Edit User using the same code
 *******************************************************************************************************/

import React, { useState, useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import SessionService from '../../core/services/useSessionStorage';
import { useHistory } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';

import { Dropdown } from 'primereact/dropdown';
import UserDataService from '../../core/actions/user';

import userSchema from './schemas/user.schema';
import DisplayUserPermissions from './displayUserPermissions';

import { 
  UserTitleRow,
  Title,
  Row,
  UserOptionForm,
  UserOptionSubmitButtonSection,
  ButtonPrimary1,
  ButtonDanger
} from './components/UserElements';
import { Notification } from '../../core/services/notification.service';

const AddEditUser = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const match = useRouteMatch();
  const mounted = useRef();
  const { id } = match.params;
  const isAddMode = !id;
  const [showPermissions, setShowPermissions] = useState(false);
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [selectedUserType, setSelectedUserType] = useState('User');
  const [userTypeList, setUserTypeList] = useState([
    { label: 'User', value: 'User' },
    { label: 'Test Setter', value: 'Test Setter' },
    { label: 'Test Moderator', value: 'Test Moderator' },
    { label: 'Admin', value: 'Admin' }
  ]);

  function getDefaultValues() {
    const {
      name, 
      empId, 
      email,
      password,
      isActive,
      role 
      } = SessionService.getSessionStorageOrDefault('User', {
        name: '', 
        empId: '', 
        email: '',
        password: '',
        isActive: true,
        role: 'User'
    });
    return { 
      name: name, 
      empId: empId, 
      email: email,
      password: password,
      isActive: true,
      role: role
    };
  }

  const formOptions = { 
    resolver: yupResolver(userSchema)
  };

  const { register, handleSubmit, formState: {isDirty}, formState, reset, getValues, control, setValue, getValue, watch } = useForm( { formOptions });

  //for functionality like componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      console.log('User Id==>', id);
      if(!isAddMode) {
        UserDataService.getUser(id)
        .then((response) => {
          const fields = [ 'name', 'empId', 'email', 'password', 'isActive', 'role'];
          const retUser = response.data;
          const user = {
            name: retUser.name, 
            empId: retUser.empId, 
            email: retUser.email,
            password: retUser.password,
            isActive: retUser.isActive,
            role: retUser.role,
            id: retUser.id
          };
          console.log('user==>', user);
          fields.forEach(field => setValue(field, user[field]));
          setUser(user);
          setUserId(user.id);
        })
        .catch((e) => {
          console.log('error==>', e);
        });
      }
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
    }
  }
  , []
  );

  useEffect(() => {
  })

  const submitForm = (data) => {
  };

  const getUser = async() => {
    const data = await getValues();
    console.log('data in getUser()==>', data);

    const user = {
      name: data.name, 
      empId: data.empId, 
      email: data.email,
      password: data.password,
      isActive: true,
      role: data.role 
    };
    return user;
  }

  const save = async() => {
    const user = await getUser();
    console.log(user);
    setLoading(true);
    if(isAddMode){
      console.log('Current - ', user);
      try {
        const response = await UserDataService.createUser(user);
        console.log('response===>', response);
        SessionService.removeSessionStorage('User');
        Notification('success', 'User saved successfully');
        return true;
      } catch (error) {
        console.log('error==>', error);
        Notification('error', 'Error');
      }
      return false;
    }
    else{
      console.log('Current - ', user);
      try {
        const response = await UserDataService.updateUser(id, user)
        console.log('response===>', response);
        SessionService.removeSessionStorage('User');
        Notification('success', 'User updated successfully');
        setLoading(false);
        var path = `/view_user/${response.data.id}`;
        history.push(path);
        return true;
      } catch (error) {
        console.log('error==>', error);
        Notification('error', 'Error');
        return false;
      }
    }
  }

  const saveAndExit = async() => {
    const retValue = await save();
    console.log('retValue===>', retValue);
    if(retValue) {
      history.goBack();
  }
  }  

  const saveAndNew = async() => {
    const retValue = await save();
    if(retValue) {
      reset(getDefaultValues());
    }
  }

  const exitUser = async() => {
    SessionService.removeSessionStorage('User');
    history.goBack();
  }

  const handlePermission = () => {
    setShowPermissions(!showPermissions);
  }

  return (
      <form onSubmit={ handleSubmit(submitForm) }>
        <UserOptionForm>
        <center>
            <UserTitleRow>
              { isAddMode ? <Title>Add New User</Title> : <Title>Edit User</Title> }
            </UserTitleRow>
        </center>
          <div>
            { isAddMode ? (
              <>
              <center>
            <Row>
              <div>
              <p>User Name&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
              <input type='text'
                  {...register('name')} />
              </div>
            </Row>

            <Row>
              <div>              
              <p>User EmpId&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
              <input type='text'
                  {...register('empId')} />
              </div>
            </Row>

            <Row>
              <div>              
              <p>User Email&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
              <input type='text'
                  {...register('email')} />
              </div>
            </Row>
            <Row>
              <div>
                <p>password&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
                <input type='text'
                    {...register('password')} />
              </div>
            </Row>
            <Row>
            <Controller
                control={control}
                name='role'
                render={({ field: { field, onChange, onBlur, value, ref }, fieldState }) => (
                  <Dropdown 
                      {...field}
                      options={userTypeList}
                      placeholder='Select a Role'
                      onChange={(e) => {
                        console.log(e);
                        const {label, value} = e.value;
                        onChange(e.value);
                        console.log(label + ', ' + value);
                      }}
                      onBlur={onBlur}
                      value={value}
                  />
                )}
              />

            </Row>
            </center>
          <Row>
            <UserOptionSubmitButtonSection>
              <ButtonPrimary1 onClick={saveAndNew}>
                <Icon
                  icon='carbon:add-alt'
                  color='${(props) => props.theme.primaryColor}'
                  width='20'
                  height='20'
                />
                &nbsp; Save and Add New User
              </ButtonPrimary1>
              <ButtonPrimary1 onClick={saveAndExit}>
                <Icon
                  icon='fluent:save-16-regular'
                  color='${(props) => props.theme.primaryColor}'
                  width='20'
                  height='20'
                />
                &nbsp; Save and Exit
              </ButtonPrimary1>
              <ButtonDanger onClick={exitUser}>
                <Icon icon='icomoon-free:exit' color='${(props) => props.theme.dangerColor}' width='20' height='20' />
                &nbsp; Back
              </ButtonDanger>
            </UserOptionSubmitButtonSection>
          </Row>
              </>
            ) : (
              <>
              <center>
            <Row>
              <div>
              <p>User Name&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
              <input type='text'
                  {...register('name')} />
              </div>
            </Row>

            <Row>
              <div>              
              <p>User EmpId&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
              <input type='text'
                  {...register('empId')} />
              </div>
            </Row>

            <Row>
              <div>              
              <p>User Email&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
              <input type='text'
                  {...register('email')} />
              </div>
            </Row>

            <Row>
            <ButtonPrimary1 onClick={handlePermission}>
                  { showPermissions ? (
                    <Icon icon='bx:bx-hide' color='${(props) => props.theme.primaryColor}' width='20' height='20' />
                  ):(
                    <Icon icon='bx:bx-show' color='${(props) => props.theme.primaryColor}' width='20' height='20' />
                  )}
                &nbsp; 
                { showPermissions ? 'Hide ' : 'Show ' } Permissions...
              </ButtonPrimary1>
            </Row>
            {
          showPermissions && (
            <DisplayUserPermissions
            userId={userId}
            handlePermission= {handlePermission}
          />
          )
        }          
          </center>          
          <Row>
            <UserOptionSubmitButtonSection>
              <ButtonPrimary1 onClick={saveAndExit}>
                <Icon
                  icon='fluent:save-16-regular'
                  color='${(props) => props.theme.primaryColor}'
                  width='20'
                  height='20'
                />
                &nbsp; Save and Exit
              </ButtonPrimary1>
              <ButtonDanger onClick={exitUser}>
                <Icon icon='icomoon-free:exit' color='${(props) => props.theme.dangerColor}' width='20' height='20' />
                &nbsp; Back
              </ButtonDanger>
            </UserOptionSubmitButtonSection>
          </Row>
              </>
            )}
            </div>
        </UserOptionForm>
      </form>
  );
};

export default AddEditUser;
