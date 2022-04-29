import styled from 'styled-components'

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

export const QuestionListContainer = styled.div`

`;

export const QuestionListForm = styled.div`
    margin:2rem auto;
    background-color: ${ props => props.theme.formBackgroundColor };
    border-radius:1.25rem;
    margin:2rem 4rem 2rem 0;
    padding-top: 2rem;
    padding-bottom: 2rem;
    height:fit-content; 
`;

export const QuestionListTitleRow = styled.div`
padding-left: 2rem;
`;

export const QuestionListTitle = styled.div`
    color:${ props => props.theme.textColor };
    font-weight:500;
    font-size:1.25rem; 
    margin-left:1rem; 
`;

export const QuestionListArea = styled.div`
padding-left: 1rem;
padding-right: 1rem;
`;

export const QuestionContainer = styled.div``;

export const QuestionRow = styled.div`
padding-left: 0;
padding-right:0.75rem;
border : 1px solid ${ props => props.theme.primaryColor };
border-radius: 15px;
padding-top: 1rem;
margin: 16px 16px;
`;

export const QuestionNo = styled.p`
font-size: 1rem;
padding: 1rem 0.5rem 0.5rem 0.5rem;
margin-left: 1rem;
float: left;
max-width: 4rem;
padding-top: 1rem;
`;

export const QuestionArea = styled.div`
display: flex;
justify-content: center;
flex-direction: row;
padding-bottom: 0.5rem;

`;

export const QuestionTextArea = styled.textarea`
    width:100%;
    /* float: right; */
    margin: 0 0 0 20px;
    border:2px solid ${ props => props.theme.primaryColor };
    height:150px;
    border-radius:14px;
`;

export const QuestionButtonContainer = styled.div`
    float:right;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
`;
export const Button = styled.div`
    padding: 4px;
    width:128px;
    height:32px;
    justify-content:center;
    align-items:center;
    color:white;
    border-radius:10px;
    background-color:${ props => props.theme.primaryColor };
    
    margin-left: 11px;
    
`;

export const TagsTextArea = styled.input`
    font-size:2rem;
    color:${ props => props.theme.textColor };
    padding:1rem 0 1rem 1rem;
    margin: 0.25rem 1rem 0.25rem 0.25rem;
    width: 100%;
    border:2px solid ${ props => props.theme.primaryColor }; 
    border-radius:14px;
    height: 2rem;
`;

export const TagsRow = styled.div`
display: flex;
justify-content: center;
flex-direction: row;
`;

export const Tags = styled.p`
font-size: 1rem;
padding: 8px;
margin-left: 1rem;
float: left;
max-width: 4rem;
padding-top: 1rem;
padding-right: 0.6rem;
`;

export const TagsEditButton = styled.div`
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

    width:128px;
    height:32px;
    justify-content:center;
    align-items:center;
    color:white;
    border-radius:10px;
    background-color:${ props => props.theme.primaryColor };
    margin-top: 6px;
    margin-left: 0.5rem;
`;



// // bellow this
// export const QuestionTitleRow = styled.div`
//     margin-left: 0.5rem;
//     margin-right: 0.5rem;
//     margin-top: 0.5rem;
// `;
// export const QuestionTextContainer = styled.div`
//     padding-left : 2rem;
//     padding-right : 2rem;
// `;


// export const Title = styled.h1`
//     color:${ props => props.theme.textColor };
//     font-weight:500;
//     font-size:20px;
//     /* padding:15px; 
//     margin-top:8px;
//     margin-bottom:8px; */
//     margin-left:30px; 
// `;
// export const OptionWrapContainer = styled.div`
//     margin : 0 20px;
// `;


// export const OptionTitleRow = styled.div`
//     background-color:${ props => props.theme.primaryColor };
//     border-radius:10px;
//     margin: 10px;
// `;
// export const OptionTitle = styled.h1`
//     color:white;
//     font-weight:500;
//     font-size:15px;
//     padding:4px; 
//     margin-top:8px;
//     margin-bottom:8px;
//     margin-left:30px; 
// `;
// export const OptionContainerRow = styled.div``;
// export const OptionTextContainer = styled.div`
// `;
// export const OptionTextArea = styled.textarea`
//     width: 928px;
//     margin: 0 20px;
//     border:2px solid ${ props => props.theme.primaryColor };
//     height:150px;
//     border-radius:14px;
// `;

// export const TagsContainer = styled.div`
//     margin: 5px 15px;
// `;
// export const TagContainerRow = styled.div`
// display: inline-flex;
// `;

// export const TagsSelect = styled.div`
// margin: 0.25rem 1.9rem 0.25rem 0.25rem;
// width: 928px;
// `;

// export const AddNewTag = styled.div`
// float: right;
// `;

// // export const Select = styled.div`
// // border-radius: 3px;
// // `;






