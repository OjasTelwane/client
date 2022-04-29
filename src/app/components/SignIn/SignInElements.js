import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Container = styled.div`
min-height: 692px; 
overflow: hidden;
background: ${ props => props.theme.blackColor };


`

export const FormWrap = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
margin-top: 140px;

 
@media screen and (max-width: 400px){
  height:80%
}
`

export const FormContent = styled.div`
height:100%;
display: flex;
flex-direction: column;
justify-content: center;

@media screen and (max-width: 480px){
  padding: 10px;
}
`

 export const Form = styled.form`
background: #D6F7FA;
max-width: 500px;
height: auto;
width: 100%;
z-index: 1;
display: grid;
margin: 0 auto;
padding: 80px, 32px;
border-radius: 14px;
box-shadow: 0 1px 3px rgba(0,0,0,0.9);

@media screen and (max-width: 400px){
  padding: 2rem 2rem;
}
 `

 export const FormH1= styled.h1`
margin-bottom: 2.5rem;
padding-top: 50px;
color: #${ props => props.theme.textColor };
font-size: 1.5rem;
font-weight:400;
text-align: center;
 `

 export const FormLabel = styled.label`
margin: 0 2rem;
font-size: 14px;
color: ${ props => props.theme.textColor };
 `

 export const FormInput = styled.input`
padding: 1rem 1rem;
margin: 2rem;
border: none;
border-radius: 4px;
`

export const FormButton = styled.button`
background: ${ props => props.theme.primaryColor };
padding: 1rem 0;
border: none;
border-radius: 4px;
color: ${ props => props.theme.whiteColor };
font-size: 1.25rem;
cursor: pointer;
margin: 0 2rem;
`

export const Text = styled.span`
text-align: center;
margin-top: 1.5rem;
color: #${ props => props.theme.textColor };
font-size: 14px;
`