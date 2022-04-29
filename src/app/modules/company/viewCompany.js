import React, {useState, useEffect} from 'react'
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router';
import Chip from '@material-ui/core/Chip';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import CompanyDataService from '../../core/actions/company';
import {
  CompanyTitleContainer,
  CompanyTitle,
  CompanyLogo,
  Row,
  Button,
  TagList, 
  IsVerified, 
  CheckBoxLabel, 
  TagLabel
  } from './components/CompanyElements';
import PreviewMedia from './previewMedia';

const ViewCompany = () => {
  const history = useHistory();
    const match = useRouteMatch();
    const { id } = match.params;
    const [company, setCompany] = useState(undefined);
    useEffect(() => {
      CompanyDataService.getCompany(id)
        .then( (response) => {
          setCompany(response.data);
          console.log(response.data);
      });
    }, []);

  const backtoCompanyList = () => {
    history.goBack();
  }

  return (
    <>
      {company !== undefined && 
      <>
      <Container>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', fontFamily:'Poppins Roboto sans-serf !important' }}>
        {company.companyType === 0 && <h8><strong><i><p>Company Type:&nbsp;&nbsp;&nbsp;Single Correct Answer</p></i></strong></h8>}
        {company.companyType === 1 && <h8><strong><i><p>Company Type:&nbsp;&nbsp;&nbsp;Multiple Correct Answer</p></i></strong></h8>}
        {company.companyType === 2 && <h8><strong><i><p>Company Type:&nbsp;&nbsp;&nbsp;Reorder Type Company</p></i></strong></h8>}
        {company.companyType === 3 && <h8><strong><i><p>Company Type:&nbsp;&nbsp;&nbsp;Evaluation Type Company</p></i></strong></h8>}
        <div>Company : </div>
        <TextareaAutosize
            defaultValue={company.text}
            disabled
            style={{width : '100%', margin:'auto', fontSize:'16px', border:'none', bgcolor:'white',
                lineHeight:'16px', lineBreak:'10px', padding:'12px'
          }}
        />
      <PreviewMedia files = {company.files} />
        <TagLabel>Tags: </TagLabel>
        <TagList>
        {company.tags && company.tags.map((tag, j) => (
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
          {company &&
            company.options &&
            company.options.map((option, j) => (
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
          <Button onClick={backtoCompanyList}>
            Back
          </Button>
          </Row>
        </Box>
        </Container>
      </>
      }
    </>
  )
}

export default ViewCompany;