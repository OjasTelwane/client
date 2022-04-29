import React, {useState, useEffect, useRef} from 'react'

import GroupPermissionsDataService from '../../core/actions/groupPermissions';
import SessionService from '../../core/services/useSessionStorage';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

// import Chip from '@material-ui/core/Chip';

import { Icon } from '@iconify/react';

const GroupPermissions = () => {
  const dt = useRef(null);

const [role, setRole] = useState('');
const [module, setModule] = useState('');
const [action, setAction] = useState('');
let history = useHistory();
const [sort, setSort] = useState([]);
const [groupPermissions, setGroupPermissions] = useState([]);
const [currentPage, setCurrentPage] = useState(0);
const [rows, setRows] = useState(10);
const [totalRecords, setTotalRecords] = useState(0);

const onRoleChange = async (e) => {
  const role = e.value;
  dt.current.filter(role, 'role', 'equals');
  setRole(role);
  search( role, module, action, sort, currentPage, rows);
};

const onModuleChange = async (e) => {
  const module = e.value;
  dt.current.filter(module, 'module', 'equals');
  setModule(module);
  search( role, module, action, sort, currentPage, rows);
};

const onActionChange = async (e) => {
  const action = e.value;
  dt.current.filter(action, 'action', 'equals');
  setAction(action);
  search( role, module, action, sort, currentPage, rows);
};

const roleFilterTemplate = (
  <InputText
    filter
    value={role}
    onChange={onRoleChange}
    placeholder='Role'
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
      const { role, module, action} = SessionService.getSessionStorageOrDefault(
        'GroupPermissions',
        {
          role: '',
          module: '',
          action: ''
        }
      );
      return {
        role: role,
        module: module,
        action: action
      };
    }
  
    const { register, handleSubmit, reset, getValues, control } = useForm({      
      defaultValues: getDefaultValues()
    });

    useEffect( async () => {
      const { role, module, action, currentPage, rows } =
        SessionService.getSessionStorageOrDefault('GroupPermissions', {
          role: '',
          module: '',
          action: '',
          currentPage: 0,
          rows: 10
        });
      search( role, module, action, sort, currentPage, rows);
    }, []);
  
    const search = async (
      role,
      module,
      action,
      sort,
      currentPage,
      rows
    ) => {
      console.log('sort==>', sort);
      GroupPermissionsDataService.getAllGroupPermissions(
        role, 
        module,
        action,
        sort,
        currentPage,
        rows)
        .then((response) => {
          const { totalItems, currentPage, totalPages, groupPermissions } =
            response.data;
          setGroupPermissions(groupPermissions);
          console.log('groupPermissions==>', groupPermissions);
          setCurrentPage(currentPage);
          setTotalRecords(totalItems);
          SessionService.setSessionStrage('GroupPermissions', {
            role: role,
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
  
    //   const tagsBodyTemplate = (rowData) => {
    //   return (
    //     <>
    //       {rowData.tags &&
    //         rowData.tags.map((tag, j) => (
    //           <>
    //             <Chip
    //               size='small'
    //               variant='outlined'
    //               color='primary'
    //               label={tag}
    //             />
    //             <span>&nbsp;</span>
    //           </>
    //         ))}
    //     </>
    //   );
    // };

    const onFilter = (e) => {
      console.log('onFilter', e);
    }

    const onSort = async (e) => {
      console.log('onSort==>', e);
      await setSort(e.multiSortMeta);
      const { role, module, action } = getValues();
      search(role, module, action, e.multiSortMeta, currentPage, rows);
    };

    const headerTemplate = (rowData) => {
      return (
          <React.Fragment>
              { rowData.role === 'SuperAdmin' ? (<Icon icon='wpf:administrator' color='black' width='20' height='20' />) : (<> </>)}
              { rowData.role === 'Admin' ? (<Icon icon='dashicons:admin-users' color='black' width='20' height='20' />) : (<> </>)}
              { rowData.role === 'TestModerator' ? (<Icon icon='bx:bxs-user-check' color='black' width='20' height='20' />) : (<> </>)}
              { rowData.role === 'TestSetter' ? (<Icon icon='bx:bxs-user' color='black' width='20' height='20' />) : (<> </>)}
              { rowData.role === 'Examinee' ? (<Icon icon='carbon:user-avatar-filled' color='black' width='20' height='20' />) : (<> </>)}
              <span >{rowData.role}</span>
          </React.Fragment>
      );
  }

  const footerTemplate = (rowData) => {
      return (
          <React.Fragment>
              <td colSpan='4' style={{ textAlign: 'right' }}>Total Permissions</td>
              <td>{calculateCustomerTotal(rowData.role)}</td>
          </React.Fragment>
      );
  }

  const calculateCustomerTotal = (role) => {
    let total = 0;
    if (groupPermissions) {
      for (let groupPermission of groupPermissions) {
        if (groupPermission.role === role) {
          total++;
        }
      }
    }
    return total;
}

const onPageChange = async (e) => {
  const { page, rows } = e;
  await setCurrentPage(page);
  await setRows(rows);
  const { role, module, action } = getValues();
  search( role, module, action, currentPage, rows);
};

  return (
    <>
      <div className='card'>
      <DataTable 
        value={groupPermissions}
        responsiveLayout='scroll'
        rowGroupMode='subheader'
        groupRowsBy='role'
        emptyMessage='No Group Permissions found.'
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
              header='Role' 
              field='role'
              filterField='key'
              showFilterMenu={false} 
              filterMenuStyle={{ width: '20%'}} 
              style={{ minWidth: '20%' }} 
              body={groupPermissions.role} 
              filter 
              filterPlaceholder='Search by Role' 
              filterElement={roleFilterTemplate}
              sortable
            />

            <Column 
              header='Module' 
              field='module'
              filterField='key' 
              showFilterMenu={false} 
              filterMenuStyle={{ width: '20%'}} 
              style={{ minWidth: '20%' }} 
              body={groupPermissions.module}
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
              body={groupPermissions.action} 
              filter 
              filterElement={actionFilterTemplate} 
              filterPlaceholder='Action'
              sortable
            /> 
          </DataTable>
        </div>
    </>
  )
}

export default GroupPermissions
