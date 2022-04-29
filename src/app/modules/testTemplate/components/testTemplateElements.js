import styled from 'styled-components';

export const CompanyTitleContainer = styled.div`
  height: 100px;
  padding: 2rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  margin-top: 2rem;
  margin-right: 4rem;
  margin-left: 2rem;
`;

export const CompanyLogo = styled.div``;

export const CompanyTitle = styled.div`
  font-size: 2rem;
`;

export const FormContainer = styled.div`
  /* margin: 1rem auto; */
  background-color: ${(props) => props.theme.secondaryColor};
  border-radius: 10px;
  margin: 1rem 4rem 1rem 1rem;
  padding: 1rem;
  /* padding-bottom: 2rem; */
  height: fit-content;
`;

export const BasicDetailsStyle = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 96%;
  background-color: ${(props) => props.theme.white};
  padding: 2rem;
  padding-bottom: 4rem;
`;

export const TitleField = styled.div`
  color: #000;
  font-size: 18px;
  font-weight:600;
`;

export const Button = styled.button`
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.primaryColor};
  border-radius: 8px;
  padding: 7px 10px;
  width: 6rem;
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

export const ButtonIconDanger = styled.div`
display: flex;
flex-direction: row;
color: ${(props) => props.theme.dangerColor};
  &:hover {
  color: ${ props => props.theme.white};
}
`;

export const DangerButtonSml = styled.button`
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.dangerColor};
  border-radius: 8px;
  padding: 4px;
  width: 2rem;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin: 0 0.5rem 0.25rem 0.25rem;
  &:hover {
  background: ${ props => props.theme.dangerColor};
  color: ${ props => props.theme.white};
}
@media screen and (max-width: 768px){
  width: fit-content
}
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

export const QuestionAddNewTag = styled.div`
  float: right;
  padding-left: 0.8rem;
  margin-right: 0;
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

export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  padding: 0.25rem 0rem;
`;