import axios from "axios";

class TestTemplateDataService {

    // Create a Single TestTemplate
    createTestTemplate (newTestTemplate) {
        return axios.post('test-templates', newTestTemplate);
    }

    // Update a Single TestTemplate
    updateTestTemplate (id, updatedTestTemplate) {
        return axios.put(`test-templates/${id}`, updatedTestTemplate);
    }

    // Delete a Single TestTemplate
    deleteTestTemplate (id) {
      return axios.delete(`test-templates/${id}`);
    }

    // Get a Single TestTemplate by TestTemplate Id
    getQuestion (id) {
        return axios.get(`test-templates/${id}`);
    }

    getQueryString(testType, testName, tags, sort, page, size) {
        if(testType !== undefined && testType.trim() !== ''){
            testType = testType.trim();
        }
        if(testName !== undefined && testName.trim() !== ''){
            testName = testName.trim();
        }
        if(tags !== undefined && tags.trim() !== ''){
            tags = tags.trim();
        }

        var search='';
        if(testType !== undefined && testType !== ''){
            search = 'testType=' + testType;
        }
        if(testName !== undefined && testName !== ''){
            search = 'testName=' + testName;
        }
        if(tags !== undefined && tags !== ''){
            search = 'tags=' + tags;
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
    // Get all test Templates
    getAllTestTemplates (testType, testName, tags, sort, page = 0, size = 5) {
        var search = this.getQueryString(testType, testName, tags, sort, page, size);
        console.log('search:', search);
        return axios.get(`test-templatesByPage${search}`);
    }

    getAllTests(){
        return axios.get('test-template-all');
    }

    assignTestTemplate (id, examineeId, examineeName) {
        const test = {
            id: id,
            examineeId: examineeId,
            examineeName: examineeName
        }
        return axios.post(`test-templates/assign`, test);
    }

    assignManyTestTemplate (id, users) {
        console.log('id==>', id);
        console.log('users=>>', users);

        const examinees = users.map((u) => {
            return {
                examineeId: u.id,
                examineeName: u.name
            }
        });
        const tests = {
            id:id,
            examinees: examinees
        }
        return axios.post(`test-templates/assign-many`, tests);
    }
}

export default new TestTemplateDataService();
