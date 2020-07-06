import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Logo from '@/components/Logo';
import Phone from '@/components/Phone';
import { Button } from '@/elements';
import { goTo } from '@/modules/history';
import { moduleName as settingsModule } from '@/store/ducks/settings'
import {DIKIDI_URL} from "@/constants";
import { track } from "@/utils";
import subwayImage from "@/assets/icons/subway.png";

const menuButtons = [
  {
    name: 'Главная',
    path: '/'
  },
  {
    name: 'Услуги',
    path: '/services'
  },
  {
    name: 'Обучение',
    path: '/school'
  },
  {
    name: 'Вакансии',
    path: '/vacancy'
  },
  {
    name: 'Контакты',
      path: '/contacts'
  }
];

const StyledHeader = styled.header`
  @media (min-width: 700px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 100;
  }
`;

const MenuButton = styled.a`
  &, &:link, &:visited {
     font-size: 1.4rem;
     border-bottom-right-radius: 1rem;
     border-bottom-left-radius: 1rem;
     border: 1px solid ${props => props.theme.base};
     padding: .5rem 0;
     margin: 0 .5rem;
     text-transform: uppercase;
     flex: 1;
     text-align: center;
     transition: all .5s ease;
  }
  &:hover, &.active {
    background-color: ${props => props.theme.base};
    color: ${props => props.theme.textAccent}
  }
`;

const SubwayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 700px) { 
    align-items: center;
    justify-content: center;
  }
`;

const Subway = styled.span`
  position: relative;
  margin-bottom: .5rem;
  img {
    margin-right: 0.5rem;
  }
`;

const HeaderLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    &>* {
      margin: 1rem 0;
    }
  }
`;

const Menu = styled.div`
  display: flex;
  margin-bottom: 1rem;
  @media (max-width: 520px) {
    flex-wrap: wrap;
    &>* {
       flex-basis: 25%;
       margin: 0.5rem;
       border-radius: 1rem;
    }
  }
`

const Header = ({ phone, addresses, location }) => {
  const handleClick = useCallback((link, text) => () => {
    goTo(link)();
    track(text)();
  }, []);
  return (
      <StyledHeader>
        <nav className="layout">
          <Menu>
            {menuButtons.map(button => <MenuButton
                key={button.name}
                onClick={handleClick(button.path, button.name)}
                className={button.path === location.pathname ? 'active' : ''}
            >{button.name}</MenuButton>)}
          </Menu>
        </nav>
        <HeaderLine className="layout">
          <Logo size="5rem"/>
          <Button
              as="a"
              color="base"
              fontColor="textAccent"
              href={DIKIDI_URL}
              target="_blank"
              size="1.8rem"
              onClick={track('Запись на главной')}
          >Записаться</Button>
          <Phone phone={phone}/>
          <SubwayWrapper>
            {addresses.map(item => (<Subway color={item.color} key={item.subway}>
              <img className="emoji" src={subwayImage} alt="Ⓜ" />
              {item.subway}
            </Subway>))}
          </SubwayWrapper>
        </HeaderLine>
      </StyledHeader>
  );
};

Header.propTypes = {
  phone: PropTypes.string,
  addresses: PropTypes.array,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}

export default withRouter(connect(state => ({
  phone: state[settingsModule].phone,
  addresses: state[settingsModule].addresses
}))(Header))
