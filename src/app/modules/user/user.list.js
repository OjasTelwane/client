/*******************************************************************************************************
 * Company List file
 * @company : Imatmi.
 * @author : Ojas Telwane.
 * @Copyright : 2021 Imatmi.
 * =====================================================================================================
 * Modification History
 * Date				Modified By		Changes Description
 * 31/09/2021 Ojas Telwane	Created, migrated from component module to function module
 *******************************************************************************************************/

import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import UserDataService from '../../core/actions/user';
import SessionService from '../../core/services/useSessionStorage';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Icon } from '@iconify/react';
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from 'primereact/inputtext';

import {
  UserListForm,
  Heading,
  Row,
  ButtonSml,
  ButtonIcon,
  ButtonPrimary,
  AddUser,
  DataTableCss
} from './components/UserElements';

const UserList = () => {
  const history = useHistory();
  const [sort, setSort] = useState([{ field: 'text', order: 1 }]);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const dt = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onNameChange = async (e) => {
    const name = e.value;
    dt.current.filter(name, 'name', 'equals');
    setName(name);    
    search(name, email, sort, currentPage, rows);
  };

  const onEmailChange = (e) => {
    const email = e.target.value;
    dt.current.filter(email, 'email', 'equals');
    setEmail(email);
    search(name, email, sort, currentPage, rows);
  };

  const nameFilterTemplate = (
    <InputText
      filter
      value={name}
      onChange={onNameChange}
      placeholder='Name'
      className='p-column-filter'
      width='20%'
    />
  );

  const emailFilterTemplate = (
    <InputText
      filter
      value={email}
      onChange={onEmailChange}
      placeholder='Email'
      className='p-column-filter'
      width='20%'
    />
  );

  const schema = yup.object().shape({
    text: yup.string(),
    tag: yup.array(),
    optionText: yup.string()
  });

  function getDefaultValues() {
    const { name, email } = SessionService.getSessionStorageOrDefault(
      'UserList',
      {
        name: '',
        email: ''
      }
    );
    return {
      name: name,
      email: email
    };
  }

  const { register, handleSubmit, reset, getValues, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValues()
  });

  const search = async (
    name,
    email,
    sort,
    currentPage,
    rows
  ) => {
    console.log('sort==>', sort);
    UserDataService.getAllUsers(
      name,
      email,
      sort,
      currentPage,
      rows
      )
      .then((response) => {
        const { totalItems, currentPage, totalPages, users } =
          response.data;
          console.log('response.data==>', response.data);
        setUsers(users);
        setCurrentPage(currentPage);
        setTotalRecords(totalItems);
        SessionService.setSessionStrage('UserList', {
          name: name,
          email: email,
          sort: sort,
          currentPage: currentPage,
          rows: rows
        });
      })
      .catch((e) => {
        console.log('error from server:', e.message);
      });
  };

  useEffect(() => {
    const { name, email, currentPage, rows } =
      SessionService.getSessionStorageOrDefault('UserList', {
        name: '',
        email: '',
        currentPage: 0,
        rows: 10
      });
    search(name, email, sort, currentPage, rows);
  }, []);

  const submitForm = (data) => {
    console.log(data);
    const {name, email } = data;
    search(name, email, sort, currentPage, rows);
  };

  const onPageChange = async (e) => {
    const { page, rows } = e;
    await setCurrentPage(page);
    await setRows(rows);
    const { name, email } = getValues();
    search(name, email, sort, currentPage, rows);
  };

  const editUser = async (user) => {
    var id = user.id;
    var path = `/update_user/${id}`;
    console.log('path==>', path);
    history.push(path);
  };

  const viewUser = async (user) => {
    var id = user.id;
    var path = `/view_user/${id}`;
    history.push(path);
  };

  const addUser = async () => {
    var path = `/add_user`;
    console.log('path==>', path);
    history.push(path);
  };

  const viewUserTable = (rowData) => {
    console.log('rowData==>', rowData);
  };

  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1;
  };

  const onSort = async (e) => {
    console.log('onSort==>', e);
    await setSort(e.multiSortMeta);
    const { name, email } = getValues();
    search(name, email, e.multiSortMeta, currentPage, rows);
  };

  const onFilter = (e) => {
    console.log('onFilter', e);
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <ButtonSml width='40px' onClick={() => viewUser(rowData)}>
          <Icon
            icon='fluent:reading-mode-mobile-24-regular'
            color='${(props) => props.theme.primaryColor}'
            width='20'
            height='20'
          />
        </ButtonSml>
        <ButtonSml width='40px' onClick={() => editUser(rowData)}>
          <Icon
            icon='clarity:note-edit-line'
            color='${(props) => props.theme.primaryColor}'
            width='20'
            height='20'
          />
        </ButtonSml>
      </>
    );
  };

  return (
    <>
      <UserListForm>
        <div>
          <Row>
            <Heading>Users List</Heading>
          </Row>
          <Row>
            <AddUser>
              <ButtonPrimary onClick={addUser}>
                <ButtonIcon>
                  <Icon
                    icon='carbon:add-alt'
                    color='${(props) => props.theme.primaryColor}'
                    width='20'
                    height='20'
                  />
                  <span className=' d-none d-sm-none d-md-block '>Add New</span>
                </ButtonIcon>
              </ButtonPrimary>
            </AddUser>
          </Row>
            <DataTableCss>
            <div className='card'>
              <DataTable
                ref={dt}
                value={users}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 20, 50]}
                emptyMessage='No Users found.'
                multiSortMeta={sort}
                onSort={onSort}
                onFilter={onFilter}
                sortMode='multiple'
                // scrollable={true}
                // scrollDirection='both'
                // scrollHeight='600px'
                // scrollWidth='440px'
                responsiveLayout='scroll'
                onValueChange={filteredData => console.log(filteredData)}
              >
                <Column
                  field='Index'
                  header='Sr. No.'
                  body={onIndexTemplate}
                  style={{ width: '5%' }}
                />
                <Column 
                  field='name' 
                  filterField='key'
                  header='User Name' 
                  sortable
                  showFilterMenu={false} 
                  filterMenuStyle={{ width: '35%'}} 
                  style={{ width: '35%' }} 
                  body={users.name} 
                  filter 
                  filterElement={nameFilterTemplate} />
                <Column
                  field='email'
                  filterField='email'
                  header='user Email'
                  body={users.email}
                  filter
                  filterPlaceholder='Email'
                  filterMatchMode='contains'
                  style={{ width: '35%' }}
                  sortable
                  filterElement={emailFilterTemplate}
                />
                <Column
                  body={actionBodyTemplate}
                  style={{ width: '15%', overflow: 'visible' }}
                ></Column>
              </DataTable>
            </div>
            </DataTableCss>
        </div>
        <Row>
          <Heading></Heading>
          <AddUser>
            <ButtonPrimary onClick={addUser}>
              <Icon
                icon='carbon:add-alt'
                color='${(props) => props.theme.primaryColor}'
                width='20'
                height='20'
              />
              &nbsp; Add New
            </ButtonPrimary>
          </AddUser>
        </Row>
      </UserListForm>
    </>
  );
};

export default UserList;
