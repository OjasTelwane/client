/*******************************************************************************************************
 * user Dto file
 * @company : Imatmi.
 * @author : Ojas Telwane.
 * @Copyright : 2021 Imatmi.
 * =====================================================================================================
 * Modification History
 * Date				Modified By		Changes Description
 * 28/10/2021 Ojas Telwane	Created
 *******************************************************************************************************/

const yup = require('yup');

const userDto = yup.object().shape({
  name: yup.string().required(),
  email: yup.string(),
  isActive: yup.boolean().default(true)
});

const userParamDto = yup.object().shape({
  name: yup.string(),
  email: yup.string()
});

const userParamPageDto = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
  page: yup.number().default(0),
  size: yup.number().default(2)
});

module.exports = {
  userDto,
  userParamDto,
  userParamPageDto
};
