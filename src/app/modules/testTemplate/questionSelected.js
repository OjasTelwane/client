import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { BasicDetailsStyle } from './components/testTemplateElements';
import Button from '@material-ui/core/Button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Icon } from '@iconify/react';
import { SelectButton } from 'primereact/selectbutton';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import QuestionDataService from '../../core/actions/question';
import TagDataService from '../../core/actions/tag';
import SessionService from '../../core/services/useSessionStorage';
import Chip from '@material-ui/core/Chip';
const QuestionSelected = ({questions}) => {
    const history = useHistory();
  const [sort, setSort] = useState([{ field: 'text', order: 1 }]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isTable, setIsTable] = useState(true);
  const [value1, setValue1] = useState('Table');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [selectedQuestionType, setSelectedQuestionType] = useState(-1);
  const [questionTypeList, setQuestionTypeList] = useState([
    { key: 'All Type', value: -1 },
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
      placeholder='Type'
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


  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1;
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
    return(
        <>
            <center>
                <h3>Selected Questions</h3>
                <br />
            </center>
            <DataTable
                value={questions}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 20, 50]}
                emptyMessage='No Questions found.'
                sortMode='multiple'
                responsiveLayout='scroll'
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
                {/* <Column
                  body={actionBodyTemplate}
                  style={{ minWidth: '15%', overflow: 'visible' }}
                ></Column> */}
              </DataTable>
        </>
    )
}
export default QuestionSelected;
