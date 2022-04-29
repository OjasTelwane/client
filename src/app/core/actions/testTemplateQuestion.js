import axios from "axios";

class TestTemplateQuestionDataService {
  
  getTestTemplateQuestionFrequency(id){
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
    return axios.get(`testTemplateQuestionFrequency${search}`);
  }

}

export default new TestTemplateQuestionDataService();