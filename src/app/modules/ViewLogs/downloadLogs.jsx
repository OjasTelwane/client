import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Icon } from '@iconify/react';

const DownloadLogs = () => {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // setLogs([]);
        axios.get('log-files').then((res)=>{
            res.data.map((item) => {
                item.files.map((file) => {
                    logs.push({month : item.month, file : file});
                })
            })
            setLoading(false);
        }).catch((err)=>{
            console.log(err);
        })        
    }, [])
    // console.log('logs ' , logs);
    const downloadFile = (event) => {
        const data = event.target.value;
        console.log(event.target.id);
        axios({
            url: `app-logs/${data}`,
            method: 'GET',
            responseType: 'blob'
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const name = data.split('/')[1]
            link.setAttribute('download', `${name}`);
            document.body.appendChild(link);
            link.click();
        });
    }
    
    const downloadButton = (row) => {
        const url = `${row.month}/${row.file}`;
        return (
            <div>
                <button value={url} onClick={downloadFile}>
                {/* <Icon icon='fa-solid:file-download' id={url} onClick={downloadFile}>
                <button ></button> */}
                {/* </Icon>
                 */}
                 <Icon icon='fa-solid:file-download' />
                 Download

                </button>
            </div>
        )
    }
    return (
        <div>
            <div className='card'>
                {logs.length &&
                <DataTable value={logs} header='Download Logs' responsiveLayout='stack' breakpoint='960px' loading={loading}>
                    <Column field='month' header='Month'/>
                    <Column field='file' header='Day' />
                    <Column header='Download' body={downloadButton} />
                </DataTable>
                }
            </div>
        </div> 
    )
}

export default DownloadLogs;
