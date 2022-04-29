import styled from 'styled-components';

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

export const CompanyListForm = styled.div`
  background-color: ${(props) => props.theme.secondaryColor};
  border-radius: 10px;
  padding: 1rem;
  height: fit-content;
`;

export const DataTableCss = styled.div`
  width:88vw;
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

export const SearchItem = styled.div`
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  padding-top: 1rem;
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.white};
`;

export const Input = styled.input`
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.white};
  border-radius: 10px;
  &:hover{
    background-color: ${(props) => props.theme.inputAreaHoverColor};
  }
  
`;

export const CompanyListTitle = styled.p`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  font-size: 14px;
  line-height: 16px;
  padding-left: 2rem;
  font-weight: 500;
  color: ${(props) => props.theme.textColor};
  margin-left: 1rem;
`;

export const CompanyArea = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding-bottom: 0.5rem;
  background-color: white;
`;

export const CompanyTextArea = styled.textarea`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  width: 88%;
  margin: 0 0 0 24px;
  border: 0;
  height: 8rem;
  padding: 1rem;
  box-shadow: 0;
  &:focus{
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.primaryColor};
  }
  &:hover{
    background-color: ${(props) => props.theme.inputAreaHoverColor};
  }
`;

export const CompanyFile = styled.div`
  padding: 1rem;
  margin-top: 10px;
  display:flex;
  flex-direction:row;
  justify-content:center;
`;

export const ImageGrid = styled.div`
  max-width: 100%;
  height: auto;
  width: 400px;
  object-fit: contain;
`;

export const TagList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap : wrap;
  column-gap : 10px
`;

export const CompanyListArea = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const ListItem = styled.li`
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  border: 1px solid ${(props) => props.theme.white};
  border-radius: 10px;
  padding-top: 1rem;
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.white};

  :first-of-type {
    border-radius: 10px;
  }

  :last-of-type {
    border-radius: 10px;
  }

  .active {
    background-color: white;
  }

  .selected {
    background-color: white;
  }
`;

export const CompanyNo = styled.p`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  font-size: 14px;
  line-height: 16px;
  padding: 1rem 0.5rem 0.5rem 0.5rem;
  margin-left: 1rem;
  float: left;
  max-width: 4rem;
  padding-top: 1rem;
`;

export const CompanyButtonContainer = styled.div`
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const ButtonSecondary = styled.button`
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

export const TagsRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  padding: 0.25rem 0rem;
`;

export const Column1 = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0;
  padding: 0.25rem 0.25rem 0.25rem 0.75rem;
`;

export const RowHeading = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  margin-bottom: 0.25rem;
  padding: 0.25rem 0.25rem 0.25rem 0.75rem;
  border-radius: 10px;
  background-color: ${(props) => props.theme.formBackgroundColor};
`;

export const Label = styled.p`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  font-size: 14px;
  line-height: 16px;
  text-align: left;
  font-size: 1rem;
  padding: 0px;
  margin: 0px;
  float: left;
  color: ${(props) => props.theme.textColor};
`;

export const LabelBlack = styled.p`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  font-size: 14px;
  line-height: 16px;
  text-align: left;
  padding: 0px;
  margin: 0px;
  float: left;
  color: ${(props) => props.theme.textColor};
`;

export const TagsEditButton = styled.div`
  padding: 0.25rem 0.5rem;
  width: 128px;
  height: 32px;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 10px;
  background-color: ${(props) => props.theme.primaryColor};
  margin-top: 6px;
  margin-left: 0.5rem;
`;

// add_company starts here

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

export const CompanyOptionForm = styled.div`
  background-color: ${(props) => props.theme.inputAreaHoverColor};
  border-radius: 10px;
  margin: 2rem 4rem 2rem 2rem; 
  padding-top: 2rem;
  padding-bottom: 2rem;
`;
export const CompanyContainer = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 0.5rem;
  background-color: ${(props) => props.theme.white};
  border-radius : 10px;
`;

export const CompanyTitleRow = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
`;

export const IsActive = styled.input`
  width: 24px;
  height: 24px;
  margin-left: 1.5rem;
  &:hover{
    background-color: ${(props) => props.theme.inputAreaHoverColor};
  }
`;

export const IsVerified = styled.input`
  width: 24px;
  height: 24px;
&:hover{
    background-color: ${(props) => props.theme.inputAreaHoverColor};
  }
`;

export const CheckBox = styled.input`
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

export const CompanyTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 1.5rem;
  padding-right: 1rem;
  width: 100%;
  background-color: azure;
`;

export const Title = styled.h1`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
  font-size: 20px;
  margin-left: 30px;
  padding-top: 1rem;
`;

export const SelectCompanyType = styled.div`
padding-left: 1.5rem;
padding-top: 0.25rem;
padding-bottom: 0.25rem;
`;

export const CompanyTagContainerRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

