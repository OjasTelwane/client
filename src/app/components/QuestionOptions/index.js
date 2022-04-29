import React from 'react';
import {
  CompanyTitleContainer,
  CompanyLogo,
  CompanyTitle,
  QuestionOptionForm,
  QuestionAddNewTag,
  QuestionContainer,
  QuestionTitleRow,
  QuestionTextContainer,
  QuestionTextArea,
  Title,
  TextArea,
  QuestionTagContainerRow,
  QuestionTagsSelect,
  OptionWrapContainer,
  OptionContainer,
  OptionTitleRow,
  OptionTitle,
  OptionContainerRow,
  OptionTextContainer,
  OptionTextArea,
  BtnContainer,
  Button,
  TagsContainer,
  TagContainerRow,
  TagsSelect,
  Tags,
  AddNewTag, 

} from './QuestionOptionElements';
import Select from 'react-select';
import { Icon } from '@iconify/react';
import * as Yup from 'yup';
import { Formik, useFormik, Form } from 'formik';

 // const formik = useFormik({
  const initialValues = {
    type: '',
    voided: '',
    isVerified: '',
    
    ques_text: '',
    ques_file: '',
    ques_fileContentType: '',
    ques_tags: '',
    
    options1_setNo: '',
    options1_id: '',
    options1_text: '',
    options1_file: '',
    options1_fileContentType: '',
    options1_tag: '',
    options1_weightage: '',             

    options2_setNo: '',
    options2_id: '',
    options2_text: '',
    options2_file: '',
    options2_fileContentType: '',
    options2_tag: '',
    options2_weightage: '',              

    options3_setNo: '',
    options3_id: '',
    options3_text: '',
    options3_file: '',
    options3_fileContentType: '',
    options3_tag: '',
    options3_weightage: '',              

    options4_setNo: '',
    options4_id: '',
    options4_text: '',
    options4_file: '',
    options4_fileContentType: '',
    options4_tag: '',
    options4_weightage: ''                        
  }
  // validationSchema
// });

const validateSchema = Yup.object({

  isActive: Yup.boolean().default(false),
  isVerified: Yup.boolean(),
  verifiedBy: Yup.string(),
	createdBy: Yup.string(),
	modifiedBy: Yup.string(),
  text: Yup.string(),
  file: Yup.string(),
  fileContentType: Yup.string(),
  selection_type: Yup.string(),
  selection_selection: Yup.string(),
  tags: Yup.string(),
  
  options1_setNo: Yup.number().default(1),
  options1_id: Yup.number().default(1),
  options1_text: Yup.string(),
  options1_file: Yup.string(),
  options1_fileContentType: Yup.string(),
  options1_tag: Yup.string(),
  options1_weightage: Yup.number().default(0),             

  options2_setNo: Yup.number().default(1),
  options2_id: Yup.number().default(2),
  options2_text: Yup.string(),
  options2_file: Yup.string(),
  options2_fileContentType: Yup.string(),
  options2_tag: Yup.string(),
  options2_weightage: Yup.number().default(0),              

  options3_setNo: Yup.number().default(1),
  options3_id: Yup.number().default(3),
  options3_text: Yup.string(),
  options3_file: Yup.string(),
  options3_fileContentType: Yup.string(),
  options3_tag: Yup.string(),
  options3_weightage: Yup.number().default(0),              

  options4_setNo: Yup.number().default(1),
  options4_id: Yup.string().default(4),
  options4_text: Yup.string(),
  options4_file: Yup.string(),
  options4_fileContentType: Yup.string(),
  options4_tag: Yup.string(),
  options4_weightage: Yup.number().default(0)                    

  // type: Yup.string().required('Rrequired'),
  // voided: Yup.boolean().default(false),
  // isVerified: Yup.boolean(),
  // question: {
  //   ques: {
  //     text: Yup.string(),
  //     file: Yup.string(),
  //     fileContentType: Yup.string(),
  //     tags: [Yup.string()]
  //   },
  //   options: [
  //     {
  //       setNo: Yup.number().default(1),
  //       id: Yup.string().required('Required'),
  //       text: Yup.string(),
  //       file: Yup.string(),
  //       fileContentType: Yup.string(),
  //       tags: [
  //         {
  //           tag: Yup.string().required('Required'),
  //           weightage: Yup.number()
  //         }
  //       ]
  //     }
  //   ]
  // }
});

