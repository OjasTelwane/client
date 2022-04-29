import React, {useState} from 'react';
import Video from '../../../assets/videos/video.mp4';
import { Button} from '../ButtonElements';
import { HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HerobtnWrapper, ArrowForward, ArrowRight } from './HeroElements';


const HeroSection = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover)
  }
  
  return (
    <HeroContainer id='home'>
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
      </HeroBg>
      <HeroContent>
        <HeroH1>Find out your Personality Traits</HeroH1>
        <HeroP>
          Sign up to discover your Hidden Personality traits Today
        </HeroP>
        <HerobtnWrapper>
          <Button to='signup' onMouseEnter={onHover} onMouseLeave={onHover} primary='true' dark='true'
           smooth={true} duration={500} spy={true} exact='true' offset={-80}>
            Get Started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HerobtnWrapper>
      </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection
