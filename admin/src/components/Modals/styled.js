import styled from 'styled-components';
import { animated } from 'react-spring';
import { Icon } from '@/elements'

export const Overlay = animated(styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 50%;
  right: 50%;
  background-color: rgba(255, 255, 255, .7);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`);

export const Content = animated(styled.div`
  background-color: #ffffff;
  position: relative;
  z-index: 2;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);
`);

export const CloseIcon = styled(Icon)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  color: #8A97A6;
`;

export const ModalContainer = styled.div`
  width: 80vw;
  max-height: 90vh;
  overflow-y: auto;
  padding: 4.5rem;
`;
