import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Logs = () => {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('logs').then((res)=>{
            setLogs(res.data);
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
        })        
    }, [])

    const typeTemplate = (row) => {
        return <span className={`product-badge status-${(row.level ? row.level.toLowerCase() : '')}`}>
            {row.level === 'info' && <div>success</div>}
            {row.level === 'error' && <div>error</div>}
        </span>
    }
    const byUserTemplate = (row) => {
        return <span>{row.meta.user[0]._doc.name}</span>
    }

    return (
        <div>
        <div className='card'>
                <DataTable value={logs} header='Logs' responsiveLayout='stack' breakpoint='960px' loading={loading}>
                    <Column field='level' header='Type' body={typeTemplate}/>
                    <Column field='message' header='Action' />
                    <Column field='meta' header='By user' body={byUserTemplate} />
                    <Column field='timestamp' header='Timestamp' />
                </DataTable>
            </div> 
        </div>
    )
}

export default Logs;
