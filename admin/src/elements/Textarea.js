import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { applyModifiers } from '@/helpers/style';

export default styled(TextareaAutosize)`
    background: #FFFFFF;
    font-family: inherit;
    color: #595959;
    border-radius: 6px;
    display: block;
    padding: 10px;
    width: 100%;
    outline: none;
    font-size: 16px;
    text-align: left;
    border: none;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);
    resize: none;
    ${applyModifiers()}
    &::placeholder {
        color: #D2D2D4;
    }
`;
