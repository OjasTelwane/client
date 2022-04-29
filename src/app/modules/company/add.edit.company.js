/*******************************************************************************************************
 * Add Company file
 * @company : Imatmi.
 * @author : Ojas Telwane.
 * @Copyright : 2021 Imatmi.
 * =====================================================================================================
 * Modification History
 * Date				Modified By		Changes Description
 * 31/09/2021 Ojas Telwane	Created, migrated from component module to function module
 * 19/10/2021 Ojas Telwane  Modified add.company.js to add.edit.company.js 
 *                          as it can Add New Company and Edit Company using the same code
 *******************************************************************************************************/

import React, { useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';

import CompanyDataService from '../../core/actions/company';
import companySchema from './schemas/company.schema';
import SessionService from '../../core/services/useSessionStorage';

import { 
  CompanyTitleRow,
  Title,
  Row,
  CompanyOptionForm,
  CompanyOptionSubmitButtonSection,
  ButtonPrimary1,
  ButtonDanger
} from './components/CompanyElements';

import { Notification } from '../../core/services/notification.service';


const AddEditCompany = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const mounted = useRef();
  const { id } = match.params;
  const isAddMode = !id;

  function getDefaultValues() {
    const { 
      companyName, 
      companyEmail, 
      companyContactNo, 
      companyWebsite,
      isActive, 
      name, 
      empId, 
      email,
      password,
      isAdmin
      } = SessionService.getSessionStorageOrDefault('Company', {
        companyName: '', 
        companyEmail: '', 
        companyContactNo: '', 
        companyWebsite: '',
        isActive: true,
        name: '', 
        empId: '', 
        email: '',
        password: '',
        isAdmin: true
    });
    return { 
      companyName: companyName, 
      companyEmail: companyEmail, 
      companyContactNo: companyContactNo, 
      companyWebsite: companyWebsite,
      isActive: true,
      name: name, 
      empId: empId, 
      email: email,
      password: password,
      isAdmin: true
    };
  }

  const formOptions = { 
    resolver: yupResolver(companySchema)
  };

  const { register, handleSubmit, formState: {isDirty}, formState, reset, getValues, control, setValue, getValue, watch } = useForm( { formOptions });

  //for functionality like componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      console.log('Company Id==>', id);
      if(!isAddMode) {
        CompanyDataService.getCompany(id)
        .then((response) => {
          const fields = [ 'companyName', 'companyEmail', 'companyContactNo', 'isActive', 'name', 'empId', 'email', 'password', 'isAdmin'];
          const c = response.data;
          const company = {
            companyName: c.companyName, 
            companyEmail: c.companyEmail, 
            companyContactNo: c.companyContactNo, 
            companyWebsite: c.companyWebsite,
            isActive: true,
            name: c.name, 
            empId: c.empId, 
            email: c.email,
            password: c.password,
            isAdmin: true
          };
          console.log('company==>', company);
          fields.forEach(field => setValue(field, company[field]));
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

  const submitForm = (data) => {
  };

  const getCompany = async() => {
    const data = await getValues();
    console.log('data in getCompany()==>', data);

    const company = {
      companyName: data.companyName, 
      companyEmail: data.companyEmail, 
      companyContactNo: data.companyContactNo, 
      companyWebsite: data.companyWebsite,
      isActive: true,
      name: data.name, 
      empId: data.empId, 
      email: data.email,
      password: data.password,
      isAdmin: true
    };
    return company;
  }

  const save = async() => {
    const company = await getCompany();
    console.log(company);
    if(isAddMode){
      console.log("Current - ", company);
      try {
        const response = await CompanyDataService.createCompany(company);
        console.log("response===>", response);
        SessionService.removeSessionStorage('Company');
        Notification('success', 'Company saved successfully');
        return true;
      } catch (error) {
        console.log('error==>', error);
        Notification('error', 'Error');
      }
      return false;
    }
    else{
      console.log("Current - ", company);
      try {
        const response = await CompanyDataService.updateCompany(id, company)
        console.log("response===>", response);
        SessionService.removeSessionStorage('Company');
        Notification('success', 'Company updated successfully');
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
    console.log("retValue===>", retValue);
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

  const exitCompany = async() => {
    SessionService.removeSessionStorage('Company');
    history.goBack();
  }

  return (
      <form onSubmit={ handleSubmit(submitForm) }>
        <CompanyOptionForm>
        <center>
            <CompanyTitleRow>
              { isAddMode ? <Title>Add New Company</Title> : <Title>Edit Company</Title> }
            </CompanyTitleRow>
            <Row>
              <div>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Company Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
                <input type='text' {...register('companyName')} />
              </div>
            </Row>

            <Row>
              <div>              
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Company Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
                <input type='text'{...register('companyEmail')} />
              </div>
            </Row>

            <Row>
              <div>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Company Contact No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
                <input type='text' {...register('companyContactNo')} />
              </div>
            </Row>

            <Row>
              <div>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Company Website&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
                <input type='text' {...register('companyWebsite')} />
              </div>
            </Row>

            <Row>
              <div>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Admin Username&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
                <input type='text' {...register('name')} />
              </div>
            </Row>
            
            <Row>
              <div>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Admin Emp ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
                <input type='text' {...register('empId')} />
              </div>
            </Row>

            <Row>
              <div>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Admin Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
                <input type='text' {...register('email')} />
              </div>
            </Row>

            <Row>
              <div>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Admin Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              </div>
              <div>
                <input type='text' {...register('password')} />
              </div>
            </Row>
            </center>
          <Row>
            <CompanyOptionSubmitButtonSection>
              <ButtonPrimary1 onClick={saveAndNew}>
                <Icon
                  icon='carbon:add-alt'
                  color='${(props) => props.theme.primaryColor}'
                  width='20'
                  height='20'
                />
                &nbsp; Save and Add New Company
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
              <ButtonDanger onClick={exitCompany}>
                <Icon icon='icomoon-free:exit' color='${(props) => props.theme.dangerColor}' width='20' height='20' />
                &nbsp; Exit
              </ButtonDanger>
            </CompanyOptionSubmitButtonSection>
          </Row>
        </CompanyOptionForm>
      </form>
  );
}

export default AddEditCompany;
