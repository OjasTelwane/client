import React, {useState} from 'react'
import { Button } from './components/QuestionElements';
import { Icon } from '@iconify/react';
import {DropzoneDialog} from 'material-ui-dropzone';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
const AddMedia = ({id,handleFiles}) => {

    const [open, setOpen] = useState(false);
    return (
        <div>
            <OverlayTrigger
                key='left'
                placement='left'
                overlay={
                    <Tooltip id='tooltip-left'>
                    <strong>Upload file</strong>
                    </Tooltip>
                }
            >
                <Button onClick = {()=>setOpen(true)}>
                    <Icon
                    icon='fa-solid:file-upload'
                    color='blue'
                    width='18'
                    height='18'
                    />&nbsp;
                </Button>
                {/* <Button variant="secondary">Tooltip on {placement}</Button> */}
            </OverlayTrigger>
            
            <DropzoneDialog
                open={open}
                acceptedFiles={['image/*', 'video/*', 'audio/*']}
                filesLimit = {1}
                showPreviews={true}
                showPreviewsInDropzone={false}
                previewText='Selected Files'
                showFileNamesInPreview = {false}
                maxFileSize={5000000}
                onClose={() => setOpen(false)}
                onSave = {(files) => {handleFiles(files, id); setOpen(false)}}
            />
        </div>
    )
}

export default AddMedia;
