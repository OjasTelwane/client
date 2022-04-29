import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import SessionService from '../../core/services/useSessionStorage';
import QuestionDataService from '../../core/actions/question';
import TagDataService from '../../core/actions/tag';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '@material-ui/core/Button';
import { FormControlLabel, Checkbox, Chip } from '@material-ui/core';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';

import { Icon } from '@iconify/react';

import { Row } from '../testPlatform/components/TestElements';

import { BasicDetailsStyle, ButtonSml } from './components/testTemplateElements';

const QuestionDetails = ({
  nextStep,
  prevStep,
  tagList, 
  tags, 
  handleTagChanges,
  isManual,
  handleCheckboxChange,
  selectedQuestions,
  handleSelection
}) => {
  const schema = yup.object().shape({
    text: yup.string(),
    tag: yup.string(),
    optionText: yup.string(),
    optionTag: yup.string()
  });
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [sort, setSort] = useState([{ field: 'text', order: 1 }]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedQuestionType, setSelectedQuestionType] = useState(-1);
  const [questionTypeList, setQuestionTypeList] = useState([
    { key: 'All Question Type', value: -1 },
    { key: 'Single Correct', value: 0 },
    { key: 'Multiple Correct', value: 1 },
    { key: 'Reorder', value: 2 },
    { key: 'Evaluation', value: 3 }
  ]);
  const dt = useRef(null);
  const [questionText, setQuestionText] = useState('');

  const onQuestionTypeChange = async (e) => {
    const questionType = e.value;
    setSelectedQuestionType(questionType);

    search(
      questionType,
      questionText,
      selectedTags,
      sort,
      currentPage,
      rows
    );
  };

  const onQuestionTextChange = (e) => {
    const text = e.target.value;
    setQuestionText(text);

    search(
      selectedQuestionType,
      text,
      selectedTags,
      sort,
      currentPage,
      rows
    );
  };

  const onTagsChange = (e) => {
    const tags = e.value;
    setSelectedTags(tags);
    console.log('onTagsChange=>questionType==>', selectedQuestionType);
    console.log('onTagsChange=>questionText==>', questionText);
    console.log('onTagsChange=>tag==>', tags);
    console.log('onTagsChange=>sort==>', sort);
    console.log('onTagsChange=>currentPage==>', currentPage);
    console.log('onTagsChange=>rows==>', rows);
    console.log('onTagsChange=>search Called==>');
    search(
      selectedQuestionType,
      questionText,
      tags,
      sort,
      currentPage,
      rows
    );
  };

  const questionTypeFilterTemplate = (
    <Dropdown
      filter
      filterBy='value'
      value={selectedQuestionType}
      options={questionTypeList}
      onChange={onQuestionTypeChange}
      optionLabel='key'
      placeholder='Select Question Type'
      className='p-column-filter'
      width='20%'
    />
  );

  const questionTextFilterTemplate = (
    <InputText
      filter
      value={questionText}
      onChange={onQuestionTextChange}
      placeholder='Question Text'
      className='p-column-filter'
      width='20%'
    />
  );

  const tagsFilter = (
    <MultiSelect
      filter
      filterBy='label'
      value={selectedTags}
      options={tagList}
      onChange={onTagsChange}
      placeholder='All'
      className='p-column-filter'
      display='chip'
      width='20%'
    />
  );

  const { register, handleSubmit, reset, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValues()
  });

  function getDefaultValues() {
    const { questionType, text, tag, sort, currentPage, rows } = SessionService.getSessionStorageOrDefault(
      'TestQuestion',
      {
        questionType: -1,
        text: '',
        tag: [],
        sort: [{ field: 'text', order: 1 }],
        currentPage: 0,
        rows: 10
      }
    );
    return {
      questionType: questionType,
      text: text,
      tag: tag,
      sort: sort,
      currentPage: currentPage,
      rows: rows
    };
  }

  const search = async (questionType, text, tag, sort, currentPage, rows) => {
    console.log('search=>questionType==>', questionType);
    console.log('search=>tag==>', tag);
    console.log('search=>sort==>', sort);
    console.log('search=>currentPage==>', currentPage);
    console.log('search=>rows==>', rows);
    const optionText = '';
    QuestionDataService.getAllQuestions(
      questionType,
      text,
      tag,
      optionText,
      sort,
      currentPage,
      rows
    )
      .then((response) => {
        const { totalItems, currentPage, totalPages, questions } =
          response.data;
        console.log('search1=>search function==>', response.data);
        console.log('search1=>questions==>', questions);
        console.log('search1=>currentPage==>', currentPage);
        console.log('search1=>totalItems==>', totalItems);
        setQuestions(questions);
        setCurrentPage(currentPage);
        setTotalRecords(totalItems);
        SessionService.setSessionStrage('TestQuestion', {
          questionType: questionType,
          text: text,
          tag: tag,
          sort: sort,
          currentPage: currentPage,
          rows: rows
        });
      })
      .catch((e) => {
        console.log('error from server:', e.message);
      });
  };

  useEffect(() => {
    console.log('received-tags==>', tags);
    SessionService.removeSessionStorage('TestQuestion');
    const { questionType, text, tag, sort, currentPage, rows } =
      SessionService.getSessionStorageOrDefault('TestQuestion', {
        questionType: -1,
        text: '',
        tag: [],
        sort: [{ field: 'text', order: 1 }],
        currentPage: 0,
        rows: 10
      });
    search(questionType, text, tag, sort, currentPage, rows);
  }, []);

  // const onPageChange = async (e) => {
  //   const { page, rows } = e;
  //   await setCurrentPage(page);
  //   await setRows(rows);
  //   search(selectedQuestionType, questionText, selectedTags, optionText, sort, currentPage, rows);
  // };

  const questionTypeBodyTemplate = (rowData) => {
    return (
      <>
        {rowData.questionType === 0 && <span>Single Correct</span>}
        {rowData.questionType === 1 && <span>Multiple Correct</span>}
        {rowData.questionType === 2 && <span>Reorder</span>}
        {rowData.questionType === 3 && <span>Evaluation</span>}
      </>
    );
  };

  const tagsBodyTemplate = (rowData) => {
    return (
      <>
        {rowData.tags &&
          rowData.tags.map((tag, j) => (
            <>
              <Chip
                size='small'
                variant='outlined'
                color='primary'
                label={tag}
              />
              <span>&nbsp;</span>
            </>
          ))}
      </>
    );
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

  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1;
  };

  // const onSort = async (e) => {
  //   console.log('onSort==>', e);
  //   await setSort(e.multiSortMeta);
  //   const { text, tag, optionText } = getValues();
  //   search(text, tag, optionText, e.multiSortMeta, currentPage, rows);
  // };

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
      </>
    );
  };

  const handleChanges = (event) => {
    handleTagChanges(event);
    onTagsChange(event);
  }

  return (
    <>
      <BasicDetailsStyle>
        <div>
          <Row>
            <div>
              <h1>Question Details</h1>
            </div>
            <div>
              <h5>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Questions
                Matching Criteria: {totalRecords}
              </h5>
              { isManual && (<h5>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Selected Questions: {selectedQuestions.length}
              </h5>)}
            </div>
          </Row>
          <br />
          <Row>
            <div>
            <MultiSelect
              value={tags}
              options={tagList}
              onChange={handleChanges}
              placeholder='All'
              className='p-column-filter'
              display='chip'
              width='20%'
            />
            </div>
          </Row>
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={isManual}
                onChange={handleCheckboxChange}
              ></Checkbox>
            }
            label='Is Manual'
          />
          <br />

          {isManual ? (
            <>
              <div className='card'>
                <DataTable
                  selectionMode='checkbox'
                  selection={selectedQuestions}
                  onSelectionChange={handleSelection}
                  dataKey='id'
                  value={questions}
                  scrollable
                  paginator
                  rows={10}
                  rowsPerPageOptions={[5, 10, 20, 50]}
                  responsiveLayout='scroll'
                  emptyMessage='No Questions found.'
                  style={{ width: '100%'}}
                >
                  <Column
                    field='Index'
                    header='Sr. No.'
                    body={onIndexTemplate}
                    style={{ width: '4%' }}
                  />
                  <Column
                    selectionMode='multiple'
                    sortable={true}
                    field='selectQuestion'
                    header='Select'
                    headerStyle={{ width: '10%' }}
                    columnKey='selectedQuestion'
                  ></Column>
                  <Column
                    field='questionType'
                    filterField='key'
                    header='Question Type'
                    showFilterMenu={false}
                    filterMenuStyle={{ width: '15%' }}
                    style={{ width: '15%' }}
                    body={questionTypeBodyTemplate}
                    sortable
                    filter
                    filterElement={questionTypeFilterTemplate}
                  />
                  <Column
                    sortable
                    field='text'
                    filterField='text'
                    header='Question Text'
                    body={questions.text}
                    style={{ width: '40%' }}
                    filter
                    filterPlaceholder='Question Text'
                    filterMatchMode='contains'
                    filterMenuStyle={{ width: '40%' }}
                    sortable
                    filterElement={questionTextFilterTemplate}
                    columnKey='text'
                  />
                  <Column
                    field='tags'
                    filterField='tags'
                    header='Tags'
                    body={tagsBodyTemplate}
                    filter
                    filterElement={tagsFilter}
                    filterPlaceholder='Question Tags'
                    filterMatchMode='contains'
                    style={{ width: '25%', overflow: 'hidden' }}
                    filterMenuStyle={{ width: '25%' }}
                    sortable={true}
                    text-overflow='ellipsis'
                  />
                  <Column body={actionBtnTemplate} style={{ width: '6%' }} />
                </DataTable>
              </div>
            </>
          ) : (
            <>
              <div className='card'>
                <DataTable
                  dataKey='id'
                  value={questions}
                  scrollable
                  responsiveLayout='scroll'
                  paginator
                  rows={10}
                  rowsPerPageOptions={[5, 10, 20, 50]}
                  emptyMessage='No Questions found.'
                >
                  <Column
                    field='Index'
                    header='Sr. No.'
                    body={onIndexTemplate}
                    style={{ width: '4%' }}
                  />
                  <Column
                    field='questionType'
                    filterField='key'
                    header='Question Type'
                    showFilterMenu={false}
                    filterMenuStyle={{ width: '20%' }}
                    style={{ width: '15%' }}
                    body={questionTypeBodyTemplate}
                    sortable
                    filter
                    filterElement={questionTypeFilterTemplate}
                  />
                  <Column
                    sortable
                    field='text'
                    filterField='text'
                    header='Question Text'
                    body={questions.text}
                    filter
                    filterPlaceholder='Question Text'
                    filterMatchMode='contains'
                    style={{ width: '40%' }}
                    sortable
                    filterElement={questionTextFilterTemplate}
                    columnKey='text'
                  />
                  <Column
                    field='tags'
                    filterField='tags'
                    header='Tags'
                    body={tagsBodyTemplate}
                    filter
                    filterElement={tagsFilter}
                    filterPlaceholder='Question Tags'
                    filterMatchMode='contains'
                    style={{ width: '31%', overflow: 'hidden' }}
                    filterMenuStyle={{ width: '31%' }}
                    sortable={true}
                  />
                  <Column body={actionBtnTemplate} style={{ width: '10%' }} />
                </DataTable>
              </div>
            </>
          )}
          <br />
        </div>
        <center>
        <Button color='secondary' variant='contained' onClick={prevStep}>
          Back
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        <Button color='primary' variant='contained' onClick={nextStep}>
          Continue
        </Button>
        </center>
      </BasicDetailsStyle>
    </>
  );
};
export default QuestionDetails;
