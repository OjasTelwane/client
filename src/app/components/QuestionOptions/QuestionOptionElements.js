import styled from "styled-components";
import {Link as LinkR} from 'react-router-dom';

export const CompanyTitleContainer = styled.div`
height: 100px;
padding: 2rem;
border: 1px solid ${ props => props.theme.primaryColor };
border-radius: 19px;
margin-top: 2rem;
margin-right: 4rem;
`;

export const CompanyLogo = styled.div`
`;

export const CompanyTitle = styled.div`
font-size: 2rem;
`;

export const QuestionOptionForm= styled.div`
    /* @media screen and (max-width:768px) 
    {
        padding: 60px 120px;
    } */
    margin:2rem auto;
    background-color: ${ props => props.theme.formBackgroundColor };
    border-radius:1.25rem;
    margin:2rem 4rem 2rem 0;
    padding-top: 2rem;
    padding-bottom: 2rem;
`;
export const QuestionContainer = styled.div`
    margin-left:1rem;
    margin-right:1rem;
    margin-top:0.5rem;
`;
export const QuestionTitleRow = styled.div`
    
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
`;
export const QuestionTextContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left : 1.5rem;
    padding-right : 1rem;
`;
export const QuestionTextArea = styled.textarea`
    width:100%;
    /* margin: 0 0 0 20px; */
    border:2px solid ${ props => props.theme.primaryColor };
    height:200px;
    border-radius:14px;
    
`;


// export const TextArea = styled.p`
//     font-size:2rem;
//     color:${ props => props.theme.textColor };
//     padding:20px 0 20px 20px;
// `;
export const Title = styled.h1`
    color:${ props => props.theme.textColor };
    font-weight:500;
    font-size:20px;
    margin-left:30px; 
`;

export const QuestionTagContainerRow = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
padding-top: 1rem;
margin-left: 1rem; 
margin-right: 1rem; 

`;

export const QuestionTagsSelect = styled.div`
margin: 0.25rem;
width: 100%;
`;

export const QuestionAddNewTag = styled.div`
float: right;
padding-left: 0.8rem;
margin-right: 0;
`;

export const OptionWrapContainer = styled.div`
    margin : 0 20px;
`;
export const OptionContainer = styled.div`
    margin: 10px 20px;
    border : 1px solid ${ props => props.theme.primaryColor };
    border-radius: 15px;
`;
export const OptionTitleRow = styled.div`
    background-color:${ props => props.theme.primaryColor };
    border-radius:10px;
    margin: 10px;
`;
export const OptionTitle = styled.h1`
    color:${ props => props.theme.whiteColor };
    font-weight:500;
    font-size:15px;
    padding:4px; 
    margin-top:8px;
    margin-bottom:8px;
    margin-left:30px; 
`;
export const OptionContainerRow = styled.div``;
export const OptionTextContainer = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
`;
export const OptionTextArea = styled.textarea`
    width: 88%;
    margin: 0 24px;
    border:2px solid ${ props => props.theme.primaryColor };
    height:150px;
    border-radius:14px;
`;
export const BtnContainer = styled.div`
    float:right;
    justify-content: center;
    align-items: center;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
`;
export const Button = styled.div`
    padding: 4px;
    width:92px;
    height:32px;
    justify-content:center;
    align-items:center;
    color:${ props => props.theme.whiteColor };
    border-radius:10px;
    background-color:${ props => props.theme.primaryColor };
    margin : 8px 0;
    margin-right: 10px;
    
`;

export const TagsContainer = styled.div`    
    display: flex;
justify-content: space-between;
flex-direction: row;
margin: 4px 2px 4px 16px;
`;

export const TagContainerRow = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
width: 100%;
padding-top: 1rem;
`;



export const Tags = styled.div`
font-size: 1rem;
padding: 8px;
float: left;
max-width: 4rem;
padding-top: 1rem;
padding-right: 0.6rem;
`;

export const TagsSelect = styled.div`
margin: 0.25rem;
width: 100%;
`;

export const AddNewTag = styled.div`
float: right;
padding-left: 2rem;
margin-right: 0;
`;

// export const Select = styled.div`
// border-radius: 3px;
// `;

