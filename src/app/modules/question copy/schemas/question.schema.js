/*******************************************************************************************************
 * Question Schema file
 * @company : Imatmi.
 * @author : Ojas Telwane.
 * @Copyright : 2021 Imatmi.
 * =====================================================================================================
 * Modification History
 * Date				Modified By		Changes Description
 * 31/09/2021 Ojas Telwane	Created, modified to make it moduler
 *******************************************************************************************************/

import * as yup from 'yup'; 

const question = require('../../schemas/common/question.dto');
const selection = require('../../schemas/common/selection.dto');
const file = require('../../schemas/common/files.dto');
const option = require('../../schemas/common/option.dto');

const questionSchema = yup.object().shape({
  question,
  isActive: yup.boolean().default(false),
  isVerified: yup.boolean(),
  verifiedBy: yup.string(),
  createdBy: yup.string(),
  modifiedBy: yup.string(),
  tags: yup.array(),
  files: yup.array().of(file),
  selections: yup.array().of(selection),
  options: yup.array().of(option)
});

export default questionSchema;