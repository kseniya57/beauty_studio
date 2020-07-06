import styled from 'styled-components';
import { applyModifiers } from '../helpers/style';

export const defaultSize = 4;

export default styled.div`
  border-radius: 50%;
  width: ${props => props.size || defaultSize}rem;
  height: ${props => props.size || defaultSize}rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${applyModifiers()}
`
