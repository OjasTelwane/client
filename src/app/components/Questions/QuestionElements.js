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


export const QuestionContainer = styled.div`
    @media screen and (max-width:768px) 
    {
        padding: 60px 120px;
    }
    margin:2rem 4rem 2rem 0;
    background-color: ${ props => props.theme.formBackgroundColor };
    border-radius:19px;
    padding: 2rem 1.5rem 2rem 1.5rem;
`;
export const QuestionBody = styled.div`
    @media screen and (max-width:768px) 
    {
        padding: 60px 120px;
    }
    padding-left: 1rem;
    padding-right: 1rem;
`;
export const QuestionProgress = styled.div``;

export const QuestionForm = styled.div`
    /* margin:30px auto; */
    background-color: ${ props => props.theme.inputAreaHoverColor };
    border-radius:19px;
    height:336px;
`;

export const Title = styled.h1`
    color:${ props => props.theme.textColor };
    font-weight:500;
    font-size:1.25rem; 
    margin-left:1rem; 
`;
export const TextArea = styled.textarea`
    width:100%;
    border:2px solid ${ props => props.theme.primaryColor };
    height:200px;
    border-radius:14px;
`;
export const QuestionText = styled.div`
    font-size:2rem;
    color:${ props => props.theme.textColor };
    padding:20px;
`;
export const AddQuestionMedia = styled.div`
padding-top: 0.5rem;
`;
export const Button = styled.div`
    display:flex;
    width:100px;
    float:left;
    margin-right:20px;
    height:32px;
    justify-content:center;
    align-items:center;
    color:white;
    border-radius:10px;
    background-color:${ props => props.theme.primaryColor };
`;
export const ButtonNext = styled(LinkR)`
    display:flex;
    width:100px;
    float:right;
    margin-right:50px;
    height:40px;
    justify-content:center;
    align-items:center;
    color:white;
    background-color:${ props => props.theme.primaryColor };
    border-radius:10px;
`;

export const TagContainerRow = styled.div`
display: inline-flex;
padding-top: 1rem;
padding-bottom: 1rem;
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
margin: 0.25rem 0 0.25rem 0.25rem;
width: 964px;
`;

export const AddNewTag = styled.div`
float: right;
padding-top: 0.5rem;
padding-left: 0.75rem;
`;
