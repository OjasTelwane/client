import React, {useState, useEffect, useRef} from 'react'

import TagDataService from '../../core/actions/tag';
import TestDataService from '../../core/actions/test';
import SessionService from '../../core/services/useSessionStorage';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { convertDateTimeToServer} from '../date-utils';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import Chip from '@material-ui/core/Chip';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import { Icon } from '@iconify/react';

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
  
const TestsList = () => {
  const dt = useRef(null);

    const [value, setValue] = useState(0);
    const [testId, setTestId] = useState('');
    let history = useHistory();
    const [sort, setSort] = useState([]);
    const [tests, setTests] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [rows, setRows] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [testType, setTestType] = useState('0');
    const [testDate, setTestDate] = useState('');
    const [testName, setTestName] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagList, setTagList] = useState([]);
    const [examineeName, setExamineeName] = useState('');
    const [examineeId, setExamineeId] = useState('');
    const [examineeIdList, setExamineeIdList] = useState([]);
    const [status, setStatus] = useState('');

    const TestTypeList = [
      {label: 'Evaluation Test', value: '0' },
      {label: '10+2 Test', value: '1' }
    ];
    
    const onIndexTemplate = (rowData, props) => {
      return props.rowIndex + 1;
    };

    const onSort = async (e) => {
      console.log('onSort==>', e);
      await setSort(e.multiSortMeta);
      const { examineeId, testType, testDate, testName, tags, status, examineeName } = getValues();
      search( examineeId, testType, testDate, testName, tags, status, examineeName, e.multiSortMeta, currentPage, rows);
    };

    const onTestTypeChange = async (e) => {
      const testType = e.value;
      dt.current.filter(testType, 'testType', 'equals');
      setTestType(testType);
      search( examineeId, testType, testDate, testName, selectedTags, status, examineeName, sort, currentPage, rows);
    };

    const onTestDateChange = (e) => {
      const testDate = e.target.value;
      dt.current.filter(testDate, 'testDate', 'equals');
      let newTestDate = convertDateTimeToServer(testDate);
      // let today = testDate;
      // let dd = String(today.getDate()).padStart(2, '0');
      // let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      // let yyyy = today.getFullYear();
      // today = mm + '/' + dd + '/' + yyyy;
      setTestDate(newTestDate);
      search( examineeId, testType, testDate, testName, selectedTags, status, examineeName, sort, currentPage, rows);
    };

    const onTestNameChange = (e) => {
      const testName = e.target.value;
      dt.current.filter(testName, 'testName', 'equals');
      setTestName(testName);
      search( examineeId, testType, testDate, testName, selectedTags, status, examineeName, sort, currentPage, rows);
    };

    const onExamineeNameChange = (e) => {
      const examineeName = e.target.value;
      dt.current.filter(examineeName, 'examineeName', 'equals');
      setExamineeName(examineeName);
      search( examineeId, testType, testDate, testName, selectedTags, status, examineeName, sort, currentPage, rows);
    };

    const onTagsChange = (e) => {
      const tags = e.value;
      dt.current.filter(tags, 'tags', 'contains');
      setSelectedTags(tags);
      search( examineeId, testType, testDate, testName, tags, sort, status, examineeName, currentPage, rows);
    };
  
    const testDateFilterTemplate = (
      <InputText
        filter
        value={testDate}
        onChange={onTestDateChange}
        placeholder='Test Date'
        className='p-column-filter'
        width='20%'
      />
    );

    const testNameFilterTemplate = (
      <InputText
        filter
        value={testName}
        onChange={onTestNameChange}
        placeholder='Test Name'
        className='p-column-filter'
        width='20%'
      />
    );

    const examineeNameFilterTemplate = (
      <InputText
        filter
        value={examineeName}
        onChange={onExamineeNameChange}
        placeholder='Examinee Name'
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

    function getDefaultValues() {
      const { examineeId, testType, testDate, testName, tags, status, examineeName } = SessionService.getSessionStorageOrDefault(
        'ListTests',
        {
          examineeId: '',
          testType: '0',
          testDate: '',
          testName: '',
          tags: '',
          examineeName: '',
          status: 'Assigned'
        }
      );
      return {
        examineeId: examineeId,
        testType: testType,
        testDate: testDate,
        testName: testName,
        tags: tags,
        examineeName: examineeName,
        status: status
      };
    }
  
    const { register, handleSubmit, reset, getValues, control } = useForm({      
      defaultValues: getDefaultValues()
    });

    const handleChange = (event, newValue) => {
      setValue(newValue);
  switch (newValue) {
      case 0:
          setStatus('Assigned');
          break;
      case 1:
          setStatus('Progress');
          break;
      case 2:
        setStatus('Completed');
        break;
      case 3:
        setStatus('');
        break;
      }
    const { examineeId, testType, testDate, testName, tags, examineeName } = getValues();
    search( examineeId, testType, testDate, testName, tags, status, examineeName, sort, currentPage, rows);

    };

  const search = async (
    examineeId,
    testType,
    testDate,
    testName,
    tags, 
    examineeName,
    status,
    sort,
    currentPage,
    rows
  ) => {
    console.log('sort==>', sort);
    TestDataService.getTestsList(
      examineeId, 
      testType,
      testDate,
      testName,
      tags, 
      examineeName,
      status,
      sort,
      currentPage,
      rows)
      .then((response) => {
        const { totalItems, currentPage, totalPages, tests } =
          response.data;
        setTests(tests);
        console.log('tests==>', tests);
        setCurrentPage(currentPage);
        setTotalRecords(totalItems);
        SessionService.setSessionStrage('ListTests', {
          examineeId: examineeId,
          testType: testType,
          testDate: testDate,
          testName: testName,
          tags: tags, 
          examineeName: examineeName,
          status: status,
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

  const testDateBodyTemplate = (rowData) => {
    let today = new Date(rowData.testDate);
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    return (
      <>
        <span>{today}</span>
      </>
    );
  };

  // useEffect( async () => {
  //   const data = await TestDataService.getAllTests();
  //   console.log('data.tests==>', data.data);
  //   setTests(data.data);
  // }, [])

  useEffect( async () => {
    loadTagList();
    const data = await axios.get('http://localhost:8080/tests-all');
    const ExamineeIdList = data.data.map((t) => {
      return { examineeId: t.examineeId };
    });
    setExamineeIdList(ExamineeIdList);
    setExamineeId(ExamineeIdList);
    const { examineeId, testType, testDate, testName, tags, examineeName, currentPage, rows } =
      SessionService.getSessionStorageOrDefault('ListTests', {
        examineeId: '',
        testType: '',
        testDate: '',
        testName: '',
        tags: '',
        examineeName: '',
        status: 'Assigned',
        currentPage: 0,
        rows: 10
      });
    search( examineeId, testType, testDate, testName, tags, status, examineeName, sort, currentPage, rows);
  }, []);

  const onPageChange = async (e) => {
    const { page, rows } = e;
    await setCurrentPage(page);
    await setRows(rows);
    const { examineeId, testType, testDate, testName, tags, status, examineeName } = getValues();
    search( examineeId, testType, testDate, testName, tags, status, examineeName, sort, currentPage, rows);
  };

  const onStatusChange = (e) => {
    setStatus(e.value)
    const { examineeId, testType, testDate, testName, tags, examineeName } = getValues();
    search( examineeId, testType, testDate, testName, tags, status, examineeName, sort, currentPage, rows);
  }

  var cardStyle = {
    display: 'flex',
    width: '320px',
    transitionDuration: '0.3s',
    backgroundColor: '#a6a5b014'
  }
  return (
    <>
    <Box sx={{ width: '100%'}}>

      <Box sx={{ borderBottom: 1, borderColor: '${(props) => props.theme.primaryColor};' }}>
        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example' centered>
          <Tab label='Assigned' {...a11yProps(0)} />
          <Tab label='In Progess' {...a11yProps(1)} />
          <Tab label='Complete' {...a11yProps(2)} />
          <Tab label='All' {...a11yProps(3)} /> 
        </Tabs> 
      </Box>
      <br/>
      <Controller
        control={control}
        name='testType'
        render={({ field: { field, onChange, onBlur, value, ref }, fieldState }) => (
          <Dropdown 
              {...field}
              options={TestTypeList}
              placeholder='Select Test Type'
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
      <TabPanel value={value} index={0} >
        <div className='card'>
          <DataTable 
            ref={dt}
            value={tests} 
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50]}
            dataKey='id' 
            responsiveLayout='scroll'
            emptyMessage='No Assigned Test found.'
            sortMode='multiple'
            // scrollable={true}
            // scrollDirection='both'
            // scrollHeight='600px'
            // scrollWidth='440px'
            responsiveLayout='scroll'
            >

            <Column
              field='Index'
              header='Sr. No.'
              body={onIndexTemplate}
              style={{ width: '4%' }}
            />

            <Column 
              header='Test Date' 
              field='testDate'
              filterField='key'
              showFilterMenu={false} 
              filterMenuStyle={{ width: '10%'}} 
              style={{ width: '10%' }} 
              body={testDateBodyTemplate} 
              filter 
              filterPlaceholder='Search by test Date' 
              filterElement={testDateFilterTemplate}
              sortable
            />

            <Column 
              header='Test Name' 
              field='testName'
              filterField='key' 
              showFilterMenu={false} 
              filterMenuStyle={{ width: '23%'}} 
              style={{ width: '23%' }} 
              body={tests.testName}
              filter 
              filterElement={testNameFilterTemplate} 
              sortable
            />

            <Column 
              field='tags' 
              filterField='tags'
              header='Test Tags' 
              showFilterMenu={false} 
              style={{ width: '30%' }} 
              body={tagsBodyTemplate} 
              filter 
              filterElement={tagsFilter} 
              filterPlaceholder='Test Tags'
              filterMatchMode='contains'
              multiSortMeta={sort}
              onSort={onSort}
              sortable
            /> 

            <Column 
              field='examineeName' 
              header='User Name' 
              filterField='key' 
              showFilterMenu={false} 
              filterMenuStyle={{ width: '23%'}} 
              style={{ width: '23%' }}  
              body={tests.examineeName} 
              filter 
              filterElement={examineeNameFilterTemplate} 
              sortable
            />

          </DataTable>
        </div>
      </TabPanel>


      <TabPanel value={value} index={1} >
        <div className='card'>
          <DataTable 
            ref={dt}
            value={tests} 
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50]}
            dataKey='id' 
            responsiveLayout='scroll'
            emptyMessage='No In Progress Test found.'
            sortMode='multiple'
            // scrollable={true}
            // scrollDirection='both'
            // scrollHeight='600px'
            // scrollWidth='440px'
            responsiveLayout='scroll'
            >

            <Column
              field='Index'
              header='Sr. No.'
              body={onIndexTemplate}
              style={{ width: '4em' }}
            />

            <Column 
              header='Test Date' 
              field='testDate'
              filterField='key'
              showFilterMenu={false} 
              filterMenuStyle={{ width: '20%'}} 
              style={{ width: '20%' }} 
              body={tests.testDate} 
              filter 
              filterPlaceholder='Search by test Date' 
              filterElement={testDateFilterTemplate}
              sortable
            />

            <Column 
              header='Test Name' 
              field='testName'
              filterField='key' 
              showFilterMenu={false} 
              filterMenuStyle={{ width: '20%'}} 
              style={{ width: '23%' }} 
              body={tests.testName}
              filter 
              filterElement={testNameFilterTemplate} 
              sortable
            />

            <Column 
              field='tags' 
              filterField='tags'
              header='Test Tags' 
              showFilterMenu={false} 
              style={{ width: '20%' }} 
              body={tagsBodyTemplate} 
              filter 
              filterElement={tagsFilter} 
              filterPlaceholder='Test Tags'
              filterMatchMode='contains'
              multiSortMeta={sort}
              onSort={onSort}
              sortable
            /> 

            <Column 
              field='examineeName' 
              header='User Name' 
              filterField='key' 
              showFilterMenu={false} 
              filterMenuStyle={{ width: '20%'}} 
              style={{ width: '23%' }}  
              body={tests.examineeName} 
              filter 
              filterElement={examineeNameFilterTemplate} 
              sortable
            />
          </DataTable>
        </div>
      </TabPanel>

      <TabPanel value={value} index={2} >
        <div className='card'>
          <DataTable 
            ref={dt}
            value={tests} 
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50]}
            dataKey='id' 
            responsiveLayout='scroll'
            emptyMessage='No In Completed Test found.'
            sortMode='multiple'
            // scrollable={true}
            // scrollDirection='both'
            // scrollHeight='600px'
            // scrollWidth='440px'
            responsiveLayout='scroll'
            >

            <Column
              field='Index'
              header='Sr. No.'
              body={onIndexTemplate}
              style={{ width: '4%' }}
            />

            <Column 
              header='Test Date' 
              field='testDate'
              filterField='key'
              showFilterMenu={false} 
              filterMenuStyle={{ width: '20%'}} 
              style={{ width: '20%' }} 
              body={tests.testDate} 
              filter 
              filterPlaceholder='Search by test Date' 
              filterElement={testDateFilterTemplate}
              sortable
            />

            <Column 
              header='Test Name' 
              field='testName'
              filterField='key' 
              showFilterMenu={false} 
              filterMenuStyle={{ width: '20%'}} 
              style={{ width: '23%' }} 
              body={tests.testName}
              filter 
              filterElement={testNameFilterTemplate} 
              sortable
            />

            <Column 
              field='tags' 
              filterField='tags'
              header='Test Tags' 
              showFilterMenu={false} 
              style={{ width: '20%' }} 
              body={tagsBodyTemplate} 
              filter 
              filterElement={tagsFilter} 
              filterPlaceholder='Test Tags'
              filterMatchMode='contains'
              multiSortMeta={sort}
              onSort={onSort}
              sortable
            /> 

            <Column 
              field='examineeName' 
              header='User Name' 
              filterField='key' 
              showFilterMenu={false} 
              filterMenuStyle={{ width: '20%'}} 
              style={{ width: '23%' }}  
              body={tests.examineeName} 
              filter 
              filterElement={examineeNameFilterTemplate} 
              sortable
            />
          </DataTable>
        </div>
      </TabPanel>

      <TabPanel value={value} index={3} >
        <div className='card'>
          <DataTable 
            ref={dt}
            value={tests} 
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 20, 50]}
            dataKey='id' 
            responsiveLayout='scroll'
            emptyMessage='No Test found.'
            sortMode='multiple'
            // scrollable={true}
            // scrollDirection='both'
            // scrollHeight='600px'
            // scrollWidth='440px'
            responsiveLayout='scroll'
            >

            <Column
              field='Index'
              header='Sr. No.'
              body={onIndexTemplate}
              style={{ width: '4em' }}
            />

            <Column 
              header='Test Date' 
              field='testDate'
              filterField='key'
              showFilterMenu={false} 
              filterMenuStyle={{ width: '20%'}} 
              style={{ width: '20%' }} 
              body={tests.testDate} 
              filter 
              filterPlaceholder='Search by test Date' 
              filterElement={testDateFilterTemplate}
              sortable
            />

            <Column 
              header='Test Name' 
              field='testName'
              filterField='key' 
              showFilterMenu={false} 
              filterMenuStyle={{ width: '20%'}} 
              style={{ width: '23%' }} 
              body={tests.testName}
              filter 
              filterElement={testNameFilterTemplate} 
              sortable
            />

            <Column 
              field='tags' 
              filterField='tags'
              header='Test Tags' 
              showFilterMenu={false} 
              style={{ width: '20%' }} 
              body={tagsBodyTemplate} 
              filter 
              filterElement={tagsFilter} 
              filterPlaceholder='Test Tags'
              filterMatchMode='contains'
              multiSortMeta={sort}
              onSort={onSort}
              sortable
            /> 

            <Column 
              field='examineeName' 
              header='User Name' 
              filterField='key' 
              showFilterMenu={false} 
              filterMenuStyle={{ width: '20%'}} 
              style={{ width: '23%' }}  
              body={tests.examineeName} 
              filter 
              filterElement={examineeNameFilterTemplate} 
              sortable
            />
          </DataTable>
        </div>
      </TabPanel>

      {/* <TabPanel value={value} index={3}> */}
        {/* <Container>
        <Box sx={{ bgcolor: '#cfe8fc', height: '90vh', fontFamily:'Poppins Roboto sans-serf !important' }}>
        {tests.length && tests.map((test, index) =>{
          return (
          <div key={index}>
              <Card sx={ { width: 256 } } style={cardStyle}>
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
      </Container> 
      </TabPanel>  */}
    </Box>
    </>
  );
}

export default TestsList;