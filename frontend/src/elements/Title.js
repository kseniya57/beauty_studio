import styled from 'styled-components';
import waveIcon from '@/assets/icons/title-wave.svg';

export default styled.h2`
  font-size: 3rem;
  font-family: "eb garamond", serif;
  text-transform: uppercase;
  line-height: 1.2;
  text-align: center;
  padding: 2rem;
  position: relative;
  margin-bottom: 2rem;
  white-space: ${props => props.nowrap ? 'nowrap' : 'normal'};
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 50%;
    margin-right: -1rem;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-image: url(${waveIcon});
  }
`