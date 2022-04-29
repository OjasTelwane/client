import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import TestQuestionDataService from '../../core/actions/testQuestion';

import Button from '@material-ui/core/Button';
import {
  // useParams,
  useRouteMatch,
  useHistory
} from "react-router-dom";

import {
  QuestionOptionForm,
  QuestionContainer,
  Label,
  RowHeading,
  ListItem
} from './components/TestElements';
import SingleQuestion from './singleQuestion';
import EvaluationQuestion from './evaluationQuestion';
import Instructions from './instructions';
import Timer from './timer';
import { FormContainer } from '../testTemplate/components/testTemplateElements';
import { convertDateTimeToServer} from '../date-utils';

const TestComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState();
  const [currentIndex, _setCurrentIndex] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePre, setDisablePre] = useState(true);
  const [response, setResponse] = useState([]);
  const match = useRouteMatch();
  const { id } = match.params;
  const handle = useFullScreenHandle();

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

  const setCurrentIndex = (index) => {
    _setCurrentIndex(index);
    setQuestion(questions[index]);
  }

  const initResponses = () => {
    if(questions) {
      questions.map((q) => {
        const t = q;
        t.selected_option_id = 0;
        q = t;
      });
      console.log("questions", questions);
    }
  }
  useEffect(async () => {
    console.log(id)
    if(id) {
      const q = await TestQuestionDataService.getAllTestQuestions(id, 0, 50);
      // const q = await axios.get(`http://localhost:8080/test-templates/${id}`);
      if(!q.data) {
        return;
      }
      q.data.questions.map((ques) => {
        const t = ques;
        t.selected_option_id = 0;
        ques = t;
      });
      console.log("res.data", q.data);
      console.log("res.data", q.data.questions.length);
      setQuestions(q.data.questions);
    }
  }, []);

  const nextStep = () => {
    if(questions !== undefined) {
      setDisablePre(false);
      if(currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex+1);
      }
      if(currentIndex === questions.length-1){
        setDisableNext(true);
      }
    }
  }

  const preStep = () => {
    if(questions !== undefined) {
      setDisableNext(false);
      if(currentIndex > 0) {
        setCurrentIndex(currentIndex-1);
      }
      if(currentIndex === 0){
        setDisablePre(true);
      }
    }
  }

  const handleStartTest = (e) => {
    handle.enter();
    const testDate = Date.now();
    const startTime = Date.now();
    var newTestDate = convertDateTimeToServer(testDate);
    var newStartTime = convertDateTimeToServer(startTime);

    TestQuestionDataService.startTest(id, newTestDate, newStartTime);
  }

  const handleResponse =(e) => {
    const name = e.target?.name;
    const value = e.target?.value;
    console.log("name" ,name);
    console.log("value", value);
    setQuestions((prev) => {
      const newOne = prev.map((item) => 
      (item.id === name ?
          { ...item, selected_option_id: value } : { ...item}
      ));
      return newOne;
    });
    console.log("response", questions);
  }
  const history = useHistory();
  const showResult = () => {
    handle.exit();
    const testDate = Date.now();
    const endTime = Date.now();
    var newTestDate = convertDateTimeToServer(testDate);
    var newEndTime = convertDateTimeToServer(endTime);

    TestQuestionDataService.endTest(id, newTestDate, newEndTime);
    history.push('/test_result');
  }
  return (
    <>
      <Instructions handleChange={handleStartTest}/> 
      <FullScreen handle={handle}>
        {handle.active && 
          <div style={{'background':'white'}}>
          <FormContainer>
          <div style={{'float' : 'left'}}>
              <h2>Test Title</h2>
          </div>
          <div style ={{'display' : 'flex', 'flexDirection' : 'row', 'justifyContent' :'flex-end', 'columnGap':'15px'}}>
            <Button
                variant='contained'
                color='secondary'
                onClick={showResult}
              >
                End Test
              </Button>  
              <Timer expiryTimestamp = {time} />
          </div>
          </FormContainer>
        <QuestionOptionForm>
          <QuestionContainer>
            {question !== undefined && questions !== undefined && questions.length > 0 && 
              <ListItem>
                  <div style={{'height' : '500px'}}>
                    <RowHeading>
                      <Label>Question {currentIndex+1}</Label>
                    </RowHeading>
                    { question.questionType === 3 && (
                      <EvaluationQuestion question = {question} tickOptions={true} handleChange={handleResponse}/> 
                    )}
                    { question.questionType !== 3 && (
                      <SingleQuestion question = {question} tickOptions={true} handleChange={handleResponse}/>
                    )}
                  </div>
              </ListItem>
            }
            </QuestionContainer>
        </QuestionOptionForm>
        <div style ={{'display' : 'flex', 'flexDirection' : 'row', 'justifyContent' :'flex-end', 'marginRight' : '60px', 'columnGap':'10px', 'position':'sticky'}} >
          <Button
            color='primary'
            variant='contained'
            onClick={preStep}
            disabled = {disablePre || (currentIndex === 0)}
          >
            Previous
          </Button>
          <Button
          color='primary'
            variant='contained'
            onClick={nextStep}
            disabled = {disableNext || (currentIndex === questions.length-1)}
          >
            Next
          </Button>
        </div>
        <br></br>
        <br></br>                
        </div> 
        }
      </FullScreen>
    </>
  );
}

export default TestComponent;
