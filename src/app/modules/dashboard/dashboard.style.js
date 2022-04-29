import styled from 'styled-components';

export const DashboardCalendarStyle = styled.div`
  .p-calendar.p-component {
    width: 100% !important;
  }

  .p-datepicker.p-component.p-datepicker-inline {
    border-radius: 15px;
    background-color: #f9faff;
    border: 0;
    padding: 1rem 1.5rem 1rem 1.5rem !important;
  }

  .p-datepicker .p-datepicker-header {
    background: #f9faff;
    border-bottom: 0px solid #dee2e6;
  }

  .p-datepicker table td {
    padding: 0px;
    border: 1px solid #dfdfdf;
  }

  .p-datepicker table td.p-datepicker-today > span {
    color: #fff;
    background: #fbb67d;
    border-radius: 0px;
  }

  .p-highlight {
    width: 100%;
  }

  .task-heading {
    background-color: #fbb67d;
    color: white;
    font-weight: bold;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

export const TaskTableStyle = styled.div`
  background-color: #f9faff;
  border-radius: 15px;

  .p-datatable thead th {
    color: #143560;
    background-color: #f9faff;
    font-weight: bold;
    font-size: 16px;
    line-height: 18px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    /* text-align: center; */
  }
  .p-datatable tbody td {
    color: #000000;
    background-color: #f9faff;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
`;
