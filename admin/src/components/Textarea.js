import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { applyModifiers } from '@/helpers/style';

const StyledTextarea = styled.textarea`
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

export default function Textarea({ minHeight = 30, maxHeight, value, onChange }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!textareaRef || !textareaRef.current) {
      return;
    }
    textareaRef.current.style.setProperty('height', 'auto');
    let contentHeight = textareaRef.current.scrollHeight + 1;
    if (minHeight) {
      contentHeight = contentHeight < minHeight ? minHeight : contentHeight;
    }
    if (maxHeight && contentHeight > maxHeight) {
      contentHeight = maxHeight;
    }
    textareaRef.current.style.setProperty('height', `${contentHeight}px`);
  });

  return (
    <StyledTextarea ref={textareaRef} value={value} onChange={onChange}/>
  )
}
