import styled from 'styled-components';
import { applyModifiers } from '@/helpers/style';

export default styled.input`
    background: #FFFFFF;
    font-family: "Roboto sans-serif",sans-serif;
    color: #595959;
    border-radius: 6px;
    display: block;
    padding: 0 10px;
    height: 4rem;
    width: 100%;
    outline: none;
    font-size: 16px;
    border: 1px solid #595959;
    text-align: left;
    ${applyModifiers()}
    &::placeholder {
        color: #D2D2D4;
    }
`;
