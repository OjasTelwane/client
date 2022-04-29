import React, {useState, useEffect} from 'react'
import { Icon } from '@iconify/react';
import { MultiSelect } from 'primereact/multiselect';
import { Button, Modal, Form } from 'react-bootstrap';
import TagDataService from '../../core/actions/tag';

import {
    QuestionAddNewTag
  } from './components/QuestionElements';


const SelectTags = ({id, value, name, handleTags, showAdd}) => {
    const [options, setOptions] = useState([]);
    const [showNewOptionTag, setshowNewOptionTag] = useState(false);
    const [newTag, setNewTag] = useState('');

    const loadTagList = async() => {
        const response = await TagDataService.getAllTags();
        if(response.data) {
          const list = response.data;
          const tagList = list.map((t) => {
            return { value:t.tag, label: t.tag}; } 
          );
          setOptions(tagList);
        }    
    }

    const onSaveTag = () => {
        setshowNewOptionTag(false);
        if(newTag) {
            var tag = newTag.trim();
            var Tag = {tag:tag};
        
            TagDataService.createTag(Tag)
            .then((response) => {
                console.log('Response from server', response.data);
            })
            .catch((e) => {
                console.log('error==>', e);
            });
            loadTagList(); 
        }
    }

    useEffect(() => {
        loadTagList();
        console.log(value);
    }, [])
    return (
        <div>
            <MultiSelect 
                filter 
                filterBy='label' 
                id = {id}
                value={value} 
                options={options} 
                name = {name}
                onChange={handleTags} 
                placeholder='Select Tags' 
                display='chip' 
            />
            { showAdd &&
            <QuestionAddNewTag>
                <Button onClick = {()=> setshowNewOptionTag(true)} variant='outline-primary'>
                    <Icon
                        icon='carbon:add-alt'
                        color='white'
                        width='24'
                        height='24'
                        />&nbsp;
                        Add
                </Button>
            </QuestionAddNewTag>
            }   
            <Modal
            show={showNewOptionTag}
            onHide={() => setshowNewOptionTag(false)}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>
                    Add new tag here
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control type='text' placeholder='Enter tag' onChange = {(e) => setNewTag(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
            <Button variant='secondary' onClick={()=> {setshowNewOptionTag(false); setNewTag("")}}>
                Close
            </Button>
            <Button variant='primary' onClick={onSaveTag}>
                Save 
            </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SelectTags;
