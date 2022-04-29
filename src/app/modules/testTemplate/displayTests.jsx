import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';

import TestTemplateDataService from '../../core/actions/testTemplate';
import TagDataService from '../../core/actions/tag';
import SessionService from '../../core/services/useSessionStorage';
import Permission from '../../core/services/permission';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import DisplayUsers from './displayUsers';

import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Icon } from '@iconify/react';
import { SelectButton } from 'primereact/selectbutton';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import { 
  Row,
  ButtonPrimary,
  ButtonIcon
} from '../testTemplate/components/testTemplateElements';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const DisplayTests = () => {

  const [value, setValue] = useState(0);
  const [testId, setTestId] = useState('');
  let history = useHistory();
  const [sort, setSort] = useState([]);
  const [tests, setTests] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [testType, setTestType] = useState('0');
  const [testName, setTestName] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [isTable, setIsTable] = useState(true);
  const [selectedUsers, setUsers] = useState([]);
  const [value1, setValue1] = useState('Table');

  const handleSelection = (e) => {
    setUsers(e.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = (id) => {
    // console.log('testId', id);
    setTestId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    // console.log('testId==>', testId);
    // console.log('selectedUsers==>', selectedUsers);
    await TestTemplateDataService.assignManyTestTemplate(testId, selectedUsers);
    handleClose();
  };

  const handleNewTemplate = () => {
    const path = '/test_creation';
    history.push(path);
  };

  useEffect( async () => {
    const data = await TestTemplateDataService.getAllTests();
    console.log('data.tests==>', data.data);
    setTests(data.data);
  }, [])

  const handleStart = (e) => {
    const path = '/test/' + e;
    history.push(path);
  };

  const TestTypeList = [
    { label: 'Evaluation Test', value: '0' },
    { label: '10+2 Test', value: '1' }
  ];

  const dt = useRef(null);
  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1;
  };

  const onSort = async (e) => {
    console.log('onSort==>', e);
    await setSort(e.multiSortMeta);
    const { testType, testName, tags } = getValues();
    search(testType, testName, tags, e.multiSortMeta, currentPage, rows);
  };
  const onTestTypeChange = async (e) => {
    const testType = e.value;
    dt.current.filter(testType, 'testType', 'equals');
    setTestType(testType);
    search(testType, testName, selectedTags, sort, currentPage, rows);
  };

  const onTestNameChange = (e) => {
    const testName = e.target.value;
    dt.current.filter(testName, 'testName', 'equals');
    setTestName(testName);
    search(testType, testName, selectedTags, sort, currentPage, rows);
  };

  const onTagsChange = (e) => {
    const tags = e.value;
    dt.current.filter(tags, 'tags', 'contains');
    setSelectedTags(tags);
    search(testType, testName, tags, currentPage, rows);
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

  const loadTagList = async () => {
    const response = await TagDataService.getAllTags();
    if (response.data) {
      const list = response.data;
      const tagList = list.map((t) => {
        return { value: t.tag, label: t.tag };
      });
      setTagList(tagList);
    }
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

  const tableOptions = [
    { icon: 'pi pi-table', value: 'Table' },
    { icon: 'pi pi-list', value: 'List' }
  ];

  const tableTemplate = (option) => {
    return <i className={option.icon}>&nbsp;{option.value}</i>;
  };

  function getDefaultValues() {
    const { testType, testName, tags } = SessionService.getSessionStorageOrDefault(
      'ListTests',
      {
        testType: '0',
        testName: '',
        tags: ''
      }
    );
    return {
      testType: testType,
      testName: testName,
      tags: tags
    };
  }

  const { register, handleSubmit, reset, getValues, control } = useForm({
    defaultValues: getDefaultValues()
  });

  const search = async (testType, testName, tags, sort, currentPage, rows) => {
    // console.log('front-end==search=function==>')
    // console.log('testType==>', testType);
    // console.log('testName==>', testName);
    // console.log('tags==>', tags);
    // console.log('sort==>', sort);
    // console.log('currentPage==>', currentPage);
    // console.log('rows==>', rows);

    TestTemplateDataService.getAllTestTemplates(
      testType,
      testName,
      tags,
      sort,
      currentPage,
      rows
    )
      .then((response) => {
        const { totalItems, currentPage, totalPages, tests } = response.data;
        // console.log('tests=B=>', tests);
        setTests(tests);
        // console.log('tests=A=>', tests);
        setCurrentPage(currentPage);
        setTotalRecords(totalItems);
        SessionService.setSessionStrage('ListTests', {
          testType: testType,
          testName: testName,
          tags: tags,
          sort: sort,
          currentPage: currentPage,
          rows: rows
        });
      })
      .catch((e) => {
        console.log('error from server:', e.message);
      });
  };

  const testTypeBodyTemplate = (rowData) => {
    return (
      <>
        {rowData.testType === '0' && <span>Evaluation Test</span>}
        {rowData.testType === '1' && <span>10+2 Evaluation</span>}
      </>
    );
  };

  const testNameBodyTemplate = (rowData) => {
    return (
      <>
        <span>{rowData.testName}</span>
      </>
    );
  };

  const onPageChange = async (e) => {
    const { page, rows } = e;
    await setCurrentPage(page);
    await setRows(rows);
    const { testType, testName, tags } = getValues();
    search(testType, testName, tags, sort, currentPage, rows);
  };

  var cardStyle = {
    display: 'flex',
    width: '320px',
    transitionDuration: '0.3s',
    backgroundColor: '#a6a5b014'
  };

  const actionBodyTemplate = (rowData) => {
    // console.log('rowData.id==is==test.id==> ', rowData.id);
    return (
      <>
        {Permission.checkPermission('TestBank', 'Assign') && (

          <ButtonPrimary variant='contained' onClick={(e) => handleOpen(rowData.id)}>
            <ButtonIcon>
            <Icon icon='healthicons:i-exam-multiple-choice-outline' color='${(props) => props.theme.primaryColor}' width='24' height='24' />
            <span className=' d-none d-sm-none d-md-block '>Assign Test</span>
            </ButtonIcon>
          </ButtonPrimary>
        )}
      </>
    );
  };

  return (
    <>
      {/* <SelectButton
        value={value1}
        options={tableOptions}
        itemTemplate={tableTemplate}
        onChange={onTableChange}
      /> */}
      <Box sx={{ width: '100%' }}>
        <Row>
          <div>
            <ButtonPrimary variant='contained' onClick={handleNewTemplate}>
              Create a New Test
            </ButtonPrimary>
          </div>
        </Row>
        <br />
        {isTable ? (
        <div className='card'>
          <DataTable
            value={tests}
            paginator
            rows={10}
            dataKey='id'
            responsiveLayout='scroll'
            emptyMessage='No Test Template found.'
            style={{ width: '100%' }}
            sortMode='multiple'
            // scrollable={true}
            // scrollDirection='both'
            // scrollHeight='800px'
            // scrollWidth='8000px'
            responsiveLayout='scroll'
          >
            <Column
              field='Index'
              header='Sr. No.'
              body={onIndexTemplate}
              style={{ width: '4%' }}
            />

            <Column
              header='Test Type'
              // filterField='testType'
              style={{ width: '20%' }}
              body={testTypeBodyTemplate}
              // body={tests.testType}
              // filter
              // filterPlaceholder='Search by Test Type'
              // multiSortMeta={sort}
              // onSort={onSort}
              sortable
            />

            <Column
              header='Test Name'
              // filterField='testName'
              // showFilterMenu={false}
              // filterMenuStyle={{ width: '20%' }}
              style={{ width: '28%' }}
              body={testNameBodyTemplate}
              // body={tests.testName}
              // filter
              // multiSortMeta={sort}
              // onSort={onSort}
              sortable
            />

            <Column
              field='tags'
              // filterField='tags'
              header='Test Tags'
              // showFilterMenu={false}
              // filterMenuStyle={{ width: '20%' }}
              style={{ width: '30%' }}
              body={tagsBodyTemplate}
              // filter
              // filterElement={tagsFilter}
              // filterPlaceholder='Test Tags'
              // filterMatchMode='contains'
              // multiSortMeta={sort}
              // onSort={onSort}
              sortable
            />
            <Column
              header='Assign Test'
              body={actionBodyTemplate}
              style={{ width: '18%'}}
            ></Column>
          </DataTable>
        </div>
        ) : (
            {/* <>
                <div>
                
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
                            <Icon
                              icon='fluent:reading-mode-mobile-24-regular'
                              color='${(props) => props.theme.primaryColor}'
                              width='20'
                              height='20'
                            />
                            &nbsp;View
                          </ButtonPrimary>
                          <ButtonPrimary
                            onClick={() => editQuestion(question, index)}
                          >
                            <Icon
                              icon='clarity:note-edit-line'
                              color='${(props) => props.theme.primaryColor}'
                              width='20'
                              height='20'
                            />
                            &nbsp;Edit
                          </ButtonPrimary>
                          <ButtonDanger
                            onClick={() => deleteQuestion(question, index)}
                          >
                            <Icon
                              icon='ant-design:delete-outlined'
                              color='${(props) => props.theme.primaryColor}'
                              width='20'
                              height='20'
                            />
                            &nbsp;Delete
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
            </> */}
          )}
        {/* <Container>
        <Box sx={{ bgcolor: '#cfe8fc', height: '90vh', fontFamily:'Poppins Roboto sans-serf !important' }}>
        {tests.length && tests.map((test, index) =>{
          return (
          <div key={index}>
              <Card sx={ { minWidth: 256 } } style={cardStyle}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                    {test.testName}
                  </Typography>
                  <Typography variant='h5' component='div'>
                    {test.testName}
                  </Typography>

                  <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                    {test.testDescription} <br/>
                    Test Date : {new Date(test.testDate).getDate()} / {new Date(test.testDate).getMonth()+1} / {new Date(test.testDate).getFullYear()}
                    <br/>
                    Start Time : {new Date(test.startTime).getUTCHours()} : {new Date(test.startTime).getUTCMinutes()}
                    <br />
                    End Time : {new Date(test.endTime).getUTCHours()} : {new Date(test.endTime).getUTCMinutes()}
                    <br/>
                    Duration : {test.testDuration} minutes
                    <br/>
                    <br/>
                    {/* No. of questions : {test.questionCount} 
                    </Typography>
                    <CardActions style={{ padding:0}}>
                      <Row>
                        { currentUser.isAdmin && 
                          <Button 
                              variant='contained'
                              onClick={(e) => (handleOpen(test.id))}
                          >Assign Test</Button>
                        }
                        <Button 
                            variant='contained'
                        >See Result</Button>
                        </Row>
                        </CardActions>
                </CardContent>
              </Card>
              <br/>
          </div>
          )}
        )}
        </Box>
      </Container> */}
      </Box>
      <Modal
        show={open}
        onHide={() => setOpen(false)}
        size='lg'
        style = {{ 'height' : '100%'}}
        dialogClassName='modal-90w'
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Assign Tests to Users
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style = {{ 'height' : '100%'}}>
          <DisplayUsers
            selectedUsers={selectedUsers}
            handleSelection={handleSelection}
          />
        </Modal.Body>
        <Modal.Footer>
          <ButtonPrimary variant='secondary' onClick={handleClose}>
            Close
          </ButtonPrimary>
          <ButtonPrimary variant='primary' onClick={handleSave}>
            Save
          </ButtonPrimary>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DisplayTests;
