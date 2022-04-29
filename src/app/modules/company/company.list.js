/*******************************************************************************************************
 * Company List file
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

import { useForm } from 'react-hook-form';
import SessionService from '../../core/services/useSessionStorage';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Icon } from '@iconify/react';
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from 'primereact/inputtext';

import CompanyDataService from '../../core/actions/company';

import {
  CompanyListForm,
  Heading,
  Row,
  ButtonSml,
  ButtonIcon,
  ButtonPrimary,
  AddCompany,
  DataTableCss
} from './components/CompanyElements';

const CompanyList = () => {
  const history = useHistory();
  const [sort, setSort] = useState([{ field: 'text', order: 1 }]);
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const dt = useRef(null);
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyContactNo, setCompanyContactNo] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');

  const onCompanyNameChange = async (e) => {
    const companyName = e.value;
    dt.current.filter(companyName, 'companyName', 'equals');
    setCompanyName(companyName);    
    search(companyName, companyEmail, companyContactNo, companyWebsite, sort, currentPage, rows);
  };

  const onCompanyEmailChange = (e) => {
    const companyEmail = e.target.value;
    dt.current.filter(companyEmail, 'companyEmail', 'equals');
    setCompanyEmail(companyEmail);
    search(companyName, companyEmail, companyContactNo, companyWebsite, sort, currentPage, rows);
  };

  const onCompanyContactNoChange = (e) => {
    const companyContactNo = e.target.value;
    dt.current.filter(companyContactNo, 'companyContactNo', 'equals');
    setCompanyContactNo(companyContactNo);
    search(companyName, companyEmail, companyContactNo, companyWebsite, sort, currentPage, rows);
  };

  const onCompanyWebsiteChange = (e) => {
    const companyWebsite = e.target.value;
    dt.current.filter(companyWebsite, 'companyWebsite', 'equals');
    setCompanyWebsite(companyWebsite);
    search(companyName, companyEmail, companyContactNo, companyWebsite, sort, currentPage, rows);
  };

  const companyNameFilterTemplate = (
    <InputText
      filter
      value={companyName}
      onChange={onCompanyNameChange}
      placeholder='Company Name'
      className='p-column-filter'
      width='20%'
    />
  );

  const companyEmailFilterTemplate = (
    <InputText
      filter
      value={companyEmail}
      onChange={onCompanyEmailChange}
      placeholder='Company Email'
      className='p-column-filter'
      width='20%'
    />
  );

  const companyContactNoFilterTemplate = (
    <InputText
      filter
      value={companyContactNo}
      onChange={onCompanyContactNoChange}
      placeholder='Company ContactNo'
      className='p-column-filter'
      width='20%'
    />
  );

  const companyWebsiteFilterTemplate = (
    <InputText
      filter
      value={companyWebsite}
      onChange={onCompanyWebsiteChange}
      placeholder='Company Website'
      className='p-column-filter'
      width='20%'
    />
  );

  function getDefaultValues() {
    const { companyName, companyEmail, companyContactNo, companyWebsite } = SessionService.getSessionStorageOrDefault(
      'CompanyList',
      {
        companyName: '',
        companyEmail: '',
        companyContactNo: '',
        companyWebsite: ''
      }
    );
    return {
      companyName: companyName,
      companyEmail: companyEmail,
      companyContactNo: companyContactNo,
      companyWebsite: companyWebsite
    };
  }

  const { register, handleSubmit, reset, getValues, control } = useForm({
    defaultValues: getDefaultValues()
  });

  const search = async (
    companyName,
    companyEmail,
    companyContactNo,
    sort,
    currentPage,
    rows
  ) => {
    console.log('sort==>', sort);
    CompanyDataService.getAllCompanies(
      companyName,
      companyEmail,
      companyContactNo,
      sort,
      currentPage,
      rows
      )
      .then((response) => {
        const { totalItems, currentPage, totalPages, companies } =
          response.data;
        setCompanies(companies);
        setCurrentPage(currentPage);
        setTotalRecords(totalItems);
        SessionService.setSessionStrage('CompanyList', {
          companyName: companyName,
          companyEmail: companyEmail,
          companyContactNo: companyContactNo,
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
    const { companyName, companyEmail, companyContactNo, currentPage, rows } =
      SessionService.getSessionStorageOrDefault('CompanyList', {
        companyName: '',
        companyEmail: '',
        companyContactNo: '',
        currentPage: 0,
        rows: 10
      });
    search(companyName, companyEmail, companyContactNo, sort, currentPage, rows);
  }, []);

  const submitForm = (data) => {
    console.log(data);
    const {companyName, companyEmail, companyContactNo } = data;
    search(companyName, companyEmail, companyContactNo, sort, currentPage, rows);
  };

  const onPageChange = async (e) => {
    const { page, rows } = e;
    await setCurrentPage(page);
    await setRows(rows);
    const { companyName, companyEmail, companyContactNo } = getValues();
    search(companyName, companyEmail, companyContactNo, sort, currentPage, rows);
  };

  const editCompany = async (company) => {
    var id = company.id;
    var path = `/update_company/${id}`;
    console.log('path==>', path);
    history.push(path);
  };

  const viewCompany = async (company) => {
    var id = company.id;
    var path = `/view_company/${id}`;
    history.push(path);
  };

  const addCompany = async () => {
    var path = `/add_company`;
    console.log('path==>', path);
    history.push(path);
  };

  const viewCompanyTable = (rowData) => {
    console.log('rowData==>', rowData);
  };

  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1;
  };

  const onSort = async (e) => {
    console.log('onSort==>', e);
    await setSort(e.multiSortMeta);
    const { companyName, companyEmail, companyContactNo } = getValues();
    search(companyName, companyEmail, companyContactNo, e.multiSortMeta, currentPage, rows);
  };

  const onFilter = (e) => {
    console.log('onFilter', e);
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <ButtonSml width='40px' onClick={() => viewCompany(rowData)}>
          <Icon
            icon='fluent:reading-mode-mobile-24-regular'
            color='${(props) => props.theme.primaryColor}'
            width='20'
            height='20'
          />
        </ButtonSml>
        <ButtonSml width='40px' onClick={() => editCompany(rowData)}>
          <Icon
            icon='clarity:note-edit-line'
            color='${(props) => props.theme.primaryColor}'
            width='20'
            height='20'
          />
        </ButtonSml>
      </>
    );
  };

  return (
    <>
      <CompanyListForm>
        <div>
          <Row>
            <Heading>Companies List</Heading>
          </Row>
          <Row>
            <AddCompany>
              <ButtonPrimary onClick={addCompany}>
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
            </AddCompany>
          </Row>
            <DataTableCss>
            <div className='card'>
              <DataTable
                ref={dt}
                value={companies}
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 20, 50]}
                emptyMessage='No Companies found.'
                multiSortMeta={sort}
                onSort={onSort}
                onFilter={onFilter}
                globalFilterFields={['companyType', 'text']}
                sortMode='multiple'
                // scrollable={true}
                // scrollDirection='both'
                // scrollHeight='600px'
                // scrollWidth='440px'
                responsiveLayout='scroll'
                onValueChange={filteredData => console.log(filteredData)}
              >
                <Column
                  field='Index'
                  header='Sr. No.'
                  body={onIndexTemplate}
                  style={{ width: '4%' }}
                />
                <Column 
                  field='companyName' 
                  filterField='companyName'
                  header='Company Name' 
                  showFilterMenu={false} 
                  filterMenuStyle={{ width: '10em'}} 
                  style={{ minWidth: '20%' }} 
                  body={companies.companyName} 
                  filter 
                  filterElement={companyNameFilterTemplate}
                  filterMatchMode='contains'
                  sortable />
                <Column
                  field='companyEmail'
                  filterField='companyEmail'
                  header='company Email'
                  body={companies.companyEmail}
                  filter
                  filterPlaceholder='Company Email'
                  filterMatchMode='contains'
                  style={{ minWidth: '26%' }}
                  sortable
                  filterElement={companyEmailFilterTemplate}
                />
                <Column
                  field='companyContactNo'
                  filterField='companyContactNo'
                  header='Company ContactNo'
                  body={companies.companyContactNo}
                  filter
                  filterElement={companyContactNoFilterTemplate}
                  filterPlaceholder='Company ContactNo'
                  filterMatchMode='contains'
                  style={{ minWidth: '15%' }}
                  sortable
                />
                <Column
                  field='companyWebsite'
                  filterField='companyWebsite'
                  header='Company Website'
                  body={companies.companyWebsite}
                  filterPlaceholder='Company Website'
                  filterMatchMode='contains'
                  style={{ minWidth: '20%' }}
                  sortable
                />
                <Column
                  body={actionBodyTemplate}
                  style={{ minWidth: '15%', overflow: 'visible' }}
                ></Column>
              </DataTable>
            </div>
            </DataTableCss>
        </div>
        <Row>
          <Heading></Heading>
          <AddCompany>
            <ButtonPrimary onClick={addCompany}>
              <Icon
                icon='carbon:add-alt'
                color='${(props) => props.theme.primaryColor}'
                width='20'
                height='20'
              />
              &nbsp; Add New
            </ButtonPrimary>
          </AddCompany>
        </Row>
      </CompanyListForm>
    </>
  );
};

export default CompanyList;
