import React, {useState, useEffect} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

const DisplayUsers = ( { selectedUsers, handleSelection } ) => {
    const [users, setUsers] = useState([]);
    useEffect( async () => {
        const data = await axios.get('http://localhost:8080/users');
        setUsers(data.data);
    }, [])
    return (
        <>
            <DataTable 
                selectionMode='checkbox'
                selection={selectedUsers}
                onSelectionChange={handleSelection} dataKey='id'
                value={users}
                scrollable
                scrollHeight='64vh'
                style={{ width: '100%' }}
            >
            <Column
                selectionMode='multiple'
                sortable={true}
                field='selectuser'
                header='Select'
                headerStyle={{ width: '10%' }}
                columnKey='selecteduser'
            ></Column>
            <Column
                sortable={true}
                field='name'
                header='Name'
                headerStyle={{ width: '30%' }}
                columnKey='name'
            />
            <Column
                sortable={true}
                field='email'
                header='Email'
                headerStyle={{ width: '40%' }}
                columnKey='email'
            />
            </DataTable>
        </>
    )
};

export default DisplayUsers;