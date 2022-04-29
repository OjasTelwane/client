/*******************************************************************************************************
 * Add Option file
 * @company : Imatmi.
 * @author : Ojas Telwane.
 * @Copyright : 2021 Imatmi.
 * =====================================================================================================
 * Modification History
 * Date				Modified By		Changes Description
 * 31/09/2021 Ojas Telwane	Created, migrated from component module to function module
 *******************************************************************************************************/

import React, { useState, useEffect } from 'react'
import { useFieldArray, Controller } from 'react-hook-form';
import { Icon } from '@iconify/react';
import { MultiSelect } from 'primereact/multiselect';
import { fileDelete, fileUpload } from '../../core/actions/fileUpload';
import TagDataService from '../../core/actions/tag';

import {
  BtnContainer,
  Button,
  Tags,
  OptionContainer,
  OptionTitleRow,
  OptionTitle,
  OptionContainerRow,
  OptionTextContainer,
  EditTextArea,
  TagsContainer,
  TagContainerRow,
  TagsSection,
  MultiSelectContainer,
  ButtonPrimary1,
  Row, 
  CheckBox, 
  CheckBoxLabel
} from './components/QuestionElements';
import AddMedia from './addMedia';
import PreviewMediaWithDelete from './PreviewMediaWithDelete';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const AddOption = (prop) => {
  const { register, control, formState, setValue, watch, getValues} = prop; // retrieve all hook methods
  let { tagList } = prop;
  const [filesSize, setFilesSize ] = useState(0);
  const {append, fields, remove } = useFieldArray({
    control,
    name: 'options'
  })

  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);
  // const [tagList, setTagList] = useState([]);

  const loadTagList = async () => {
    const response = await TagDataService.getAllTags();
    console.log('response.data', response.data);

    if(response.data) {
      const list = response.data;
      tagList = list.map((t) => {
        return { value:t.tag, label: t.tag}; } 
      );
      // setTagList(tagList)
      // setValue(tagList)
      console.log('tagList', tagList);
    }
  }

  useEffect(() => {
    if(refresh) {
      setRefresh(false);
    }
  }, [refresh, tagList ] );

  const handleSave = (files, index) => {
    console.log(files, index);
    setOpen(false);
    for(var i=0;i<files.length;i++) {
      fileUpload(files[i]).then((response) => {
        fields[index].files.push(response.data);
        setValue(`options[${index}].files`, fields[index].files);
        setFilesSize(filesSize+1);
      }).catch((err)=> console.log(err));
    }
  }


  const deleteFile = (src, index) => {
    fileDelete(src).then((res)=>{
      console.log(res);
      const temp = fields[index].files.filter((item) => { return item.src !== src });
      fields[index].files = temp;
      setValue(`options[${index}].files`, fields[index].files);
      setFilesSize(filesSize-1);
    }).catch((err)=> console.log(err));
  }

  const panelFooterTemplate = (props) => {
    const length = props.visibleOptions ? props.visibleOptions.length : 0;
    const addTag = props.filterValue || '';
    return (
      <>
        {length === 0 ? (
          <div className='p-py-3 p-px-10'>
            <span>{addTag}&nbsp;&nbsp;</span>
            <Button onClick={ async () => { 
              await onAddTag(addTag)
            } }>
              <Icon
                icon='carbon:add-alt'
                color='${(props) => props.theme.primaryColor}'
                width='20'
                height='20'
              />
              &nbsp; Add
            </Button>
          </div>
        ) : ('')}
      </>
    );
  }

  const onAddTag = async (new_tag) => {
    console.log('on Save tag func called ==> ', new_tag);
    if(new_tag && new_tag.trim() !== '') {
      var tag = new_tag.trim();
      var newTag = { tag: tag};
      console.log('new tag==> ', newTag);
      TagDataService.createTag(newTag)
      .then((response) => {
        console.log('Response from server', response.data);
      })
      .catch((e) => {
        console.log('error==>', e);
      });
      await loadTagList();
      setRefresh(true);
      
    }
  }

  return (
    <div className='card mb-4' style={{'border' : 'none', 'borderRadius' : '10px' }}>
      <div className='card-body'>
        {
          fields.map((field, index) => (
            <>
                <OptionContainer key={field.id}>
                  <OptionTitleRow>
                    <OptionTitle>Option {index+1}</OptionTitle>
                  </OptionTitleRow>
                  <OptionContainerRow>
                    <OptionTextContainer>
                        <EditTextArea
                          key={field.id}
                          type='text'
                          {...register(`options[${index}].text`)} defaultValue={field.text}
                        />
                        <BtnContainer>
                          <AddMedia id={index} handleFiles={handleSave} />
                          <OverlayTrigger
                              key='left'
                              placement='left'
                              overlay={
                                  <Tooltip id='tooltip-left'>
                                  <strong>Remove Option</strong>
                                  </Tooltip>
                              }
                          >
                          <Button onClick={ () => { 
                              remove(index);
                            } }>
                            <Icon icon='ant-design:delete-outlined'
                              color='${(props) => props.theme.primaryColor}'
                              width='20'
                              height='20'
                            />&nbsp;
                          </Button>
                          </OverlayTrigger>
                        </BtnContainer>
                    </OptionTextContainer>
                  </OptionContainerRow>
                  <TagsContainer>
                    <TagContainerRow>
                      <TagsSection>
                      <Tags>Tags</Tags>
                      <MultiSelectContainer>
                        <Controller
                          control={control}
                          name={`options[${index}].tags`}
                          render={({ field: { onChange, onBlur, value, ref } }) => (
                              <MultiSelect 
                                key={field.id}
                                filter filterBy='label' 
                                defaultValue={field.tags}
                                options={tagList}
                                onChange={(e) => {
                                  onChange(e.value);
                                }}
                                onBlur={onBlur}
                                panelFooterTemplate={panelFooterTemplate}
                                value={value}
                                placeholder='Select Tags' 
                                display='chip' />
                          )} 
                        />
                      </MultiSelectContainer>
                      </TagsSection>
                    </TagContainerRow>
                  </TagsContainer>
                  <PreviewMediaWithDelete files={field.files} deleteFile = {deleteFile} id={index}/>
                  <Row>
                  <Controller
                    control={control}
                    value={field.isCorrect}
                    name={`options[${index}].isCorrect`}
                    render={({ field: { onChange, onBlur, value, ref, checked } }) => (
                        <CheckBox
                          key={field.id}
                          type='checkbox'
                          checked={value}
                          onChange={(e) => {
                            onChange(e.target.checked);
                          }}
                          onBlur={onBlur} />
                    )} 
                  />
                  <CheckBoxLabel>Is Correct?</CheckBoxLabel>
                  </Row>
                </OptionContainer>
            </>
          ))
        }
        <ButtonPrimary1 onClick={ () => append({
              setNo: 1,
              orderNo: 1,
              isCorrect: false,
              text: '',
              files: [],
              fileContentType: '',
              tags: []
            }) 
          }>
          Add Option
        </ButtonPrimary1>
      </div>
    </div>
  )
}

export default AddOption