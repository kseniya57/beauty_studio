import styled from 'styled-components';
import { applyModifiers } from '../helpers/style';

export default styled.div`
  border-radius: 50%;
  width: ${props => props.size}rem;
  height: ${props => props.size}rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  ${applyModifiers()}
`
