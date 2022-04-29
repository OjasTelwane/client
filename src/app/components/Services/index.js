import React from 'react'
import { ServicesContainer, ServicesWrapper, ServicesCard, ServicesH1, ServicesH2, ServicesP, ServicesIcon } from './ServicesElements'
import Icon1 from '../../../assets/images/svg-1_Report.svg';
import Icon2 from '../../../assets/images/svg-2_exams.svg';
import Icon3 from '../../../assets/images/svg-3_Hiring.svg'; 

const Services = () => {
  return (
    <>
      <ServicesContainer id='services'>
        <ServicesH1>Our Services</ServicesH1>
        <ServicesWrapper>
          <ServicesCard>
            <ServicesIcon src={Icon1}/>
            <ServicesH2>Reduce expenses</ServicesH2>
            <ServicesP>We help to reduce yoiur expenses and your fees and increase your overall revenue.</ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon2}/>
            <ServicesH2>Virtual test center</ServicesH2>
            <ServicesP>You can access our test platform online anytime anywhere in the world</ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon3}/>
            <ServicesH2>Premium Benefits</ServicesH2>
            <ServicesP>Unlock our special memebership card taht unlock premium features</ServicesP>
          </ServicesCard>
        </ServicesWrapper>

      </ServicesContainer>
    </>
  )
}

export default Services
