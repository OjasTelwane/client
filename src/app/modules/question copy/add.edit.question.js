import React, { useState, useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useForm, Controller, formState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fileDelete, fileUpload } from '../../core/actions/fileUpload';
import useFormPersist from 'react-hook-form-persist';
import { Icon } from '@iconify/react';

import { Dropdown } from 'primereact/dropdown';
import QuestionDataService from '../../core/actions/question';
import TagDataService from '../../core/actions/tag';
import questionSchema from './schemas/question.schema'
import AddOption from './add.option';
import ReactImageMagnify from 'react-image-magnify';
import SessionService from '../../core/services/useSessionStorage';

import {
  TitleBar, 
  QuestionContainer,
  SelectQuestionType,
  QuestionTitleRow,
  Title,
  EditTextArea,
  Row,
  CheckBox,
  CheckBoxLabel,
  BtnContainer,
  Button,
  OptionWrapContainer,
  QuestionOptionForm,
  QuestionOptionSubmitButtonSection,
  ButtonPrimary1,
  ButtonDanger,
  Tags
} from './components/QuestionElements';
import AddMedia from './addMedia';
import PreviewMediaWithDelete from './PreviewMediaWithDelete';
import { Notification } from '../../core/services/notification.service';
import Loading from '../../core/services/loading';

