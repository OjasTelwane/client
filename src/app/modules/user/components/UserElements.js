import styled, { createGlobalStyle } from 'styled-components';

// const GlobalStyle = createGlobalStyle`
//   body {
//     font-family: 'Poppins', 'Roboto', sans-serif !important;
//     font-size: 14px;
//     line-height: 16px;
//   }
// `

export const UserTitleRow = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
`;

export const Title = styled.h1`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
  font-size: 20px;
  margin-left: 30px;
  padding-top: 1rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  padding: 0.25rem 0rem;
`;

export const UserOptionForm = styled.div`
  background-color: ${(props) => props.theme.inputAreaHoverColor};
  border-radius: 10px;
  margin: 2rem 4rem 2rem 2rem; 
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export const UserOptionSubmitButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  width: 94%;
  margin-left: 2rem;
  margin-right: 2rem;
`;

export const ButtonPrimary1 = styled.button`
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.primaryColor};
  border-radius: 8px;
  padding: 4px 10px;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.25rem;
  margin-left: 0.75rem;
  width: fit-content;
  &:hover {
  background: ${ props => props.theme.primaryColor};
  color: ${ props => props.theme.white};
}
@media screen and (max-width: 780px){
  width: fit-content
}
`;

export const ButtonDanger = styled.button`
  border: 1px solid ${(props) => props.theme.dangerColor};
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.dangerColor};
  border-radius: 8px;
  padding: 4px 10px;
  width: fit-content;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.25rem;
  margin-left: 11px;
  &:hover {
  background: ${ props => props.theme.dangerColor};
  color: ${ props => props.theme.white};
}
@media screen and (max-width: 780px){
  width: fit-content
}
`;

export const UserListForm = styled.div`
  background-color: ${(props) => props.theme.secondaryColor};
  border-radius: 10px;
  padding: 1rem;
  height: fit-content;
`;

export const Heading = styled.p`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  font-size: 2rem;
  line-height: 3rem;
  justify-content: center;
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
  margin: 0 auto 0 auto;
`;


export const ButtonSml = styled.button`
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.primaryColor};
  border-radius: 8px;
  padding: 4px;
  width: 2rem;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin: 0 0.5rem 0.25rem 0.25rem;
  &:hover {
  background: ${ props => props.theme.primaryColor};
  color: ${ props => props.theme.white};
}
@media screen and (max-width: 768px){
  width: fit-content
}
`;

export const ButtonIcon = styled.div`
display: flex;
flex-direction: row;
color: ${(props) => props.theme.primaryColor};
  &:hover {
  color: ${ props => props.theme.white};
}
`;

export const ButtonPrimary = styled.button`
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.primaryColor};
  border-radius: 8px;
  padding: 4px 10px;
  width: fit-content;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.25rem;
  margin-left: 11px;
  &:hover {
  background: ${ props => props.theme.primaryColor};
  color: ${ props => props.theme.white};
}
@media screen and (max-width: 780px){
  width: fit-content
}
`;

export const AddUser = styled.div`
  float: right;
  margin-left: auto;
`;

export const DataTableCss = styled.div`
  width:88vw;
`;

export const Button = styled.button`
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.primaryColor};
  border-radius: 8px;
  padding: 7px 10px;
  width: fit-content;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin: 0 0.5rem 0.25rem 0.25rem;
  &:hover {
  background: ${ props => props.theme.primaryColor};
  color: ${ props => props.theme.white};
}
@media screen and (max-width: 768px){
  width: fit-content;
  padding: 4px;
}
`;

export const TagList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap : wrap;
  column-gap : 10px
`;

export const IsVerified = styled.input`
  width: 24px;
  height: 24px;
&:hover{
    background-color: ${(props) => props.theme.inputAreaHoverColor};
  }
`;

export const CheckBoxLabel = styled.label`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  font-size: 14px;
  line-height: 16px;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
`;

export const TagLabel = styled.h3`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  font-size: 16px;
  line-height: 16px;
  text-align: left;
  font-size: 1rem;
  padding-left: 4rem;
  margin-right: 20px;
  float: left;
  color: ${(props) => props.theme.textColor};
`;
