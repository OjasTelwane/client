import React from 'react';
import { Icon } from '@iconify/react';
import Select from 'react-select';
import { useFormik, Formik, Form } from 'formik';
import * as Yup from 'yup';

import {
  CompanyTitleContainer,
  CompanyLogo,
  CompanyTitle,
  QuestionContainer,
  QuestionBody,
  QuestionForm,
  Title,
  TextArea,
  Button,
  AddQuestionMedia,
  QuestionText,
  TagsRow,
  Tags,
  TagsEditButton,
  TagContainerRow,
  TagsSelect,
  AddNewTag
} from './QuestionElements';

const validateSchema = Yup.object({
    type: Yup.string().required('Rrequired'),
    voided: Yup.boolean().default(false),
    isVerified: Yup.boolean(),
    question: {
      ques: {
        text: Yup.string(),
        file: Yup.string(),
        fileContentType: Yup.string(),
        tags: [Yup.string()]
      },
      options: [
        {
          setNo: Yup.number().default(1),
          id: Yup.string().required('Required'),
          text: Yup.string(),
          file: Yup.string(),
          fileContentType: Yup.string(),
          tags: [
            {
              tag: Yup.string().required('Required'),
              weightage: Yup.number()
            }
          ]
        }
      ]
    }
  });

//   const formik = useFormik({
    const initialValues = {
      type: '',
      voided: '',
      isVerified: '',
      question: {
        ques: {
          text: '',
          file: '',
          fileContentType: '',
          tags: ['']
        },
        options: [
          {
            setNo: '',
            id: '',
            text: '',
            file: '',
            fileContentType: '',
            tags: [
              {
                tag: '',
                weightage: ''
              }
            ]
          }
        ]
      }
    };
    // validationSchema
//   });

  const onSubmit = (values) => {
    console.log('Form data -->', values);
  };


const Questions = () => {

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

  const q =
    'srcappmodulesquestionquestion.section.jsxLine 5:12:  Missing parentheses around multilines JSX  react/jsx-wrap-multilines';
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={onSubmit}>
        <CompanyTitleContainer>
          <CompanyLogo>
            <CompanyTitle>IMATMI</CompanyTitle>
          </CompanyLogo>
        </CompanyTitleContainer>
        <QuestionContainer onSubmit={formik.handleSubmit}>
          <QuestionBody>
            <QuestionForm>
              <Title>Question</Title>
              <TextArea>
                
                <QuestionText
                  type='textarea'
                  id='text'
                  name='text'
                  // onBlur={formik.handleBlur}
                  // onChange={formik.handleChange}
                  // value={formik.values.name}
                  {...formik.getFieldProps('text')}
                />
                {formik.touched.text && formik.errors.text ? (
                  <div className='error'>{formik.errors.text}</div>
                ) : null}

              </TextArea>
              <AddQuestionMedia>
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
              </AddQuestionMedia>
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
            </QuestionForm>
          </QuestionBody>
        </QuestionContainer>
      </Formik>
    </>
  
  )};

export default Questions;
