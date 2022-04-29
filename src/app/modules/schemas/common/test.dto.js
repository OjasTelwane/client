/*******************************************************************************************************
 * test Dto file
 * @company : Imatmi.
 * @author : Ojas Telwane.
 * @Copyright : 2021 Imatmi.
 * =====================================================================================================
 * Modification History
 * Date				Modified By		Changes Description
 * 16/10/2021 Ojas Telwane	Created
 *******************************************************************************************************/

const yup = require('yup');
const tag = require('./tag.dto');

const test = yup.object().shape({
  testName: yup.string(),
  testType: yup.string(),
  testDescription: yup.string(),
  testDuration: yup.number(),
  testDate: yup.date(),
  startTime: yup.date(),
  endTime: yup.date(),
  tags: yup.array().of(tag),
  attemptNo: yup.number()
});

module.exports = test;
