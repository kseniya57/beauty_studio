import styled from 'styled-components';
import { applyModifiers } from '@/helpers/style';

const applyButtonModifiers = applyModifiers({
    size: 'font-size: '
});

export default styled.button`
  &::after {
    content: '';
    height: 100%;
    width: 100%;
    border-radius: 10rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all .4s;
  };
    
  &, &:link, &:visited {
    font-size: 1.4rem;
    display: inline-block;
    text-decoration: none;
    padding: 0.8rem 2.5rem;
    border-radius: 10rem;
    transition: all .2s;
    position: relative;
    border: ${props => props.bordered ? `2px solid ${props.theme.base}`: 'none'};
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    ${applyButtonModifiers}
  };
  
  &:hover {
  transform: translateY(-.3rem);
    box-shadow: 0 1rem 2rem rgba(#000000, .2);
    &::after {
    transform: scaleX(1.4) scaleY(1.6);
      opacity: 0;
    }
      
  };
    
  &:active, &:focus {
  transform: translateY(-1px);
    box-shadow: 0 .5rem 1rem rgba(#000000, .2);
  }
`;