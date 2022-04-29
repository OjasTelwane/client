import React, {useState, useEffect} from 'react';
import {IconContext} from 'react-icons/lib';
import {FaBars} from 'react-icons/fa';
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavGroup, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink} from './NavbarElements';
import {animateScroll as scroll} from'react-scroll';
const Navbar = ({toggle}) => {
  const [scrollNav, setScrollNav] = useState(false);
  const onChangeNav = () => {
    if(window.scrollY>=80){
      setScrollNav(true);
    }
    else{
      setScrollNav(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onChangeNav)
  }, []);

const toggleHome = () => {
  scroll.scrollToTop();
}

  return (
    <>
    <IconContext.Provider value={{color: 'white'}}>
    <Nav scrollNav={scrollNav}>
      <NavbarContainer>
      <NavGroup>
      <NavLogo to='/' onClick={toggleHome}>IMATMI</NavLogo>
        <MobileIcon onClick={toggle}>
          <FaBars />
        </MobileIcon>
        <NavMenu>
        <NavItem>
            <NavLinks to ='home'>Home</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to ='about'
             smooth={true} duration={500} spy={true} exact='true' offset={-80}>About</NavLinks>
          </NavItem>                  
          <NavItem>
            <NavLinks to ='discover'
             smooth={true} duration={500} spy={true} exact='true' offset={-80}>Discover</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to ='services'
             smooth={true} duration={500} spy={true} exact='true' offset={-80}>Services</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to ='signup'
             smooth={true} duration={500} spy={true} exact='true' offset={-80}>SignUp</NavLinks>
          </NavItem>
        </NavMenu>
      </NavGroup>
        
        <NavBtn>
          <NavBtnLink to='/signin'>SignIn</NavBtnLink>
        </NavBtn>
      </NavbarContainer>
    </Nav>
    </IconContext.Provider>
    </>
  )
}

export default Navbar;
