import React from 'react';
import styled from 'styled-components';
import { prop } from 'styled-tools';
import { goTo } from '@/modules/history';
import logoImage from '@/assets/images/logo.png';

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: ${prop('size')};
    height: ${prop('size')};
    cursor: pointer;
  }
`

function Logo(props) {
    return (
        <LogoWrapper onClick={goTo('/')} {...props}>
            <img src={logoImage} alt="logo" />
        </LogoWrapper>
    )
}

export default Logo;