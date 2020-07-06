import React from 'react';
import styled from 'styled-components';
import Input from './Input';

const Select = ({ children, ...rest }) => <Input as="select" {...rest}>{children}</Input>;

Select.Option = styled.option`
  display: block;
    font-weight: 400;
    font-size: 16px;
    color: #8398B8;
    padding: 10px;
    background-color: #fff;
    cursor: pointer;

`;

export default Select;