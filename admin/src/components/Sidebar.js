import React from 'react';
import styled from 'styled-components';
import { goTo } from '../modules/history';
import Icon from '../elements/Icon';

const menu = [
  {
    name: 'Настройки',
    icon: 'settings',
    path: '/settings'
  },
  {
    name: 'Тексты',
    icon: 'assignment',
    path: '/texts'
  },
  {
    name: 'Карточки',
    icon: 'web',
    path: '/cards'
  },
  {
    name: 'Фото',
    icon: 'photo',
    path: '/photos'
  },
  {
    name: 'Мастера',
    icon: 'people',
    path: '/masters'
  },
  {
    name: 'Преимущества',
    icon: 'extension',
    path: '/features'
  },
  {
    name: 'Профессиональные преимущества',
    icon: 'work',
    path: '/professionalFeatures'
  },
  {
    name: 'Курсы',
    icon: 'school',
    path: '/courses'
  },
  {
    name: 'Вопросы и ответы',
    icon: 'help',
    path: '/faq'
  },
  {
    name: 'Социальные сети',
    icon: 'public',
    path: '/social'
  },
  {
    name: 'Адреса',
    icon: 'location_on',
    path: '/addresses'
  },
  {
    name: 'Услуги',
    icon: 'room_service',
    path: '/services'
  },
  {
    name: 'Вакансии',
    icon: 'work',
    path: '/vacancies'
  },
  {
    name: 'Отзывы',
    icon: 'star',
    path: '/reviews'
  }
];

const SidebarWrapper = styled.aside`
    min-width: 300px;
    width: 300px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;

const Menu = styled.div`
  width: 100%;
  font-size: 1.4rem;
`;

Menu.Item = styled.a`
  color: ${props => props.theme[props.isActive ? 'primary' : 'textLight']};
  background-color: ${({ isActive }) => isActive ? '#eee' : '#fff'};
  transition: all .3s ease-in-out;
  padding: 1rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    transition: width .3s ease-in-out;
    width: 0;
    background-color: ${props => props.theme.primary};
  }
  &:hover {
    color: ${props => props.theme.primary};
    background-color: #eee;
    &::after {
      width: 2px;
    }
  }
`;


export default function Sidebar() {
  const { pathname } = location;
  return (
    <SidebarWrapper>
      <Menu>
        {menu.map(item => (<Menu.Item
            key={item.name}
            onClick={goTo(item.path)}
            isActive={pathname === item.path}
        >
          <Icon mr="0.8rem">{item.icon}</Icon>
          {item.name}
        </Menu.Item>))}
      </Menu>
    </SidebarWrapper>
  )
}
