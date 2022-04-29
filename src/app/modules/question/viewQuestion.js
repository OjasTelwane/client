import React, {useState, useEffect} from 'react'
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router';
import Chip from '@material-ui/core/Chip';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import QuestionDataService from '../../core/actions/question';
import TestTemplateQuestionDataService from '../../core/actions/testTemplateQuestion';
import TestQuestionDataService from '../../core/actions/testQuestion';

import {
  Row,
  Button,
  TagList, 
  IsVerified, 
  CheckBoxLabel, 
  TagLabel
  } from './components/QuestionElements';
import PreviewMedia from './previewMedia';

const ViewQuestion = () => {
  const history = useHistory();
    const match = useRouteMatch();
    const { id } = match.params;
    const [question, setQuestion] = useState(undefined);
    const [questionAskedFrequency, setQuestionAskedFrequency] = useState(undefined);
    const [questionAnsweredFrequency, setQuestionAnsweredFrequency] = useState(undefined)
    const [maxTime, setMaxTime] = useState(undefined);
    const [minTime, setMinTime] = useState(undefined);
    const [avgTime, setAvgTime] = useState(undefined);
    useEffect(() => {
      QuestionDataService.getQuestion(id)
        .then((response) => {
          setQuestion(response.data);
          console.log(response.data);
      });
      TestTemplateQuestionDataService.getTestTemplateQuestionFrequency(id)
        .then((res) => {
          setQuestionAskedFrequency(res.data);
          console.log(res.data);
      });
      TestQuestionDataService.getTestQuestionFrequency(id)
        .then((res) => {
          setQuestionAnsweredFrequency(res.data);
          console.log(res.data);
      });
      TestQuestionDataService.getMaxTimeToAnswerTestQuestion(id)
        .then((res) => {
          setMaxTime(res.data[0].maxTime);
          console.log(res.data[0].maxTime);
      });
      TestQuestionDataService.getMinTimeToAnswerTestQuestion(id)
        .then((res) => {
          setMinTime(res.data[0].minTime);
          console.log(res.data[0].minTime);
      });
      TestQuestionDataService.getAvgTimeToAnswerTestQuestion(id)
        .then((res) => {
          setAvgTime(res.data[0].minTime);
          console.log(res.data[0].minTime);
      });
    }, []);

  const backtoQuestionList = () => {
    history.goBack();
  }

  return (
    <>
      {question !== undefined && 
      <>
      <Container>
        {/* <Box sx={{ height: '100vh', fontFamily:'Poppins Roboto sans-serf !important' }}> */}
        {question.questionType === 0 && <h8><strong><i><p>Question Type:&nbsp;&nbsp;&nbsp;Single Correct Answer</p></i></strong></h8>}
        {question.questionType === 1 && <h8><strong><i><p>Question Type:&nbsp;&nbsp;&nbsp;Multiple Correct Answer</p></i></strong></h8>}
        {question.questionType === 2 && <h8><strong><i><p>Question Type:&nbsp;&nbsp;&nbsp;Reorder Type Question</p></i></strong></h8>}
        {question.questionType === 3 && <h8><strong><i><p>Question Type:&nbsp;&nbsp;&nbsp;Evaluation Type Question</p></i></strong></h8>}
        <div>Question : </div>
        <TextareaAutosize
            defaultValue={question.text}
            disabled
            style={{width : '100%', margin:'auto', fontSize:'16px', border:'none', bgcolor:'white',
                lineHeight:'16px', lineBreak:'10px', padding:'12px'
          }}
        />
      <PreviewMedia files = {question.files} />
        <TagLabel>Tags: </TagLabel>
        <TagList>
        {question.tags && question.tags.map((tag, j) => (
            <Chip variant='outlined' color='primary' label={tag} />
            ))}
        </TagList>
          <Row>
            <IsVerified
              type='checkbox'
            />
            <CheckBoxLabel htmlFor='isVerified'>is Verified</CheckBoxLabel>
          </Row>
          <hr/>
          {question &&
            question.options &&
            question.options.map((option, j) => (
              <div>Option {j+1}
                <TextareaAutosize
                    defaultValue={option.text}
                    disabled
                    style={{width : '100%', margin:'auto', fontSize:'16px', border:'none', bgcolor:'white',
                        lineHeight:'16px', lineBreak:'10px', padding:'12px' 
                  }}
                />
                <PreviewMedia files = {option.files} />
                <TagLabel>Tags: </TagLabel>
                <TagList>
                {option.tags && option.tags.map((tag, j) => (
                    <Chip variant='outlined' color='primary' label={tag.tag} />
                  ))}
                </TagList>
                <hr/>
                </div>
            ))}
          <Row>
          <Button onClick={backtoQuestionList}>
            Back
          </Button>
          </Row>
        {/* </Box> */}
        </Container>
      </>
      }
      
        {/* <Container>
          <div>
            <br />
            <h3>Question Analysis</h3>
            <br/>
              <h5>No of times Questions was Asked: {questionAskedFrequency}</h5>
              <h5>No of times Questions was Answered: {questionAnsweredFrequency}</h5>
            <br />
            <h3>Time taken to Answer the question</h3><br/>
            <Row>
              <div style={{width:'100%'}}>
                <div style={{float:'left', width:'33.33%'}}>
                  <h5>Max Time: {maxTime}</h5>
                </div>
                <div style={{float:'left', width:'33.33%'}}>
                  <h5>Min Time: {minTime}</h5>
                </div>
                <div style={{float:'left', width:'33.33%'}}>
                  <h5>Average Time: {avgTime}</h5>
                </div>
              </div>
            </Row>
<br /><br />
            <h3>Number of times Examinee Switch Options</h3><br/>
            <Row>
              <div style={{width:'100%'}}>
                <div style={{float:'left', width:'33.33%'}}>
                  <h5>Max : 3</h5>
                </div>
                <div style={{float:'left', width:'33.33%'}}>
                  <h5>Min : 1</h5>
                </div>
                <div style={{float:'left', width:'33.33%'}}>
                  <h5>Average : 1</h5>
                </div>
              </div>
            </Row>
<br /><br />
            <h3>Review / Remarks</h3>

            <Row>
              <div style={{width:'100%'}}>
                <div style={{float:'left', width:'50%'}}>
                  <h5>Unclear </h5>
                </div>
                <div style={{float:'left', width:'50%'}}>
                  <h5> 1</h5>
                </div>
              </div>
            </Row>

            <Row>
              <div style={{width:'100%'}}>
                <div style={{float:'left', width:'50%'}}>
                  <h5>Unable to understand Question </h5>
                </div>
                <div style={{float:'left', width:'50%'}}>
                  <h5> 3</h5>
                </div>
              </div>
            </Row>

            <Row>
              <div style={{width:'100%'}}>
                <div style={{float:'left', width:'50%'}}>
                  <h5>Unable to select Right Answer </h5>
                </div>
                <div style={{float:'left', width:'50%'}}>
                  <h5> 4</h5>
                </div>
              </div>
            </Row>

            <Row>
              <div style={{width:'100%'}}>
                <div style={{float:'left', width:'50%'}}>
                  <h5>Abusive Language</h5>
                </div>
                <div style={{float:'left', width:'50%'}}>
                  <h5> 1</h5>
                </div>
              </div>
            </Row>

            <Row>
              <div style={{width:'100%'}}>
                <div style={{float:'left', width:'50%'}}>
                  <h5>Inappropriate </h5>
                </div>
                <div style={{float:'left', width:'50%'}}>
                  <h5> 1</h5>
                </div>
              </div>
            </Row>

            <Row>
              <div style={{width:'100%'}}>
                <div style={{float:'left', width:'50%'}}>
                  <h5>Other </h5>
                </div>
                <div style={{float:'left', width:'50%'}}>
                  <h5> 1</h5>
                </div>
              </div>
            </Row>

          </div>
        </Container> */}
    </>
  )
}

export default ViewQuestion;