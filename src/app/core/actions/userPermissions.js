import axios from "axios";

class UserPermissionsDataService {

    // Create a Single UserPermissions
    createUserPermissions (newUserPermissions) {
      console.log('newUserPermissions:==>', newUserPermissions);
      return axios.post('userPermissions', newUserPermissions);
    }

    // getAll() {
    //     return axios.get('all-userPermissions');
    // }

    // Update a Single UserPermissions
    updateUserPermissions (id, updatedUserPermissions) {
      return axios.put(`userPermissions/${id}`, updatedUserPermissions);
    }

    // Delete a Single UserPermissions
    deleteUserPermissions (id, updatedUserPermissions) {
      return axios.put(`userPermissions/${id}`, updatedUserPermissions);
    }

    // Remove a Single UserPermissions
    removeUserPermissions (id) {
      return axios.delete(`userPermissions/${id}`);
    }

    // Get a Single UserPermissions by UserPermissions Id
    getUserPermissions (id) {
      return axios.get(`userPermissions/${id}`);
    }

    getQueryString(userId, userName, module, action, sort, page, size) {
      if(userId !== undefined && userId.trim() !== ''){
        userId = userId.trim();
      }
      if(userName !== undefined && userName.trim() !== ''){
        userName = userName.trim();
      }
      if(module !== undefined && module.trim() !== ''){
        module = module.trim();
      }
      if(action !== undefined && action.trim() !== ''){
        action = action.trim();
      }

      var search='';
      if(userId !== undefined && userId !== ''){
          search = search + 'userId=' + userId;
      }
      if(userName !== undefined && userName !== ''){
        search = search + 'userName=' + userName;
      }
      if(module !== undefined && module !== ''){
        search = search + 'module=' + module;
      }
      if(action !== undefined && action !== ''){
        search = search + 'action=' + action;
      }
      if(sort!==undefined && sort.length > 0){
          const sorts = JSON.stringify(sort);
          search = search + '&sort=' + sorts;
      }
      search = search + '&page=' + page;
      search = search + '&size=' + size; 
      if(search !== '') {
          search = '?' + search;
      }
      return search;
    }
    // Get all UserPermissions
    getAllUserPermissions (userId, userName, module, action, sort, page = 0, size = 10) {
      var search = this.getQueryString(userId, userName, module, action, sort, page, size);
      console.log('getAllUserPermissions=>search:', search);
      return axios.get(`userPermissionsByPage${search}`);
    }
}

export default new UserPermissionsDataService();
