/*******************************************************************************************************
 * Permission file
 * @company : Imatmi.
 * @author : Ojas Telwane.
 * @Copyright : 2021 Imatmi.
 * =====================================================================================================
 * Modification History
 * Date				Modified By		Changes Description
 * 29/09/2021 Ojas Telwane	Created 
 *******************************************************************************************************/

import {SessionStorageKeywords} from '../../shared/constants/global-constant';

class Permission {

  checkPermission (module, action) {
    
    let currentUser = sessionStorage?.getItem(
      SessionStorageKeywords?.currentUser
    );
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
    }
    if (currentUser) {
      // console.log('currentUser===>', currentUser);
      const userPermission = currentUser.userPermissions.find( up => (up.module === module) && (up.action === action));
      // console.log('permission.js==userPermission', userPermission);
      return (userPermission ? userPermission.checked : false);
    } else {
      return false;
    }
  }
}
export default new Permission();
