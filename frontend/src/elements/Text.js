import styled from 'styled-components';
import { applyModifiers } from '@/helpers/style';

export default styled.span`${applyModifiers({
  size: 'font-size: ',
  small: 'font-size: 1.3rem',
  large: 'font-size: 2.8rem',
  bold: 'font-weight: 600',
  center: 'text-align: center',
  left: 'text-align: left',
  right: 'text-align: right',
  upper: 'text-transform: uppercase',
  lh: 'line-height: ',
})}`;
