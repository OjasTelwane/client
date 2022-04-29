import React, {useState, useEffect, useRef} from 'react'

import UserPermissionsDataService from '../../core/actions/userPermissions';
import SessionService from '../../core/services/useSessionStorage';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';

import { Icon } from '@iconify/react';

const UserPermissions = () => {

  const dt = useRef(null);
const [userId, setUserId] = useState('');
const [userName, setUserName] = useState('');
const [module, setModule] = useState('');
const [action, setAction] = useState('');
const [checked, setChecked] = useState(false);
let history = useHistory();
const [sort, setSort] = useState([]);
const [userPermissions, setUserPermissions] = useState([]);
const [currentPage, setCurrentPage] = useState(0);
const [rows, setRows] = useState(10);
const [totalRecords, setTotalRecords] = useState(0);

const onUserIdChange = async (e) => {
  const userId = e.value;
  dt.current.filter(userId, 'userId', 'equals');
  setUserId(userId);
  search( userId, userName, module, action, sort, currentPage, rows);
};

const onUserNameChange = async (e) => {
  const userName = e.value;
  dt.current.filter(userName, 'userName', 'equals');
  setUserName(userName);
  search( userId, userName, module, action, sort, currentPage, rows);
};

const onModuleChange = async (e) => {
  const module = e.value;
  dt.current.filter(module, 'module', 'equals');
  setModule(module);
  search( userId, userName, module, action, sort, currentPage, rows);
};

const onActionChange = async (e) => {
  const action = e.value;
  dt.current.filter(action, 'action', 'equals');
  setAction(action);
  search( userId, userName, module, action, sort, currentPage, rows);
};

const userNameFilterTemplate = (
  <InputText
    filter
    value={userName}
    onChange={onUserNameChange}
    placeholder='UserName'
    className='p-column-filter'
    width='20%'
  />
);

const moduleFilterTemplate = (
  <InputText
    filter
    value={module}
    onChange={onModuleChange}
    placeholder='Module'
    className='p-column-filter'
    width='20%'
  />
);

const actionFilterTemplate = (
  <InputText
    filter
    value={action}
    onChange={onActionChange}
    placeholder='Action'
    className='p-column-filter'
    width='20%'
  />
);

    const onIndexTemplate = (rowData, props) => {
      return props.rowIndex + 1;
    };

    function getDefaultValues() {
      const { userId, userName, module, action} = SessionService.getSessionStorageOrDefault(
        'UserPermissions',
        {
          userId: '',
          userName: '',
          module: '',
          action: ''
        }
      );
      return {
        userId: userId,
        userName: userName,
        module: module,
        action: action
      };
    }
  
    const { register, handleSubmit, reset, getValues, control } = useForm({
      defaultValues: getDefaultValues()
    });

    useEffect( async () => {
      const { userId, userName, module, action, currentPage, rows } =
        SessionService.getSessionStorageOrDefault('UserPermissions', {
          userId: '',
          userName: '',
          module: '',
          action: '',
          currentPage: 0,
          rows: 10
        });
      search( userId, userName, module, action, sort, currentPage, rows);
    }, []);
  
    const search = async (
      userId,
      userName,
      module,
      action,
      sort,
      currentPage,
      rows
    ) => {
      console.log('sort==>', sort);
      UserPermissionsDataService.getAllUserPermissions(
        userId, 
        userName,
        module,
        action,
        sort,
        currentPage,
        rows)
        .then((response) => {
          const { totalItems, currentPage, totalPages, userPermissions } =
            response.data;
          setUserPermissions(userPermissions);
          console.log('userPermissions==>', userPermissions);
          setCurrentPage(currentPage);
          setTotalRecords(totalItems);
          SessionService.setSessionStrage('UserPermissions', {
            userId: userId,
            userName: userName,
            module: module,
            action: action,
            sort: sort,
            currentPage: currentPage,
            rows: rows
          });
        })
        .catch((e) => {
          console.log('error from server:', e.message);
        });
    };

    const onFilter = (e) => {
      console.log('onFilter', e);
    }

    const onSort = async (e) => {
      console.log('onSort==>', e);
      await setSort(e.multiSortMeta);
      const { userId, userName, module, action } = getValues();
      search(userId, userName, module, action, e.multiSortMeta, currentPage, rows);
    };

    const headerTemplate = (rowData) => {
      return (
          <React.Fragment>
              { rowData.userId === 'SuperAdmin' ? (<Icon icon='wpf:administrator' color='black' width='20' height='20' />) : (<> </>)}
              { rowData.userId === 'Admin' ? (<Icon icon='dashicons:admin-users' color='black' width='20' height='20' />) : (<> </>)}
              { rowData.userId === 'TestModerator' ? (<Icon icon='bx:bxs-user-check' color='black' width='20' height='20' />) : (<> </>)}
              { rowData.userId === 'TestSetter' ? (<Icon icon='bx:bxs-user' color='black' width='20' height='20' />) : (<> </>)}
              { rowData.userId === 'Examinee' ? (<Icon icon='carbon:user-avatar-filled' color='black' width='20' height='20' />) : (<> </>)}
              <span >{rowData.userName}</span>
          </React.Fragment>
      );
  }

  const footerTemplate = (rowData) => {
      return (
          <React.Fragment>
              <td colSpan='4' style={{ textAlign: 'right' }}>Total Permissions</td>
              <td>{calculateCustomerTotal(rowData.userName)}</td>
          </React.Fragment>
      );
  }


  const calculateCustomerTotal = (userName) => {
    let total = 0;
    if (userPermissions) {
      for (let userPermission of userPermissions) {
        if (userPermission.userName === userName) {
          total++;
        }
      }
    }
    return total;
}


const checkedBodyTemplate = (rowData) => {
  return (
    <Checkbox inputId='binary' checked={rowData.checked} />
  );
}

const onPageChange = async (e) => {
  const { page, rows } = e;
  await setCurrentPage(page);
  await setRows(rows);
  const { userId, userName, module, action } = getValues();
  search( userId, userName, module, action, currentPage, rows);
};

  return (
    <>
      <div className='card'>
      <DataTable 
        value={userPermissions}
        responsiveLayout='scroll'
        rowGroupMode='subheader'
        groupRowsBy='userName'
        emptyMessage='No User Permissions found.'
        multiSortMeta={sort}
        onSort={onSort}
        onFilter={onFilter}
        rowGroupHeaderTemplate={headerTemplate}
        rowGroupFooterTemplate={footerTemplate}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 20, 50]}
        dataKey='id' 
        >

            <Column
              field='Index'
              header='Sr. No.'
              body={onIndexTemplate}
              style={{ width: '4em' }}
            />

            <Column 
              header='UserName' 
              field='userName'
              filterField='key'
              showFilterMenu={false} 
              filterMenuStyle={{ width: '20%'}} 
              style={{ minWidth: '20%' }} 
              body={userPermissions.userName} 
              filter 
              filterPlaceholder='Search by UserName' 
              filterElement={userNameFilterTemplate}
              sortable
            />
            <Column 
              header='Module' 
              field='module'
              filterField='key' 
              showFilterMenu={false} 
              filterMenuStyle={{ width: '20%'}} 
              style={{ minWidth: '20%' }} 
              body={userPermissions.module}
              filter 
              filterElement={moduleFilterTemplate} 
              sortable
            />

            <Column 
              field='action' 
              filterField='action'
              header='Action' 
              showFilterMenu={false} 
              style={{ minWidth: '20%' }} 
              body={userPermissions.action} 
              filter 
              filterElement={actionFilterTemplate} 
              filterPlaceholder='Action'
              sortable
            /> 

            <Column 
              field='checked' 
              filterField='checked'
              header='Checked' 
              showFilterMenu={false} 
              style={{ minWidth: '20%' }} 
              body={checkedBodyTemplate} 
            /> 

          </DataTable>
        </div>
    </>
  )
}

export default UserPermissions
