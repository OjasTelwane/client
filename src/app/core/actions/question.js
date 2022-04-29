import axios from "axios";

class QuestionDataService {

    // Create a Single Question
    createQuestion (newQuestion) {
        console.log('newQuestion:==>', newQuestion);
        return axios.post('questions', newQuestion);
    }

    getAll() {
        return axios.get('all-questions');
    }
    // Add multiple Questions in Batch
    createQuestionsBatch (newQuestionsArray) {
        return axios.post('questions/addBatch', newQuestionsArray);
    }

    // Update a Single Question
    updateQuestion (id, updatedQuestion) {
        return axios.put(`questions/${id}`, updatedQuestion);
    }

    // Delete a Single Question
    deleteQuestion (id, updatedQuestion) {
        updatedQuestion.isActive = false;
        return axios.put(`questions/${id}`, updatedQuestion);
    }

    // Remove a Single Question
    removeQuestion (id) {
        return axios.delete(`questions/${id}`);
    }

    // Get a Single Question by Question Id
    getQuestion (id) {
        return axios.get(`questions/${id}`);
    }

    getQueryString(questionType, text, tag, optionText, sort, page, size) {
        if(questionType === -1 ){
            questionType = undefined;
        }
        if(text !== undefined && text.trim() !== ''){
            text = text.trim();
        }
        var search='';
        if(questionType !== undefined) {
            search = search + '&questionType=' + questionType;
        }
        if(text !== undefined && text !== ''){
            search = search + 'text=' + text;
        }
        if(tag!==undefined && tag.length > 0){
            const tags = JSON.stringify(tag);
            search = search + '&tags=' + tags;
            search = search + '&optionTags=[]';
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
    // Get all Questions
    getAllQuestions (questionType, text, tag, optionText, sort, page = 0, size = 10) {
        // console.log('tag====>', tag);
        var search = this.getQueryString(questionType, text, tag, optionText, sort, page, size);
        console.log('getAllQuestions=>search:', search);
        return axios.get(`questionsByPage${search}`);
    }
}

export default new QuestionDataService();