const AddEditQuestion = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [tagList, setTagList] = useState([]);
  const history = useHistory();
  const match = useRouteMatch();
  const mounted = useRef();
  const methods = useForm();
  const { id } = match.params;
  const isAddMode = !id;
  const [questionFiles, setQuestionFiles] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const questionTypeList = [
    {label: 'Single Choice', value: 0 },
    {label: 'Multiple Choice', value: 1 },
    {label: 'Re Order', value: 2 },
    {label: 'Evaluation', value: 3 }
  ];

  function getDefaultValues() {
    const { 
      questionType,
      isActive,
      isVerified,
      verifiedBy,
      text,
      files,
      selections,
      tags,
      options
      } = SessionService.getSessionStorageOrDefault('Question', {
        questionType: 0,
        isActive: true,
        isVerified: false,
        verifiedBy: '',
        text: '',
        files: [],
        selections: [],
        tags: [],
        options: []
    });
    return { 
      questionType: questionType,
      isActive: isActive,
      isVerified: isVerified,
      verifiedBy: verifiedBy,
      text: text,
      files: files,
      selections: selections,
      tags: tags,
      options: options
    };
  }

  const formOptions = { 
    resolver: yupResolver(questionSchema)
  };

  const { register, handleSubmit, formState: {isDirty}, formState, reset, getValues, control, setValue, getValue, watch } = useForm( { formOptions });

  //for functionality like componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      loadTagList();

      // console.log('isAddMode==>', isAddMode);
      // console.log('Question Id==>', id);
      if(!isAddMode) {
        QuestionDataService.getQuestion(id)
        .then((response) => {
          setLoading(false);
          const fields = ['questionType', 'isActive', 'isVerified', 'text', 'files', 'selections', 'tags', 'options'];
          const q = response.data;
          if(q.files)
            setQuestionFiles(q.files);
          const question = {
              questionType: q.questionType, 
              isActive: q.isActive,
              isVerified: q.isVerified,
              text: q.text,
              files: q.files,
              selections: q.selections,
              tags: q.tags,
              options: q.options && q.options.map((o) => {
                return {
                  setNo: o.setNo,
                  orderNo: o.orderNo,
                  isCorrect: o.isCorrect,
                  text: o.text,
                  files: o.files && o.files.map((f) => {
                    return {
                      src: f.src,
                      fileContentType: f.fileContentType,
                      type: f.type
                    }
                  }),
                  selections: o.selections,
                  tags: o.tags && o.tags.map((t) => {
                    return t.tag
                  })
                }
              })
          };
          console.log('question==>', question);
          // const { ...defaultValues } = response;
          // formOptions.defaultValues = defaultValues;
          fields.forEach(field => setValue(field, question[field]));
          // SessionService.setSessionStrage('Questions', getValues());
        })
        .catch((e) => {
          console.log('error==>', e);
        });
      }
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
    }
  }
  , []
  );

  useEffect(() => {
    if(refresh) {
      setRefresh(false);
    }
  }, [refresh, tagList ] );



  useEffect(() => {
    // SessionService.setSessionStrage('Questions', getValues());
  })

  // const {clear} = useFormPersist('Question', {watch, setValue}, {
  //   storage: window.sessionStorage
  // });

  const submitForm = (data) => {
  };

  const handleFileSave = (files, id) => {
    console.log(files);
    setOpen(false);
    for(var i=0;i<files.length;i++) {
      fileUpload(files[i]).then((response) => {
        setQuestionFiles([...questionFiles, response.data]);
      }).catch((err)=> console.log(err));
    }
  }
  
  const deleteFile = (src, id) => {
    fileDelete(src).then((res)=>{
      console.log(res);
      setQuestionFiles(questionFiles.filter((item) => { return item.src !== src} ));
    }).catch((err)=> console.log(err));
  }

  const loadTagList = async () => {
    const response = await TagDataService.getAllTags();
    // console.log('response.data', response.data);

    if(response.data) {
      const list = response.data;

      const tagList = list.map((t) => {
        return { value:t.tag, label: t.tag}; } 
      );
      setTagList(tagList)

      // console.log('tagList', tagList);
    } 
  }

  const getQuestion = async() => {
    const data = await getValues();
    console.log('data in getQuestion()==>', data);

    const question = {
      questionType: data.questionType,
      isActive: data.isActive,
      isVerified: data.isVerified,
      verifiedBy: data.verifiedBy,
      text: data.text,
      files: questionFiles.map((question, index) => {
        return question;
      }),
      selections: data.selections,
      tags: data.tags,
      options: data.options.map((o, index) => {
        return {
          // setNo: o.setNo,
          setNo: 1,
          // orderNo: questionType < 2 ? index + 1 : o.orderNo,
          orderNo: index,
          isCorrect: o.isCorrect,
          text: o.text,
          files: o.files,
          selections: o.selections,
          tags: o.tags.map((t) => {
            return {
              tag: t,
              weightage: 0
            }
          })
        }
      })
    };
    return question;
  }

  const save = async() => {
    const question = await getQuestion();
    console.log(question);
    setLoading(true);
    if(isAddMode){
      console.log("Current - ", question);
      try {
        const response = await QuestionDataService.createQuestion(question);
        console.log("response===>", response);
        SessionService.removeSessionStorage('Question');
        setLoading(false);
        Notification('success', 'Question saved successfully');
        var path = `/view_question/${response.data.id}`;
        history.push(path);
        return true;
      } catch (error) {
        console.log('error==>', error);
        Notification('error', 'Error');
      }
      return false;
    }
    else{
      console.log("Current - ", question);
      try {
        const response = await QuestionDataService.updateQuestion(id, question)
        console.log("response===>", response);
        SessionService.removeSessionStorage('Question');
        Notification('success', 'Question updated successfully');
        setLoading(false);
        var path = `/view_question/${response.data.id}`;
        history.push(path);
        return true;
      } catch (error) {
        console.log('error==>', error);
        Notification('error', 'Error');
        setLoading(false);
        return false;
      }
    }
  }

  const saveAndExit = async() => {
    const retValue = await save();
    console.log("retValue===>", retValue);
    if(retValue) {
      history.goBack();
  }
  }  

  const saveAndNew = async() => {
    const retValue = await save();
    if(retValue) {
      reset(getDefaultValues());
    }
  }

  const exitQuestion = async() => {
    SessionService.removeSessionStorage('Question');
    history.goBack();
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
    
    <div>{loading ? <Loading/> : 
      <form onSubmit={ handleSubmit(submitForm) }>
        <TitleBar>
            <QuestionTitleRow>
              { isAddMode ? <Title>Add New Question</Title> : <Title>Edit Question</Title> }
            </QuestionTitleRow>
        </TitleBar>
        <QuestionOptionForm>
          <QuestionContainer>
            
            <Row>
              <SelectQuestionType>
              <Controller
                control={control}
                name='questionType'
                render={({ field: { field, onChange, onBlur, value, ref }, fieldState }) => (
                  <Dropdown 
                      {...field}
                      options={questionTypeList}
                      placeholder='Select Question Type'
                      onChange={(e) => {
                        const {label, value} = e.value;
                        onChange(e.value);
                        console.log(label + ', ' + value);
                      }}
                      onBlur={onBlur}
                      value={value}
                      optionLabel='label'
                      optionValue='value'
                      filter showClear 
                      filterBy='label'
                  />
                )}
              />
              </SelectQuestionType>
            </Row>

            <Row>
              <EditTextArea
                  type='text'
                  {...register('text')}
              />
              <BtnContainer>
                <AddMedia id={0} handleFiles={handleFileSave} />
              </BtnContainer>
            </Row>
            <PreviewMediaWithDelete files={questionFiles} deleteFile = {deleteFile} id={0}/>
            <Row>
              <CheckBox
                type='checkbox'
                {...register('isVerified')}
              />
              <CheckBoxLabel htmlFor='isVerified'>is Verified</CheckBoxLabel>
            </Row>

          </QuestionContainer>
          <hr/>
          <OptionWrapContainer>
              <AddOption tagList={tagList} register={register} control={control} formState={formState} setValue={setValue} watch={watch} getValues={getValues} />
          </OptionWrapContainer>
          <Row>
            <QuestionOptionSubmitButtonSection>
              <ButtonPrimary1 onClick={saveAndNew}>
                <Icon
                  icon='carbon:add-alt'
                  color='${(props) => props.theme.primaryColor}'
                  width='20'
                  height='20'
                />
                <span className=' d-none d-sm-none d-md-block '>Save and Add New Question</span>
              </ButtonPrimary1>
              <ButtonPrimary1 onClick={saveAndExit}>
                <Icon
                  icon='fluent:save-16-regular'
                  color='${(props) => props.theme.primaryColor}'
                  width='20'
                  height='20'
                />
                <span className=' d-none d-sm-none d-md-block '>Save and Exit</span>
              </ButtonPrimary1>
              <ButtonDanger onClick={exitQuestion}>
                <Icon icon='icomoon-free:exit' color='${(props) => props.theme.dangerColor}' width='20' height='20' />
                <span className=' d-none d-sm-none d-md-block '>Exit</span>
              </ButtonDanger>
            </QuestionOptionSubmitButtonSection>
          </Row>
        </QuestionOptionForm>
      </form>
      }</div>

    // // Old Question UI
    // <div>{loading ? <Loading/> : 
    //   <form onSubmit={ handleSubmit(submitForm) }>
    //     <QuestionOptionForm>
    //       <QuestionContainer>
    //         <QuestionTitleRow>
    //           { isAddMode ? <Title>Add New Question</Title> : <Title>Edit Question</Title> }
    //         </QuestionTitleRow>
    //         <Row>
    //           <SelectQuestionType>
    //           <Controller
    //             control={control}
    //             name='questionType'
    //             render={({ field: { field, onChange, onBlur, value, ref }, fieldState }) => (
    //               <Dropdown 
    //                   {...field}
    //                   options={questionTypeList}
    //                   placeholder='Select Question Type'
    //                   onChange={(e) => {
    //                     const {label, value} = e.value;
    //                     onChange(e.value);
    //                     console.log(label + ', ' + value);
    //                   }}
    //                   onBlur={onBlur}
    //                   value={value}
    //                   optionLabel='label'
    //                   optionValue='value'
    //                   filter showClear 
    //                   filterBy='label'
    //               />
    //             )}
    //           />
    //           </SelectQuestionType>
    //         </Row>

    //         <Row>
    //           <EditTextArea
    //               type='text'
    //               {...register('text')}
    //           />
    //           <BtnContainer>
    //             <AddMedia id={0} handleFiles={handleFileSave} />
    //           </BtnContainer>
    //         </Row>
    //         <PreviewMediaWithDelete files={questionFiles} deleteFile = {deleteFile} id={0}/>
    //         <Row>
    //           <CheckBox
    //             type='checkbox'
    //             {...register('isVerified')}
    //           />
    //           <CheckBoxLabel htmlFor='isVerified'>is Verified</CheckBoxLabel>
    //         </Row>

    //       </QuestionContainer>
    //       <hr/>
    //       <OptionWrapContainer>
    //           <AddOption tagList={tagList} register={register} control={control} formState={formState} setValue={setValue} watch={watch} getValues={getValues} />
    //       </OptionWrapContainer>
    //       <Row>
    //         <QuestionOptionSubmitButtonSection>
    //           <ButtonPrimary1 onClick={saveAndNew}>
    //             <Icon
    //               icon='carbon:add-alt'
    //               color='${(props) => props.theme.primaryColor}'
    //               width='20'
    //               height='20'
    //             />
    //             <span className=' d-none d-sm-none d-md-block '>Save and Add New Question</span>
    //           </ButtonPrimary1>
    //           <ButtonPrimary1 onClick={saveAndExit}>
    //             <Icon
    //               icon='fluent:save-16-regular'
    //               color='${(props) => props.theme.primaryColor}'
    //               width='20'
    //               height='20'
    //             />
    //             <span className=' d-none d-sm-none d-md-block '>Save and Exit</span>
    //           </ButtonPrimary1>
    //           <ButtonDanger onClick={exitQuestion}>
    //             <Icon icon='icomoon-free:exit' color='${(props) => props.theme.dangerColor}' width='20' height='20' />
    //             <span className=' d-none d-sm-none d-md-block '>Exit</span>
    //           </ButtonDanger>
    //         </QuestionOptionSubmitButtonSection>
    //       </Row>
    //     </QuestionOptionForm>
    //   </form>
    //   }</div>
  );
};

export default AddEditQuestion;
