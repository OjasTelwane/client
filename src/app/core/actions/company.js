import axios from "axios";

class CompanyDataService {

    // Create a Single Company
    createCompany (newCompany) {
        console.log('newCompany:==>', newCompany);
        return axios.post('company_admin', newCompany);
    }

    getAll() {
        return axios.get('all-companies');
    }

    // Update a Single Company
    updateCompany (id, updatedCompany) {
        return axios.put(`companies/${id}`, updatedCompany);
    }

    // Delete a Single Company
    deleteCompany (id, updatedCompany) {
        updatedCompany.isActive = false;
        return axios.put(`companies/${id}`, updatedCompany);
    }

    // Remove a Single Company
    removeCompany (id) {
        return axios.delete(`companies/${id}`);
    }

    // Get a Single Company by Company Id
    getCompany (id) {
        return axios.get(`companies/${id}`);
    }

    getQueryString(companyName, companyEmail, companyContactNo, sort, page, size) {
        if(companyName !== undefined && companyName.trim() !== ''){
          companyName = companyName.trim();
        }
        if(companyEmail !== undefined && companyEmail.trim() !== ''){
          companyEmail = companyEmail.trim();
        }
        if(companyContactNo !== undefined && companyContactNo.trim() !== ''){
          companyContactNo = companyContactNo.trim();
        }
        // if(isActive === true ){
        //   isActive = true;
        // }

        var search='';
        if(companyName !== undefined && companyName !== ''){
            search = search + 'companyName=' + companyName;
        }
        if(companyEmail !== undefined && companyEmail !== ''){
          search = search + 'companyEmail=' + companyEmail;
        }
        if(companyContactNo !== undefined && companyContactNo !== ''){
          search = search + 'companyContactNo=' + companyContactNo;
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
    // Get all Companies
    getAllCompanies (companyName, companyEmail, companyContactNo, sort, page = 0, size = 10) {
        // console.log('tag====>', tag);
        var search = this.getQueryString(companyName, companyEmail, companyContactNo, sort, page, size);
        console.log('getAllCompanies=>search:', search);
        return axios.get(`companiesByPage${search}`);
    }
}

export default new CompanyDataService();
