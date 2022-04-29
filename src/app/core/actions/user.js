import axios from "axios";

class UserDataService {

    // Create a Single User
    createUser (newUser) {
        console.log('newUser:==>', newUser);
        return axios.post('users', newUser);
    }

    getAll() {
        return axios.get('all-users');
    }

    // Update a Single User
    updateUser (id, updatedUser) {
        return axios.put(`users/${id}`, updatedUser);
    }

    // Delete a Single User
    deleteUser (id, updatedUser) {
        updatedUser.isActive = false;
        return axios.put(`users/${id}`, updatedUser);
    }

    // Remove a Single User
    removeUser (id) {
        return axios.delete(`users/${id}`);
    }

    // Get a Single User by User Id
    getUser (id) {
        return axios.get(`users/${id}`);
    }

    getQueryString(name, email, sort, page, size) {
        if(name !== undefined && name.trim() !== ''){
          name = name.trim();
        }
        if(email !== undefined && email.trim() !== ''){
          email = email.trim();
        }

        var search='';
        if(name !== undefined && name !== ''){
            search = search + 'name=' + name;
        }
        if(email !== undefined && email !== ''){
          search = search + 'email=' + email;
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
    // Get all Users
    getAllUsers (name, email, sort, page = 0, size = 10) {
        // console.log('tag====>', tag);
        var search = this.getQueryString(name, email, sort, page, size);
        console.log('getAllUsers=>search:', search);
        return axios.get(`UsersByPage${search}`);
    }
}

export default new UserDataService();
