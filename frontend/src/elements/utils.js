import styled from 'styled-components';
import { applyModifiers } from '@/helpers/style';

export const Rounded = styled.div`
  border-radius: 50%;
  ${applyModifiers()}
`;

export const Centered = styled.div`
  text-align: center;
  ${applyModifiers()}
`;