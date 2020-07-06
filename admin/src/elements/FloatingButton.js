import styled from 'styled-components';
import { applyModifiers } from '../helpers/style';
import Circle, { defaultSize } from './Circle';
import { fixed } from './partials';

const applyButtonModifiers = applyModifiers({
  ...fixed.modifiers,
  position: 'position: ',
});

export default styled(Circle).attrs({
  as: 'button'
})`
  cursor: pointer;
  background-color: ${props => props.theme.primary};
  color: #ffffff;
  ${fixed.style}
  ${applyButtonModifiers}
  ${props => {
    if (props.center) {
      return `
        left: 50%;
        margin-left: -${(props.size || defaultSize) / 2}rem;
      `
    }
}}
`
