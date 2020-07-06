import styled from 'styled-components';
import { applyModifiers } from '@/helpers/style';

const Icon =  styled.i`
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    vertical-align: middle;
    cursor: pointer;
    ${applyModifiers({
      size: 'font-size: ',
      small: 'font-size: 1.6rem',
      large: 'font-size: 3rem',
      color: (props, value) => `color: ${props.theme[value] || value};`
})}`;

export default Icon;
