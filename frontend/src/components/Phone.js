import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from '@/elements';

const PhoneWrapper = styled.a`
  font-weight: 500;
  i {
    vertical-align: middle;
    margin-right: .5rem;
    font-size: 2rem;
  }
  span {
    text-decoration: underline;
    font-size: 1.8rem;
  }
`;

const Phone = ({ phone }) => (
  <PhoneWrapper href={`tel:${phone}`}>
    <Icon>phone</Icon>
    <span>{phone}</span>
  </PhoneWrapper>
);

Phone.propTypes = {
    phone: PropTypes.string,
};

export default Phone;