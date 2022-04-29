import axios from "axios";

class TestDataService {

    // Create a Single Test
    createTest (newTest) {
        console.log('newTest==>', newTest);
        return axios.post('tests', newTest);
    }

    // getAll() {
    // return axios.get('all-tests');
    // }
    
    // // Add multiple Tests in Batch
    // createTestsBatch (newTestsArray) {
    // return axios.post('tests/addBatch', newTestsArray);
    // }

    // Update a Single Test
    updateTest (id, updatedTest) {
        return axios.put(`tests/${id}`, updatedTest);
    }

    // Get a Single Test by Test Id
    getTest (id) {
        return axios.get(`tests/${id}`);
    }

    getQueryString(examineeId, page, size) {
        if(examineeId !== undefined && examineeId.trim() !== ''){
            examineeId = examineeId.trim();
        }
        var search='';
        if(examineeId !== undefined && examineeId !== ''){
            search = 'examineeId=' + examineeId;
        }
        search = search + '&page=' + page;
        search = search + '&size=' + size; 
        if(search !== '') {
            search = '?' + search;
        }
        return search;
    }
    // Get all Tests
    getAllTests (examineeId, page = 0, size = 10) {
        var search = this.getQueryString(examineeId, page, size);
        console.log('search:', search);
        return axios.get(`testsByPage${search}`);
    }

    getQueryTestsListString( examineeId, testType, testDate, testName, tags, status, examineeName, sort, page, size) {
        if(examineeId !== undefined && examineeId.trim() !== ''){
            examineeId = examineeId.trim();
        }
        if(testType !== undefined && testType.trim() !== ''){
            testType = testType.trim();
        }
        if(testDate !== undefined && testDate.trim() !== ''){
            testDate = testDate.trim();
        }
        if(testName !== undefined && testName.trim() !== ''){
            testName = testName.trim();
        }
        if(tags !== undefined && tags.trim() !== ''){
            tags = tags.trim();
        }
        if(status !== undefined && status.trim() !== ''){
            status = status.trim();
        }
        if(examineeName !== undefined && examineeName.trim() !== ''){
            examineeName = examineeName.trim();
        }

        var search='';
        if(examineeId !== undefined && examineeId !== ''){
            search = 'examineeId=' + examineeId;
        }
        if(testType !== undefined && testType !== ''){
            search = 'testType=' + testType;
        }
        if(testDate !== undefined && testDate !== ''){
            search = 'testDate=' + testDate;
        }
        if(testName !== undefined && testName !== ''){
            search = 'testName=' + testName;
        }
        if(tags!==undefined && tags.length > 0){
            const Tags = JSON.stringify(tags);
            search = search + '&tags=' + Tags;
        }
        if(status !== undefined && status !== ''){
            search = 'status=' + status;
        }
        if(examineeName !== undefined && examineeName !== ''){
            search = 'examineeName=' + examineeName;
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
    // Get Tests List
    getTestsList ( examineeId, testType, testDate, testName, tags, status, examineeName, sort, page = 0, size = 10) { 
        var search = this.getQueryTestsListString( examineeId, testType, testDate, testName, tags, status, examineeName, sort, page, size);
        console.log('search:', search);
        return axios.get(`testsByPage${search}`);
    }
}

export default new TestDataService();
