import React ,{ useState , useEffect} from 'react';
import BasicDetails from './basicDetails';
import QuestionDetails from './questionDetails';
import Confirm from './confirm';
import moment from 'moment';
import { useHistory } from 'react-router';
import TagDataService from '../../core/actions/tag';
import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import {
//     FormContainer
// } from './components/testCreationElements';

import { FormContainer } from './components/testTemplateElements';

import TagWeightage from './tagWeightage';

const steps = ['Enter Test Details', 'Select Personality Traits and Questions', 'Reorder Personality Traits','Create Test'];
const TestTemplate = () => {
    const [step, setStep] = useState(1);
    const [values, setValues] = useState({
        name: '',
        description: '',
        duration: 30,
        noOfAttempts: 3
    });

    const history = useHistory();
    const [tags, setTags] = useState([]);
    const [tagsWeightage, setTagsWeightage] = useState([]);
    const [testDate, handleTestDateChange] = useState(moment());
    const [startTime, handleStartTimeChange] = useState(moment());
    const [endTime, handleEndTimeChange] = useState(moment());
    const [isManual, handleCheckbox] = useState(false);
    const [questions, setSelectedQuestion] = useState([]);
    const [tagList, setTagList] = useState([]);

    useEffect(() => {
        loadTagList();
    }, []);

    console.log(startTime,endTime);
    const handleSelection = (e) => {
        setSelectedQuestion(e.value);
    }
    const handleTagChanges = (event) => {
        console.log('handleTagChanges==>', event.target.value);
        setTags(event.target.value);
    }

    const handleTagsWeightageChanges = (list) => {
        setTagsWeightage(list);
        console.log('handleTagsWeightageChanges==>', list);
    }

    const handleTestDate = (date) => {
        handleTestDateChange(date);
    };
    const handleStartTime = (date) => {
        handleStartTimeChange(date);
    };
    const handleEndTime = (date) => {
        handleEndTimeChange(date);
    };
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleCheckboxChange = (e) => {
        handleCheckbox(e.target.checked);
    };
    console.log(isManual);
    const finalStep = () => {
        console.log(values.name,values.description,values.duration,isManual);
        if(isManual){
            setTags([]); 
            console.log(questions);
        }
        else{
            setSelectedQuestion([]);
            console.log(tags);
        }
    }
    const nextStep = () => {
        setStep((step) => step + 1);
    };
    const prevStep = () => {
        setStep((step) => step - 1);
    };
    console.log('step==>', step);
    const exitTestCreation = () => {
        history.goBack();
    }
    

    const loadTagList = async() => {
        const response = await TagDataService.getAllTags();
        console.log('tagWeightage response.data===>', response.data);
        if(response.data) {
            const list = response.data;
            const tagList = list.map((t) => {
                return { value: t.tag, label: t.tag };
            });
            setTagList(tagList);
        }    
    }

    return(
        <>
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={step-1}>
                {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                    <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
                
            </Stepper>    
        </Box>
        <FormContainer>
        {(() => {
            switch (step) {
                case 1:
                    return (
                    <BasicDetails
                        values={values}
                        handleChange={handleChange}
                        nextStep={nextStep}
                        testDate={testDate}
                        handleTestDate={handleTestDate}
                        startTime={startTime}
                        handleStartTime={handleStartTime}
                        endTime={endTime}
                        handleEndTime={handleEndTime}
                    />
                    );
                case 2:
                    return (
                        <QuestionDetails
                            nextStep={nextStep}
                            prevStep={prevStep}
                            tagList={tagList}
                            tags={tags}
                            handleTagChanges={handleTagChanges}
                            isManual={isManual}
                            handleCheckboxChange={handleCheckboxChange}
                            selectedQuestions={questions} 
                            handleSelection={handleSelection}
                        />
                    );
                case 3:
                    return (
                            <TagWeightage
                                nextStep={nextStep}
                                prevStep={prevStep}
                                tagList={tagList}
                                tags={tags}
                                tagsWeightage={tagsWeightage}
                                handleTagsWeightageChanges={handleTagsWeightageChanges}
                            />
                    );
                case 4:
                    return (
                        <Confirm
                            nextStep={finalStep}
                            prevStep={prevStep}
                            values={values}
                            testDate={testDate}
                            startTime={startTime}
                            endTime={endTime}
                            isManual={isManual}
                            tags={tags}
                            tagsWeightage={tagsWeightage}
                            questions={questions}
                        />
                    );
                case 5:
                    return(
                        <>
                        <center>
                            Test Created Successfully
                        </center>
                        </>
                    );
                }
            })()}
            </FormContainer>
        </>
    )
}

export default TestTemplate;