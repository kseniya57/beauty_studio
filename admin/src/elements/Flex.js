import styled from 'styled-components';
import { applyModifiers } from '@/helpers/style';

const applyFlexModifiers = applyModifiers({
  fdc: 'flex-direction: column',
  reversed: 'flex-direction: row-reverse',
  fww: 'flex-wrap: wrap',
  ais: 'align-items: stretch',
  aic: 'align-items: center',
  jcs: 'justify-content: stretch',
  jcc: 'justify-content: center',
  jcsa: 'justify-content: space-around',
  jcsb: 'justify-content: space-between',
});

const Flex = styled.div`
  display: flex;
  ${applyFlexModifiers}
`;

Flex.Item = styled.div`
  flex-basis: ${props => props.basis || 'auto'}
  ${applyModifiers()}
`;

export default Flex;
