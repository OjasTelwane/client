import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../../layout/spinner';
import PreviewMedia from '../question/previewMedia';
import AddButton from './addButton';
const Dashboard = ({ auth: { user } }) => {
  useEffect(() => {}, []);

  const files = [{
    contentType : 'image',
    src : 'https://raw.githubusercontent.com/react-hook-form/react-hook-form/master/docs/logo.png',
    type : 'image/png'
  }]
  return user === null ? (
    <Spinner />
  ) : (
    <div style={{ padding: '10px' }}>
      <div className='row mx-0'>
        <h4 style={{ fontWeight: 'bold' }}>Dashboard</h4>
      </div>
      {/* <PreviewMedia files={files}/> */}
      <AddButton name='Create Test' url='test_creation' />
      <AddButton name='Create Question' url='add_question' />
      <AddButton name='Add Company' url='add_company' />
      <AddButton name='Add Users' url='add_user' />
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, {})(Dashboard);
