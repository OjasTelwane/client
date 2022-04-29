/*******************************************************************************************************
 * Test Template Schema file
 * @company : Imatmi.
 * @author : Ojas Telwane.
 * @Copyright : 2021 Imatmi.
 * =====================================================================================================
 * Modification History
 * Date				Modified By		Changes Description
 * 12/10/2021 Ojas Telwane	Created
 *******************************************************************************************************/

 const yup = require('yup');
 const test = require('../../schemas/common/test.dto');
 
 const testTemplateSchema = yup.object().shape({
   isVerified: yup.string(),
   verifiedBy: yup.string(),
   test,
   isManual: yup.boolean().default(false),
   questions: yup.array(),
 });
 
 module.exports = testTemplateSchema;
 