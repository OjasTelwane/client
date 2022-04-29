import axios from "axios";

class GroupPermissionsDataService {

    // Create a Single GroupPermissions
    createGroupPermissions (newGroupPermissions) {
      console.log('newGroupPermissions:==>', newGroupPermissions);
      return axios.post('groupPermissions', newGroupPermissions);
    }

    // getAll() {
    //     return axios.get('all-groupPermissions');
    // }

    // Update a Single GroupPermissions
    updateGroupPermissions (id, updatedGroupPermissions) {
      return axios.put(`groupPermissions/${id}`, updatedGroupPermissions);
    }

    // Delete a Single GroupPermissions
    deleteGroupPermissions (id, updatedGroupPermissions) {
      return axios.put(`groupPermissions/${id}`, updatedGroupPermissions);
    }

    // Remove a Single GroupPermissions
    removeGroupPermissions (id) {
      return axios.delete(`groupPermissions/${id}`);
    }

    // Get a Single GroupPermissions by GroupPermissions Id
    getGroupPermissions (id) {
      return axios.get(`groupPermissions/${id}`);
    }

    getQueryString(role, module, action, sort, page, size) {
      if(role !== undefined && role.trim() !== ''){
        role = role.trim();
      }
      if(module !== undefined && module.trim() !== ''){
        module = module.trim();
      }
      if(action !== undefined && action.trim() !== ''){
        action = action.trim();
      }

      var search='';
      if(role !== undefined && role !== ''){
          search = search + 'role=' + role;
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
    // Get all GroupPermissions
    getAllGroupPermissions (role, module, action, sort, page = 0, size = 10) {
      var search = this.getQueryString(role, module, action, sort, page, size);
      console.log('getAllGroupPermissions=>search:', search);
      return axios.get(`groupPermissionsByPage${search}`);
    }
}

export default new GroupPermissionsDataService();
