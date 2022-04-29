import styled from "styled-components";
import {Link as LinkR} from 'react-router-dom';
import {Link as LinkS} from 'react-scroll';

export const FooterContainer = styled.footer`
background-color: ${ props => props.theme.primaryColor };
`

export const FooterWrap = styled.div`
padding: 3rem 1.5rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 1440px;
`

export const FooterLinksContainer = styled.div`
display: flex;
justify-content: center;

@media screen and (max-width: 820px){
  padding-top: 2rem;
}
`

export const FooterLinksWrapper = styled.div`
display: flex;
@media screen and (max-width: 820px){
  flex-direction: column;
}
`

export const FooterLinksItem = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
margin: 1rem;
text-align: left;
width: 200px;
box-sizing: border-box;
color: ${ props => props.theme.whiteColor };;

@media screen and (max-width: 420px){
  margin: 0;
  padding: 10px;
  width: 100%;
}
`

export const FooterLinksTitle = styled.h1`
font-size: 14px;
margin-bottom: 1rem;
`

export const FooterLink = styled(LinkS)`
color: ${ props => props.theme.whiteColor };;
text-decoration: none;
margin-bottom: 0.5rem;
font-size: 1rem;
font-weight: 500;

&:hover{
  color: ${ props => props.theme.secondaryColor };;
  transition: 0.3s ease-out;
}
`

export const SocialMedia = styled.section`
max-width: 1000px;
width:100%;
`

export const SocialMediaWrap = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
max-width: 1440px;
margin: 40px auto 0 auto;

@media screen and (max-width:820px){
  flex-direction: column;
}
`

export const SocialLogo = styled(LinkR)`
color:${ props => props.theme.whiteColor };;
justify-self: start;
cursor: pointer;
text-decoration: none;
font-size: 1.5rem;
display:flex;
align-items: center;
margin-bottom: 1rem;
font-weight: bold;
`

export const WebsiteRights = styled.small`
color: ${ props => props.theme.whiteColor };;
margin-bottom: 1rem;
`

export const SocialIcons = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 240px;
`

export const SocialIconLink = styled.a`
color: ${ props => props.theme.whiteColor };;
font-size: 1.5rem;
`

