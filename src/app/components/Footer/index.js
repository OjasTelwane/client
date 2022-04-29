import React from 'react'
import { FaFacebook, FaLinkedin, FaSnapchat, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FooterContainer, FooterLink, FooterLinksContainer, FooterLinksItem, FooterLinksTitle, FooterLinksWrapper, 
  FooterWrap, SocialMedia, SocialMediaWrap,SocialLogo, WebsiteRights, SocialIcons, SocialIconLink } from './FooterElements';
import { animateScroll as scroll } from 'react-scroll';
const Footer = () => {

  const toggleHome = () => {
    scroll.scrollToTop();
  }

  return (
      <FooterContainer>
        <FooterWrap>
          <FooterLinksContainer>
            <FooterLinksWrapper>
              <FooterLinksItem>
                <FooterLinksTitle>IMATMI</FooterLinksTitle>
                  <FooterLink to='/home'>Home</FooterLink>
                  <FooterLink to='/about'>About</FooterLink>
                  <FooterLink to='/services'>Services</FooterLink>                  
              </FooterLinksItem>
              <FooterLinksItem>
                <FooterLinksTitle></FooterLinksTitle>                  
                  <FooterLink to='/contact'>Contact</FooterLink>
                  <FooterLink to='/signup'>Sign Up</FooterLink>
                  <FooterLink to='/signin'>Sign In</FooterLink>
              </FooterLinksItem>
            </FooterLinksWrapper>
          </FooterLinksContainer> 
<SocialMedia>
<SocialMediaWrap>
<SocialLogo to='/' onClick={toggleHome}>
            IMATMI
          </SocialLogo>
          <WebsiteRights>
              IMATMI © {new Date().getFullYear() } All Rights reserved.
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLink href='/' target='_blank' aria-label='Facebook'>
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink href='/' target='_blank' aria-label='Twitter'>
                <FaTwitter />
              </SocialIconLink>
              <SocialIconLink href='/' target='_blank' aria-label='Snapchat'>
                <FaSnapchat />
              </SocialIconLink>
              <SocialIconLink href='/' target='_blank' aria-label='YouTube'>
                <FaYoutube />
              </SocialIconLink>
              <SocialIconLink href='/' target='_blank' aria-label='Linkedin'>
                <FaLinkedin />
              </SocialIconLink>
            </SocialIcons>
</SocialMediaWrap>
</SocialMedia>
          
        </FooterWrap>
      </FooterContainer>
  )
}

export default Footer
