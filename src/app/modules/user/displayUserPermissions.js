import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';

import UserPermissionsDataService from '../../core/actions/userPermissions';
import { Icon } from '@iconify/react';

import { ButtonPrimary1 } from './components/UserElements';

const DisplayUserPermissions = ({ userId, handlePermission }) => {
  const [userPermissions, setUserPermissions] = useState([]);
  const [oldUserPermissions, setOldUserPermissions] = useState([]);
  useEffect(async () => {
    UserPermissionsDataService.getAllUserPermissions(
      userId,
      '',
      '',
      '',
      [],
      0,
      500
    ).then((userPermissionsData) => {
      const userPermissions = userPermissionsData.data.userPermissions;
      setUserPermissions(userPermissions);
      const oup = JSON.parse(JSON.stringify(userPermissions));
      setOldUserPermissions(oup);
    });
  }, []);

  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1;
  };

  const checkedBodyTemplate = (rowData) => {
    return (
      <div>{rowData.checked ? (<Icon icon='fluent:checkbox-checked-20-filled' color='#2196F3' width='28' height='28' />) : (<Icon icon='fluent:checkbox-unchecked-16-filled' color='#2196F3' width='28' height='28' />)}</div>
    );
  };

  const checkedEditor = (options) => {
    const { rowData } = options;
    return (
      <Checkbox
        checked={rowData.checked}
        value={rowData.checked}
        onChange={(e) => options.editorCallback(e.checked)}
      />
    );
  };

  const onCheckedEditComplete = (e) => {
    let { rowData, newValue, field, originalEvent: event } = e;

    switch (field) {
      case 'checked':
        rowData[field] = newValue;
        break;
      default:
        event.preventDefault();
        break;
    }
  };

  const onUserPermissionsSave = async () => {
    const updatedUserPermissions = userPermissions.filter(function(obj) {
      return oldUserPermissions.some(function(obj2) {
          return obj.checked !== obj2.checked;
      });
    });
    for (let index = 0; index < updatedUserPermissions.length; index++) {
      const up = updatedUserPermissions[index];
      await UserPermissionsDataService.updateUserPermissions(up.id, up); 
    }
    handlePermission();
  }

  const onUserPermissionsReset = () => {
    const up = JSON.parse(JSON.stringify(oldUserPermissions));
    setUserPermissions(up);
  }

  return (
    <>
      <DataTable
        value={userPermissions}
        editMode='cell'
        className='editable-cells-table'
        responsiveLayout='scroll'
      >
        <Column
          field='Index'
          header='Sr. No.'
          body={onIndexTemplate}
          style={{ width: '4em' }}
          key='Index'
        />
        <Column
          key='module'
          header='Module'
          field='module'
          style={{ minWidth: '20%' }}
        />
        <Column
          key='action'
          field='action'
          header='Action'
          style={{ minWidth: '20%' }}
        />
        <Column
          key='checked'
          field='checked'
          header='Checked'
          style={{ minWidth: '10%' }}
          body={checkedBodyTemplate}
          editor={(options) => checkedEditor(options)}
          onCellEditComplete={onCheckedEditComplete}
        />
      </DataTable>
      <ButtonPrimary1 onClick={onUserPermissionsSave}>
        <Icon
          icon='fluent:save-16-regular'
          color='${(props) => props.theme.primaryColor}'
          width='20'
          height='20'
        />
        &nbsp; Save
      </ButtonPrimary1>
      <ButtonPrimary1 onClick={onUserPermissionsReset}>
        <Icon
          icon='fluent:arrow-reset-24-filled'
          color='${(props) => props.theme.primaryColor}'
          width='20'
          height='20'
        />
        &nbsp; Reset
      </ButtonPrimary1>
    </>
  );
};

export default DisplayUserPermissions;
