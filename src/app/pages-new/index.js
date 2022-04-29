import React, {useState} from 'react'
// import Question from '../modules/question/question';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import { homeObjOne, homeObjThree, homeObjTwo } from '../components/InfoSection/Data';
import Services from '../components/Services';
import Question from '../components/Questions/index';
import Options from '../components/QuestionOptions';
import SignInPage from './signin';
import QuestionList from '../components/QuestionList';
import Footer from '../components/Footer';

// import QuestionTable from '../components/QuestionTable';
// import QuestionList from '../modules/questionList/questionList';
// import SignIn from '../components/SignIn'; 


const Home = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>           
      <Sidebar isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle} />    
      <HeroSection />      
      {/* <SignIn /> */}
      <InfoSection {...homeObjOne}/>      
      <InfoSection {...homeObjTwo}/>  
      <Services/>    
      <InfoSection {...homeObjThree}/>
      {/* <Question/>
      <Options/>
      <QuestionList/> */}
      
      {/* <QuestionTable/> */}
      
      <SignInPage/>
      {/* <SignUpSection/> */}
      <Footer />
    </>
  )
}

export default Home
