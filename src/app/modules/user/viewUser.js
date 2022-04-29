import React, {useState, useEffect} from 'react'
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router';
import Chip from '@material-ui/core/Chip';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import UserDataService from '../../core/actions/user';
import {
  Row,
  Button,
  TagList, 
  IsVerified, 
  CheckBoxLabel, 
  TagLabel
  } from './components/UserElements';
import PreviewMedia from './previewMedia';

const ViewUser = () => {
  const history = useHistory();
    const match = useRouteMatch();
    const { id } = match.params;
    const [user, setUser] = useState(undefined);
    useEffect(() => {
      UserDataService.getUser(id)
        .then( (response) => {
          setUser(response.data);
          console.log(response.data);
      });
    }, []);

  const backtoUserList = () => {
    history.goBack();
  }

  return (
    <>
      {user !== undefined && 
      <>
      <Container>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', fontFamily:'Poppins Roboto sans-serf !important' }}>
        {user.userType === 0 && <h8><strong><i><p>User Type:&nbsp;&nbsp;&nbsp;Single Correct Answer</p></i></strong></h8>}
        {user.userType === 1 && <h8><strong><i><p>User Type:&nbsp;&nbsp;&nbsp;Multiple Correct Answer</p></i></strong></h8>}
        {user.userType === 2 && <h8><strong><i><p>User Type:&nbsp;&nbsp;&nbsp;Reorder Type User</p></i></strong></h8>}
        {user.userType === 3 && <h8><strong><i><p>User Type:&nbsp;&nbsp;&nbsp;Evaluation Type User</p></i></strong></h8>}
        <div>User : </div>
        <TextareaAutosize
            defaultValue={user.text}
            disabled
            style={{width : '100%', margin:'auto', fontSize:'16px', border:'none', bgcolor:'white',
                lineHeight:'16px', lineBreak:'10px', padding:'12px'
          }}
        />
      <PreviewMedia files = {user.files} />
        <TagLabel>Tags: </TagLabel>
        <TagList>
        {user.tags && user.tags.map((tag, j) => (
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
          {user &&
            user.options &&
            user.options.map((option, j) => (
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
          <Button onClick={backtoUserList}>
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

export default ViewUser;