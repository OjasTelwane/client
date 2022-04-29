import axios from 'axios';
export const getUserNameFromEmpId = async (empId) => {
  const response = await axios.get(`user/${empId}`).data;
  return response?.personalInformation?.fullName;
};
