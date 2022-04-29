import React from 'react';
import { BasicDetailsStyle } from './components/testTemplateElements';
import Button from '@material-ui/core/Button';
import TestTemplateDataService from '../../core/actions/testTemplate';
import { convertDateTimeToServer} from '../date-utils';
import { useHistory } from 'react-router';
import QuestionSelected from './questionSelected';
const Confirm = ({ nextStep, prevStep , values, testDate, startTime, endTime, isManual, tags, tagsWeightage, questions}) => {
    const history = useHistory();
    const onSubmit = () => {
        var newTestDate = convertDateTimeToServer(testDate);
        var newStartTime = convertDateTimeToServer(startTime);
        var newEndTime = convertDateTimeToServer(endTime);
        var last = tagsWeightage[tagsWeightage.length-1].level;
        
        var i;
        var fib = []; 
        fib.push(1);
        fib.push(2);
        for (i = 2; i <= last; i++) 
        {
            fib.push(fib[i - 2] + fib[i - 1]);
        }

        const newTestTemplate = {
            isVerified: 'true',
            verifiedBy: '',
            testName: values.name,
            testType: '0',
            testDescription: values.description,
            testDuration: values.duration,
            testDate: newTestDate,
            startTime: newStartTime,
            endTime: newEndTime,
            isManual: isManual,
            maxAttempt: values.noOfAttempts,
            tags: tags,
            tagsBucket: tagsWeightage.map((tag, index)=> {
                return {
                    tag: tag.label,
                    order: tagsWeightage.length - index,
                    level: tag.level,
                    weightage: (fib[last-tag.level] * (tagsWeightage.length - index) * tag.level) 
                }
            }),
            questions: questions
        }
        console.log('newTestTemplate==>', newTestTemplate);
        TestTemplateDataService.createTestTemplate(newTestTemplate)
        .then((response) => {
            console.log('saveAndExit Ret Data==>', response.data);
            nextStep();
            const path = '/all-tests';
            history.push(path);
        })
        .catch((e) => {
            console.log('error==>', e);
        });
    }

    return(
        <BasicDetailsStyle>
            <center>
                <h3>Confirm Details</h3>
                <br />
                <QuestionSelected questions={questions}/>

                <Button color='secondary' variant='contained' onClick={prevStep}>
                    Back
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button color='primary' variant='contained' onClick={onSubmit}>
                    Save and Exit
                </Button>
                </center> 
        </BasicDetailsStyle>
    )
}
export default Confirm;