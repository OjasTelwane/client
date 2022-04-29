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

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Icon } from '@iconify/react';
import { SelectButton } from 'primereact/selectbutton';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import SessionService from '../../core/services/useSessionStorage';
import QuestionDataService from '../../core/actions/question';
import TagDataService from '../../core/actions/tag';

import Chip from '@material-ui/core/Chip';
import {
  QuestionListForm,
  Column1,
  Heading,
  Input,
  SearchItem,
  QuestionArea,
  QuestionTextArea,
  QuestionButtonContainer,
  Label,
  LabelBlack,
  Row,
  Button,
  ButtonSml,
  ButtonIcon,
  ButtonIconDanger,
  DangerButtonSml,
  RowHeading,
  ListItem,
  TagList,
  ButtonPrimary,
  ButtonDanger,
  AddQuestion,
  DataTableCss
} from './components/QuestionElements';

const QuestionList = () => {
  const history = useHistory();
  const [sort, setSort] = useState([{ field: 'text', order: 1 }]);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isTable, setIsTable] = useState(true);
  const [value1, setValue1] = useState('Table');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagList, setTagList] = useState([]);
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
    dt.current.filter(questionType, 'questionType', 'equals');
    setSelectedQuestionType(questionType);
    const optionText = undefined;
    search(questionType, questionText, selectedTags, optionText, sort, currentPage, rows);
  };

  const onQuestionTextChange = (e) => {
    const text = e.target.value;
    dt.current.filter(text, 'text', 'equals');
    setQuestionText(text);
    const optionText = undefined;
    search(selectedQuestionType, text, selectedTags, optionText, sort, currentPage, rows);
  };

  const onTagsChange = (e) => {
    const tags = e.value;
    dt.current.filter(tags, 'tags', 'contains');
    setSelectedTags(tags);
    const optionText = undefined;
    search(selectedQuestionType, questionText, tags, optionText, sort, currentPage, rows);
  };

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

  const questionTypeFilterTemplate = (
    <Dropdown
      filter
      filterBy='value'
      value={selectedQuestionType}
      options={questionTypeList}
      onChange={onQuestionTypeChange}
      // onChange={(e) => options.filterCallback(e.value)}
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

  const tableOptions = [
    { icon: 'pi pi-table', value: 'Table' },
    { icon: 'pi pi-list', value: 'List' }
  ];

  const tableTemplate = (option) => {
    return <i className={option.icon}>&nbsp;{option.value}</i>;
  };

  const schema = yup.object().shape({ 
    text: yup.string(),
    tag: yup.array(),
    optionText: yup.string()
  });

  function getDefaultValues() {
    const { questionType, text, tag, optionText } = SessionService.getSessionStorageOrDefault(
      'QuestionList',
      {
        questionType: -1,
        text: '',
        tag: '',
        optionText: ''
      }
    );
    return {
      questionType: questionType,
      text: text,
      tag: tag,
      optionText: optionText
    };
  }

  const { register, handleSubmit, reset, getValues, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValues()
  });

  const search = async (
    questionType,
    text,
    tag,
    optionText,
    sort,
    currentPage,
    rows
  ) => {
    console.log('questionType==>', questionType);
    console.log('tag==>', tag);
    console.log('sort==>', sort);
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
        setQuestions(questions);
        setCurrentPage(currentPage);
        setTotalRecords(totalItems);
        SessionService.setSessionStrage('QuestionList', {
          questionType: questionType,
          text: text,
          tag: tag,
          optionText: optionText,
          sort: sort,
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
    // console.log('response.data', response.data);
    if (response.data) {
      const list = response.data;
      const tagList = list.map((t) => {
        return { value: t.tag, label: t.tag };
      });
      setTagList(tagList);
      // console.log('tagList', tagList);
    }
  };

  useEffect(() => {
    loadTagList();
    const { questionType, text, tag, optionText, currentPage, rows } =
      SessionService.getSessionStorageOrDefault('QuestionList', {
        questionType: -1,
        text: '',
        tag: '',
        optionText: '',
        currentPage: 0,
        rows: 10
      });
    search(questionType, text, tag, optionText, sort, currentPage, rows);
  }, []);

  const submitForm = (data) => {
    console.log(data);
    const { questionType, text, tag, optionText } = data;
    search(questionType, text, tag, optionText, sort, currentPage, rows);
  };

  const onPageChange = async (e) => {
    const { page, rows } = e;
    await setCurrentPage(page);
    await setRows(rows);
    const { questionType, text, tag, optionText } = getValues();
    search(questionType, text, tag, optionText, sort, currentPage, rows);
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

  const addQuestion = async () => {
    var path = `/add_question`;
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

  const onSort = async (e) => {
    console.log('onSort==>', e);
    await setSort(e.multiSortMeta);
    const { text, tag, optionText } = getValues();
    search(text, tag, optionText, e.multiSortMeta, currentPage, rows);
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

  const onFilter = (e) => {
    console.log('onFilter', e);
  }

  const actionBodyTemplate = (rowData) => {
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
          <Row>
            <Heading>Questions List</Heading>
          </Row>
          <Row>
            <SelectButton
              value={value1}
              options={tableOptions}
              itemTemplate={tableTemplate}
              onChange={onTableChange}
            />
            <AddQuestion>
              <ButtonPrimary onClick={addQuestion}>
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
          {isTable ? (
            <DataTableCss>
            <div className='card'>
              <DataTable
                ref={dt}
                value={questions}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 20, 50]}
                emptyMessage='No Questions found.'
                multiSortMeta={sort}
                onSort={onSort}
                onFilter={onFilter}
                // globalFilterFields={['questionType', 'text']}
                sortMode='multiple'
                responsiveLayout='scroll'
                breakpoint='960px'
                // scrollable={true}
                // scrollDirection='both'
                // scrollHeight='800px'
                // scrollWidth='800px'
                onValueChange={filteredData => console.log(filteredData)}
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
                  filterMenuStyle={{ width: '10%'}} 
                  style={{ width: '10%' }} 
                  body={questionTypeBodyTemplate} 
                  filter 
                  filterElement={questionTypeFilterTemplate} />
                <Column
                  field='text'
                  filterField='text'
                  header='Question Text'
                  body={questions.text}
                  filter
                  filterPlaceholder='Question Text'
                  filterMatchMode='contains'
                  style={{ width: '45%' }}
                  sortable
                  filterElement={questionTextFilterTemplate}
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
                  style={{ width: '26%' }}
                  sortable
                />
                <Column
                  body={actionBodyTemplate}
                  style={{ width: '14%', overflow: 'visible' }}
                ></Column>
              </DataTable>
            </div>
            </DataTableCss>
          ) : (
            <>
              <div>
                {/* Search section */}
                <SearchItem>
                  <form onSubmit={handleSubmit(submitForm)}>
                    <Row>
                      <Column1>
                        <LabelBlack>Question Type</LabelBlack>
                        <Controller
                          control={control}
                          name='questionType'
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Dropdown
                              value={value}
                              // value={selectedQuestionType}
                              options={questionTypeList}
                              onBlur={onBlur}
                              onChange={(e) => {
                                onChange(e.value);
                              }}
                              // onChange={onQuestionTypeChange}
                              optionLabel='key'
                              placeholder='Select Question Type'
                              // {...register('questionType')}
                            />
                          )}
                        />
                      </Column1>
                      <Column1>
                        <LabelBlack>Question Text</LabelBlack>
                        <Input
                          type='text'
                          className='form-control'
                          {...register('text')}
                        />
                      </Column1>
                      <Column1>
                        <LabelBlack>Question Tag</LabelBlack>
                        <Controller
                          control={control}
                          name='tag'
                          render={({ field: { onChange, onBlur, value } }) => (
                            <MultiSelect
                              filter
                              filterBy='label'
                              options={tagList}
                              onChange={(e) => {
                                onChange(e.value);
                              }}
                              onBlur={onBlur}
                              value={value}
                              placeholder='Select Tags'
                              display='chip'
                            />
                          )}
                        />
                      </Column1>
                      <Column1>
                        <LabelBlack>Option Text</LabelBlack>
                        <Input
                          type='text'
                          className='form-control'
                          {...register('optionText')}
                        />
                      </Column1>
                      <Column1>
                        <div>&nbsp; </div>
                        <Button onClick={handleSubmit}>
                          <ButtonIcon>
                            <Icon
                              icon='bx:bx-search-alt-2'
                              color='${(props) => props.theme.primaryColor}'
                              width='20'
                              height='20'
                            />
                            <span className=' d-none d-sm-none d-md-block '>
                              Search
                            </span>
                          </ButtonIcon>
                        </Button>
                      </Column1>
                    </Row>
                  </form>
                </SearchItem>
              </div>
              <ul id='question-list' className='list-group'>
                {questions &&
                  questions.map((question, index) => (
                    <ListItem key={question.id}>
                      <RowHeading>
                        <Label>Question</Label>
                      </RowHeading>
                      <QuestionArea>
                        <QuestionTextArea
                          disabled
                          defaultValue={question.text}
                        />
                        <QuestionButtonContainer>
                          <ButtonPrimary
                            onClick={() => viewQuestion(question, index)}
                          >
                            <ButtonIcon>
                            <Icon
                              icon='fluent:reading-mode-mobile-24-regular'
                              color='${(props) => props.theme.primaryColor}'
                              width='20'
                              height='20'
                            />
                            <span className=' d-none d-sm-none d-md-block '>&nbsp;View</span>
                            </ButtonIcon>
                          </ButtonPrimary>
                          <ButtonPrimary
                            onClick={() => editQuestion(question, index)}
                          >
                            <ButtonIcon>
                            <Icon
                              icon='clarity:note-edit-line'
                              color='${(props) => props.theme.primaryColor}'
                              width='20'
                              height='20'
                            />
                              <span className=' d-none d-sm-none d-md-block '>&nbsp;Edit</span>
                              </ButtonIcon>
                          </ButtonPrimary>
                          <ButtonDanger
                            onClick={() => deleteQuestion(question, index)}
                          >
                            <ButtonIconDanger>
                            <Icon
                              icon='ant-design:delete-outlined'
                              color='${(props) => props.theme.primaryColor}'
                              width='20'
                              height='20'
                            />
                              <span className=' d-none d-sm-none d-md-block '>&nbsp;Delete</span>
                              </ButtonIconDanger>
                          </ButtonDanger>
                        </QuestionButtonContainer>
                      </QuestionArea>
                      <RowHeading>
                        <Label>Tags</Label>
                      </RowHeading>
                      <Row>
                        <TagList>
                          {question.tags &&
                            question.tags.map((tag, j) => (
                              <div>{tag},&nbsp;&nbsp;&nbsp;</div>
                            ))}
                        </TagList>
                      </Row>
                    </ListItem>
                  ))}
              </ul>
              <Paginator
                htmlFor='question-list'
                rows={rows}
                totalRecords={totalRecords}
                rowsPerPageOptions={[5, 10, 20, 50]}
                onPageChange={onPageChange}
              ></Paginator>
            </>
          )}
        </div>
        <Row>
          <Heading></Heading>
          <AddQuestion>
              <ButtonPrimary onClick={addQuestion}>
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
      </QuestionListForm>
    </>
  );
};

export default QuestionList;
