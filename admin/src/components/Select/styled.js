import styled from 'styled-components';
import { ifProp } from 'styled-tools';

export const StyledSelect = styled.div`
  position: relative;
  width: 100%;
`;

const MENU_PADDING = 8;

export const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  background-color: #fff;
  border-radius: 0.4rem;
  box-shadow: 0 0 0 0.1rem hsla(0, 0%, 0%, 0.1),
    0 0.4rem 1.1rem hsla(0, 0%, 0%, 0.1);
  padding: ${MENU_PADDING}px 0;
  margin-top: 0.5rem;
  z-index: 100;
`;

export const OptionsContainer = styled.div`
  max-height: ${({ height }) => (height === 0 ? 'auto' : `${height}px}`)};
  overflow-y: auto;
`;

export const Option = styled.div`
  background-color: ${ifProp(
    'isActive',
    'blue',
    ifProp({ isFocused: true }, 'lightblue', '#fff')
)};
  color: ${({ isActive }) =>
    isActive ? '#fff' : '#000'};
  cursor: pointer;
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  line-height: 1.4rem;
  width: 100%;
  user-select: none;
  transition: all 0.3s ease-in-out;
`;