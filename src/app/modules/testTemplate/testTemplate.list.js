/*******************************************************************************************************
 * Question List file
 * @company : Imatmi.
 * @author : Ojas Telwane.
 * @Copyright : 2021 Imatmi.
 * =====================================================================================================
 * Modification History
 * Date				Modified By		Changes Description
 * 31/09/2021 Ojas Telwane	Created, migrated from component module to function module
 *******************************************************************************************************/

import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import QuestionDataService from '../../core/actions/question';
import TagDataService from '../../core/actions/tag';
import SessionService from '../../core/services/useSessionStorage';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Icon } from '@iconify/react';
import { SelectButton } from 'primereact/selectbutton';
import { MultiSelect } from 'primereact/multiselect';

import {
  QuestionListForm,
  Heading,
  Row,
  ButtonSml,
  ButtonIcon,
  DangerButtonSml,
  ButtonPrimary,
  AddQuestion
} from './components/QuestionElements';

const TestList = () => {
  const history = useHistory();

  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isTable, setIsTable] = useState(true);
  const [value1, setValue1] = useState('Table');
  const [selectedTags, setSelectedTags] = useState(null);
  const [tagList, setTagList] = useState([]);
  const dt = useRef(null);
  
  const onTagsChange = (e) => {
    dt.current.filter(e.value, 'tags', 'contains');
    setSelectedTags(e.value);
}

  const tagsFilter = <MultiSelect 
                        filter
                        filterBy='label' 
                        value={selectedTags} 
                        options={tagList} 
                        onChange={onTagsChange} 
                        placeholder='All' 
                        className='p-column-filter'
                        display='chip' />;

  const tableOptions = [
    { icon: 'pi pi-table', value: 'Table' },
    { icon: 'pi pi-list', value: 'List' }
  ];

  const tableTemplate = (option) => {
    return <i className={option.icon}>&nbsp;{option.value}</i> ;
  };

  const schema = yup.object().shape({
    text: yup.string(),
    tag: yup.string(),
    optionText: yup.string()
  });

  function getDefaultValues() {
    const { text, tag, optionText } = SessionService.getSessionStorageOrDefault(
      'QuestionList',
      {
        text: '',
        tag: '',
        optionText: ''
      }
    );
    return {
      text: text,
      tag: tag,
      optionText: optionText
    };
  }

  const { register, handleSubmit, reset, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValues()
  });

  const search = async (
    text,
    tag,
    optionText,
    currentPage,
    rows
  ) => {
    QuestionDataService.getAllQuestions(
      text,
      tag,
      optionText,
      currentPage,
      rows
    )
      .then((response) => {
        const { totalItems, currentPage, totalPages, questions } =
          response.data;
        setQuestions(questions);
        setCurrentPage(currentPage);
        setTotalRecords(totalItems);
        SessionService.setSessionStrage('QuestionList', {
          text: text,
          tag: tag,
          optionText: optionText,
          currentPage: currentPage,
          rows: rows
        });
      })
      .catch((e) => {
        console.log('error from server:', e.message);
      });
  };

  const loadTagList = async () => {
    const response = await TagDataService.getAllTags();
    console.log('response.data', response.data);
    if(response.data) {
      const list = response.data;
      const tagList = list.map((t) => {
        return { value:t.tag, label: t.tag}; } 
      );
      setTagList(tagList)
      console.log('tagList', tagList);
    } 
  }

  useEffect(() => {
    loadTagList();
    const { text, tag, optionText, currentPage, rows } =
      SessionService.getSessionStorageOrDefault('QuestionList', {
        text: '',
        tag: '',
        optionText: '',
        
        currentPage: 0,
        rows: 10
      });
    search(text, tag, optionText, currentPage, rows);
  }, []);

  const submitForm = (data) => {
    console.log(data);
    const { text, tag, optionText } = data;
    search(text, tag, optionText, currentPage, rows);
  };

  const onPageChange = async (e) => {
    const { page, rows } = e;
    await setCurrentPage(page);
    await setRows(rows);
    const { text, tag, optionText } = getValues();
    search(text, tag, optionText, currentPage, rows);
  };

  const editQuestion = async (question) => {
    var id = question.id;
    var path = `/update_question/${id}`;
    console.log('path==>', path);
    history.push(path);
  };
  const viewQuestion = async (question) => {
    var id = question.id;
    var path = `/view_question/${id}`;
    history.push(path);
  };

  const addTest = async () => {
    var path = `/test_creation`;
    console.log('path==>', path);
    history.push(path);
  };

  const deleteQuestion = async (question, index) => {
    console.log('Question To Delete==>', question);
    QuestionDataService.deleteQuestion(question.id, question);
  };

  const removeQuestion = async (question, index) => {
    console.log('Question To Remove==>', question);
    QuestionDataService.removeQuestion(question.id, question);
  };

  const viewQuestionTable = (rowData) => {
    console.log('rowData==>', rowData);
  };

  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1;
  };

  const onTableChange = (e) => {
    setValue1(e.value);
    if (e.value === 'Table') {
      setIsTable(true);
    } else {
      setIsTable(false);
    }
  };

  
  const tagsBodyTemplate = (rowData) => {
    let tagStr = '';
    rowData.tags.forEach(tag => {
      tagStr = tagStr + tag +', ';
    });
    return <span>{tagStr}</span>;
};

  const actionBtnTemplate = (rowData) => {
    return (
      <>
        <ButtonSml width='40px' onClick={() => viewQuestion(rowData)}>
          <Icon
            icon='fluent:reading-mode-mobile-24-regular'
            color='${(props) => props.theme.primaryColor}'
            width='20'
            height='20'
          />
        </ButtonSml>
        <ButtonSml width='40px' onClick={() => editQuestion(rowData)}>
          <Icon
            icon='clarity:note-edit-line'
            color='${(props) => props.theme.primaryColor}'
            width='20'
            height='20'
          />
        </ButtonSml>
        <DangerButtonSml width='40px' onClick={() => deleteQuestion(rowData)}>
          <Icon
            icon='ant-design:delete-outlined'
            color='${(props) => props.theme.dangerColor}'
            width='20'
            height='20'
          />
        </DangerButtonSml>
      </>
    );
  };

  return (
    <>
      <QuestionListForm>
        <div>
          {/* Edit from here */}
          <Row>
            <Heading>Tests List</Heading>
          </Row>
          <Row>
            <SelectButton
              value={value1}
              options={tableOptions}
              itemTemplate={tableTemplate}
              onChange={onTableChange}
            />
            <AddQuestion>
              <ButtonPrimary onClick={addTest}>
                <ButtonIcon>
                  <Icon
                    icon='carbon:add-alt'
                    color='${(props) => props.theme.primaryColor}'
                    width='20'
                    height='20'
                  />
                  <span className=' d-none d-sm-none d-md-block '>Add New</span>
                </ButtonIcon>
              </ButtonPrimary>
            </AddQuestion>
          </Row>          
            <div className='card'>
              <DataTable
                ref={dt}
                value={questions}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 20, 50]}
                emptyMessage='No Questions found.'
              >
                <Column
                  field='Index'
                  header='Sr. No.'
                  body={onIndexTemplate}
                  style={{ width: '8%' }}
                />
                <Column
                  field='text'
                  filterField='text'
                  header='Question Text'
                  body={questions.text}
                  filter
                  filterPlaceholder='Question Text'
                  filterMatchMode='contains'
                  style={{ width: '50%' }}
                  sortable={true}
                />
                <Column
                  field='tags'
                  filterField='tags'
                  header='Question Tags'
                  body={tagsBodyTemplate}
                  filter
                  filterElement={tagsFilter}
                  filterPlaceholder='Question Tags'
                  filterMatchMode='contains'
                  style={{ width: '27%' }}
                  sortable={true}
                /> 
                <Column
                  body={actionBtnTemplate}
                  style={{ width: '15%' }}
                ></Column>
              </DataTable>
            </div>
        </div>

      </QuestionListForm>
      <br></br>      
    </>
  );
};

export default TestList;