const onSubmit = (values) => {
  console.log('Form data -->', values);
  // values are verfied
  const newQuestion = { type: activeIndex, question: { ques, options } };
  createQuestion(newQuestion);
  //
};


const QuestionOptions = () => {

      const formik = useFormik({
        validateSchema
      });
    
    
   

  const tagOptions = [
    { value: 'Analytical Skills', label: 'Analytical Skills' },
    { value: 'Attention to Details', label: 'Attention to Details' },
    { value: 'Critical Thinking', label: 'Critical Thinking' },
    { value: 'Handle Pressure', label: 'Handle Pressure' },
    { value: 'Communication Skills', label: 'Communication Skills' },
    { value: 'Open Minded', label: 'Open Minded' },
    { value: 'Team Player', label: 'Team Player' },
    { value: 'Good Listener', label: 'Good Listener' },
    { value: 'Empathetic', label: 'Empathetic' },
    { value: 'Problem Solving Skills', label: 'Problem Solving Skills' },
    { value: 'Technical Skills', label: 'Technical Skills' }
  ];
  return (
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={onSubmit}
    >
      <CompanyTitleContainer>
        <CompanyLogo>
          <CompanyTitle>IMATMI</CompanyTitle>
        </CompanyLogo>
      </CompanyTitleContainer>
      <QuestionOptionForm onSubmit={formik.handleSubmit}>
        <QuestionContainer>
          <QuestionTitleRow>
            <Title>Question</Title>
          </QuestionTitleRow>
          <QuestionTextContainer>
            <QuestionTextArea>
              <textarea
              type='textarea'
              id='text'
              name='ques_text'
              { ... formik.getFieldProps('ques_text')}
              >
              </textarea>
            </QuestionTextArea>
            <BtnContainer>
              <Button>
                <Icon
                  icon='ic:baseline-add-photo-alternate'
                  color='white'
                  width='24'
                  height='24'
                />
                Image
                {/* <span className=' d-none d-sm-none d-md-block '>Image</span> */}
              </Button>
              <Button>
                <Icon
                  icon='iconoir:music-1-add'
                  color='white'
                  width='24'
                  height='24'
                />
                Audio
              </Button>
              <Button>
                <Icon
                  icon='fluent:video-add-24-regular'
                  color='white'
                  width='24'
                  height='24'
                />
                Video
              </Button>
            </BtnContainer>
          </QuestionTextContainer>

          <QuestionTagContainerRow>
            <Tags>Tags</Tags>
            <QuestionTagsSelect>
              <Select
                isMulti
                name='tags'
                options={tagOptions}
                className='basic-multi-select'
                classNamePrefix='select'
              />
            </QuestionTagsSelect>
            <QuestionAddNewTag>
              <Button>
                <Icon
                  icon='carbon:add-alt'
                  color='white'
                  width='24'
                  height='24'
                />
                Add
              </Button>
            </QuestionAddNewTag>
          </QuestionTagContainerRow>
        </QuestionContainer>
        <QuestionContainer>
          <QuestionTitleRow>
            <Title>Options</Title>
          </QuestionTitleRow>
        </QuestionContainer>
        <OptionWrapContainer>
          <OptionContainer>
            <OptionTitleRow>
              <OptionTitle>Option A</OptionTitle>
            </OptionTitleRow>
            <OptionContainerRow>
              <OptionTextContainer>
                <OptionTextArea>
                <textarea
                  type='textarea'
                  id='options1_text'
                  name='options1_text'
                  { ... formik.getFieldProps('options1_text')}
                  >

                </textarea>
                </OptionTextArea>
                <BtnContainer>
                  <Button>
                    <Icon
                      icon='ic:baseline-add-photo-alternate'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Image
                  </Button>
                  <Button>
                    <Icon
                      icon='iconoir:music-1-add'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Audio
                  </Button>
                  <Button>
                    <Icon
                      icon='fluent:video-add-24-regular'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Video
                  </Button>
                </BtnContainer>
              </OptionTextContainer>
            </OptionContainerRow>
            <TagsContainer>
              <TagContainerRow>
                <Tags>Tags</Tags>
                <TagsSelect>
                  <Select
                    isMulti
                    name='tags'
                    options={tagOptions}
                    className='basic-multi-select'
                    classNamePrefix='select'
                  />
                </TagsSelect>
                <AddNewTag>
                  <Button>
                    <Icon
                      icon='carbon:add-alt'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Add
                  </Button>
                </AddNewTag>
              </TagContainerRow>
            </TagsContainer>
          </OptionContainer>
          <OptionContainer>
            <OptionTitleRow>
              <OptionTitle>Option B</OptionTitle>
            </OptionTitleRow>
            <OptionContainerRow>
              <OptionTextContainer>
                <OptionTextArea>
                <textarea
                  type='textarea'
                  id='options2_text'
                  name='options2_text'
                  { ... formik.getFieldProps('options2_text')}
                  >

                </textarea>
                </OptionTextArea>
                <BtnContainer>
                  <Button>
                    <Icon
                      icon='ic:baseline-add-photo-alternate'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Image
                  </Button>
                  <Button>
                    <Icon
                      icon='iconoir:music-1-add'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Audio
                  </Button>
                  <Button>
                    <Icon
                      icon='fluent:video-add-24-regular'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Video
                  </Button>
                </BtnContainer>
              </OptionTextContainer>
            </OptionContainerRow>
            <TagsContainer>
              <TagContainerRow>
                <Tags>Tags</Tags>
                <TagsSelect>
                  <Select
                    isMulti
                    name='tags'
                    options={tagOptions}
                    className='basic-multi-select'
                    classNamePrefix='select'
                  />
                </TagsSelect>
                <AddNewTag>
                  <Button>
                    <Icon
                      icon='carbon:add-alt'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Add
                  </Button>
                </AddNewTag>
              </TagContainerRow>
            </TagsContainer>
          </OptionContainer>
          <OptionContainer>
            <OptionTitleRow>
              <OptionTitle>Option C</OptionTitle>
            </OptionTitleRow>
            <OptionContainerRow>
              <OptionTextContainer>
                <OptionTextArea>
                <textarea
                  type='textarea'
                  id='options3_text'
                  name='options3_text'
                  { ... formik.getFieldProps('options3_text')}
                  >

                </textarea>
                </OptionTextArea>
                <BtnContainer>
                  <Button>
                    <Icon
                      icon='ic:baseline-add-photo-alternate'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Image
                  </Button>
                  <Button>
                    <Icon
                      icon='iconoir:music-1-add'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Audio
                  </Button>
                  <Button>
                    <Icon
                      icon='fluent:video-add-24-regular'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Video
                  </Button>
                </BtnContainer>
              </OptionTextContainer>
            </OptionContainerRow>
            <TagsContainer>
              <TagContainerRow>
                <Tags>Tags</Tags>
                <TagsSelect>
                  <Select
                    isMulti
                    name='tags'
                    options={tagOptions}
                    className='basic-multi-select'
                    classNamePrefix='select'
                  />
                </TagsSelect>
                <AddNewTag>
                  <Button>
                    <Icon
                      icon='carbon:add-alt'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Add
                  </Button>
                </AddNewTag>
              </TagContainerRow>
            </TagsContainer>
          </OptionContainer>
          <OptionContainer>
            <OptionTitleRow>
              <OptionTitle>Option D</OptionTitle>
            </OptionTitleRow>
            <OptionContainerRow>
              <OptionTextContainer>
                <OptionTextArea>
                <textarea
                  type='textarea'
                  id='options4_text'
                  name='options4_text'
                  { ... formik.getFieldProps('options4_text')}
                  >

                </textarea>
                </OptionTextArea>
                <BtnContainer>
                  <Button>
                    <Icon
                      icon='ic:baseline-add-photo-alternate'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Image
                  </Button>
                  <Button>
                    <Icon
                      icon='iconoir:music-1-add'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Audio
                  </Button>
                  <Button>
                    <Icon
                      icon='fluent:video-add-24-regular'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Video
                  </Button>
                </BtnContainer>
              </OptionTextContainer>
            </OptionContainerRow>
            <TagsContainer>
              <TagContainerRow>
                <Tags>Tags</Tags>
                <TagsSelect>
                  <Select
                    isMulti
                    name='tags'
                    options={tagOptions}
                    className='basic-multi-select'
                    classNamePrefix='select'
                  />
                </TagsSelect>
                <AddNewTag>
                  <Button>
                    <Icon
                      icon='carbon:add-alt'
                      color='white'
                      width='24'
                      height='24'
                    />
                    Add
                  </Button>
                </AddNewTag>
              </TagContainerRow>
            </TagsContainer>
          </OptionContainer>
        </OptionWrapContainer>
        <ButtonSection>
          <button type='submit'></button>
        </ButtonSection>
      </QuestionOptionForm>
    </Formik>

    </>
  )
};

export default QuestionOptions;
