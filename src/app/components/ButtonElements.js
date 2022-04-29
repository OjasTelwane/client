import styled from 'styled-components';
import {Link as LinkS} from 'react-scroll';

export const Button = styled(LinkS)`
border-radius: 50px;
background: ${({primary}) => (primary ? '#E72C59': '#19B3BD')};
white-space: nowrap;
padding: ${({big}) => (big ? '14px 48px': '12px 30px')};
color: ${({dark}) => (dark ? '#ffffff': '#333E48')};
font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
outline: none;
border: none;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
transition: all 0.2s ease-in-out;

&:hover{
  transition: all 0.2s ease-in-out;
  background: ${({primary}) => (primary ? '#19B3BD' : '#E72C59')};
}
`
