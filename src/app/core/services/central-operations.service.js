import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Pages } from '../../shared/constants/routes';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const getAuthToken = () => {
  const token = localStorage.token;
  if (+token?.length) {
    return token;
  }
  return null;
};

export const GetEmpId = () => {
  const history = useHistory();

  const Initalize = () => {
    const empId = localStorage.getItem('empId');
    if (empId) {
      return empId;
    } else {
      localStorage.clear();
      history.push(Pages.login.link);
    }
  };
  return Initalize();
};