export const CompanyTagsSelect = styled.input`
  margin: 0.25rem;
  width: 100%;
  &:hover{
    background-color: ${(props) => props.theme.inputAreaHoverColor};
  }
`;

export const CompanyAddNewTag = styled.div`
  float: right;
  padding-left: 0.8rem;
  margin-right: 0;
`;

export const OptionWrapContainer = styled.div`
  margin: 0 20px;
`;
export const OptionContainer = styled.div`
  margin: 10px 20px;
  border-radius: 10px;
`;
export const OptionTitleRow = styled.div`
  background-color: ${(props) => props.theme.formBackgroundColor};
  border-radius: 10px;
  margin: 10px;
`;
export const OptionTitle = styled.h1`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
  font-size: 15px;
  padding: 4px;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 30px;
`;
export const OptionContainerRow = styled.div``;
export const OptionTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const EditTextArea = styled.textarea`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  font-size: 14px;
  line-height: 16px;
  width: 100%;
  margin: 0 16px 0 24px;
  border:0;
  height: 144px;
  padding: 16px;
  box-shadow: 0;
  &:focus{
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.primaryColor};
  }
  background-color: ${(props) => props.theme.inputAreaHoverColor};
`;

export const ShowTextArea = styled.text`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  font-size: 14px;
  line-height: 16px;
  width: 88%;
  margin: 0 0 0 24px;
  border:0;
  border-bottom: 2px solid ${(props) => props.theme.primaryColor};
  height: 192px;
  padding: 16px;
  box-shadow: 0;
  background-color: ${(props) => props.theme.inputAreaHoverColor};
`;

export const OptionTextArea = styled.textarea`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  font-size: 14px;
  line-height: 16px;
  width: 88%;
  margin: 0 0 0 24px;
  border:0;
  border-bottom: 2px solid ${(props) => props.theme.primaryColor};
  height: 190px;
  padding: 16px;
  box-shadow: 0;
  &:focus{
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.primaryColor};
  }
  background-color: ${(props) => props.theme.inputAreaHoverColor};
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const BtnContainer = styled.div`
  float: right;
  justify-content: center;
  width: fit-content;
  align-items: center;
  margin-right: 1rem;
  @media screen and (max-width: 768px){
  width: 40px;
}
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

export const TagsSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  /* padding-top: 1rem; */
`;

export const WeightageSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 30%;
  padding-right: 0.5rem;
`;

export const Tags = styled.div`
  font-size: 1rem;
  padding: 8px;
  float: left;
  max-width: 4rem;
  padding-top: 1rem;
`;

export const OptionWeightage = styled.div`
  font-size: 1rem;
  padding: 8px;
  float: left;
  width: fit-content;
  padding-top: 1rem;
`;

export const TagsSelect = styled.input`
  margin: 0.25rem;
  width: 100%;
  border: 2px solid ${(props) => props.theme.primaryColor};
  &:hover{
    background-color: ${(props) => props.theme.inputAreaHoverColor};
  }
`;

export const OptionWeightageInput = styled.input`
  margin: 0.25rem;
  width: 4rem;
  border: 2px solid ${(props) => props.theme.primaryColor};
  &:hover{
    background-color: ${(props) => props.theme.inputAreaHoverColor};
  }
`;

export const TextInput = styled.input`
  margin: 0.25rem;
  width: 10rem;
  border: 2px solid ${(props) => props.theme.primaryColor};
  &:hover{
    background-color: ${(props) => props.theme.inputAreaHoverColor};
  }
`;

export const AddNewTag = styled.div`
  float: right;
  padding-left: 0rem;
  margin-right: 0.25rem;
`;

export const AddMoreAnswerSet = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 94%;
  margin-left: 2rem;
  margin-right: 2rem;
`;

export const CompanyOptionSubmitButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  width: 94%;
  margin-left: 2rem;
  margin-right: 2rem;
`;

export const AddCompany = styled.div`
  float: right;
  margin-left: auto;
`;

export const MultiSelectContainer = styled.div`
  width: 100%;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  margin-right: 0.5rem;
`;

// add.option.js Starts here

export const MediaNameTypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 0.25rem;
`;

export const MediaTypeContainer = styled.div`
width: 25%;
`;

export const MediaNameContainer = styled.div`
width: 75%;
`;

export const OptionRow = styled.div`
display : flex;
flex-direction: row;
width: 100%;
`;

export const OptionSelect = styled.div`
width: 5%;
justify-content: center;
padding-left: 1rem;
padding-top: 0.25rem;
padding-bottom: 0.25rem;
`;

export const TestCompanyTextArea = styled.text`
  font-family: 'Poppins', 'Roboto', sans-serf !important;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  width: 100%;
  margin: 0;
  border: 0;
  border-bottom: 1px solid ${(props) => props.theme.formBackgroundColor};
  height: 6rem;
  padding: 1rem;
  box-shadow: 0;
  &:focus{
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.primaryColor};
  }
  background-color: ${(props) => props.theme.inputAreaHoverColor};
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
