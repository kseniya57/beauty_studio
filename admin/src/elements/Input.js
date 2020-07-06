import styled from 'styled-components';
import { applyModifiers } from '@/helpers/style';

export default styled.input`
    background: #FFFFFF;
    font-family: inherit;
    color: #595959;
    border-radius: 6px;
    display: block;
    padding: 0 10px;
    height: 4rem;
    width: 100%;
    outline: none;
    font-size: 16px;
    text-align: left;
    border: none;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);
    ${applyModifiers()};
    &::placeholder {
        color: #D2D2D4;
    }
`;
