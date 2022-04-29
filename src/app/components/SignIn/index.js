import React from 'react'
import {Container, Form, FormButton, FormContent, FormH1, FormInput, FormWrap, FormLabel, Text} from './SignInElements'

const SignIn = () => {
  return (
    <>
      <Container>
        <FormWrap>         
          <FormContent>
            <Form action='#'>
              <FormH1>Sign in to your Account</FormH1>
              <FormLabel htmlFor='for'>Email</FormLabel>
              <FormInput type='email' required />
              <FormLabel htmlFor='for'>Password</FormLabel>
              <FormInput type='password' required />              
              <FormButton type='submit'>Continue</FormButton>
              <Text>Forgot Password</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  )
}

export default SignIn
