import axios from "axios";

class TestQuestionDataService {

    // Create a Single TestQuestion
    createTestQuestion (newTestQuestion) {
        console.log('newTestQuestion:==>', newTestQuestion);
        return axios.post('testQuestions', newTestQuestion);
    }

    getAll() {
        return axios.get('all-questions');
    }
    // Add multiple TestQuestions in Batch
    createTestQuestionsBatch (newTestQuestionsArray) {
        return axios.post('testQuestions/addBatch', newTestQuestionsArray);
    }

    // Update a Single TestQuestion
    updateTestQuestion (id, updatedTestQuestion) {
        return axios.put(`testQuestions/${id}`, updatedTestQuestion);
    }

    // Delete a Single TestQuestion
    deleteTestQuestion (id, updatedTestQuestion) {
        updatedTestQuestion.isActive = false;
        return axios.put(`testQuestions/${id}`, updatedTestQuestion);
    }

    // Remove a Single TestQuestion
    removeTestQuestion (id) {
        return axios.delete(`testQuestions/${id}`);
    }

    // Get a Single TestQuestion by TestQuestion Id
    getTestQuestion (id) {
        return axios.get(`testQuestions/${id}`);
    }

    startTest (id, testDate, startTime) {
        console.log('testDate==>', testDate);
        console.log('startTime==>', startTime);
        
        const testData = { testDate: testDate, startTime: startTime };
        return axios.put(`tests/start/${id}`, testData);
    }

    endTest (id, testDate, endTime) {
        const testData = { testDate: testDate, endTime: endTime };
        return axios.put(`tests/end/${id}`, testData);
    }

    getQueryString(testId, page, size) {
        if(testId !== undefined && testId.trim() !== ''){
            testId = testId.trim();
        }
        var search='';
        if(testId !== undefined && testId !== ''){
            search = 'testId=' + testId;
        }
        search = search + '&page=' + page;
        search = search + '&size=' + size; 
        if(search !== '') {
            search = '?' + search;
        }
        return search;
    }

    // Get all TestQuestions
    getAllTestQuestions (testId, page = 0, size = 10) {
        var search = this.getQueryString(testId, page, size);
        console.log('search:', search);
        return axios.get(`testQuestionsByPage${search}`);
    }

  getTestQuestionFrequency(id){
    if(id !== undefined && id.trim() !== ''){
      id = id.trim();
    }
    var search='';
    if(id !== undefined) {
        search = search + '&questionId=' + id;
    }
    if(search !== '') {
      search = '?' + search;
    }
    return axios.get(`testQuestionFrequency${search}`);
  }

  getMaxTimeToAnswerTestQuestion(id){
    if(id !== undefined && id.trim() !== ''){
      id = id.trim();
    }
    var search='';
    if(id !== undefined) {
        search = search + '&questionId=' + id;
    }
    if(search !== '') {
      search = '?' + search;
    }
    return axios.get(`getMaxTimeToAnswerTestQuestion${search}`);
  }

  getMinTimeToAnswerTestQuestion(id){
    if(id !== undefined && id.trim() !== ''){
      id = id.trim();
    }
    var search='';
    if(id !== undefined) {
        search = search + '&questionId=' + id;
    }
    if(search !== '') {
      search = '?' + search;
    }
    return axios.get(`getMinTimeToAnswerTestQuestion${search}`);
  }

  getAvgTimeToAnswerTestQuestion(id){
    if(id !== undefined && id.trim() !== ''){
      id = id.trim();
    }
    var search='';
    if(id !== undefined) {
        search = search + '&questionId=' + id;
    }
    if(search !== '') {
      search = '?' + search;
    }
    return axios.get(`getAvgTimeToAnswerTestQuestion${search}`);
  }

}

export default new TestQuestionDataService();
