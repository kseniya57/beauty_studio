import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/elements';

const AccordionItem = styled.div`
  border-bottom: 1px solid #000000;
`;

const AccordionHandle = styled.div`
  padding: 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const AccordionContent = styled(motion.div)`
  overflow: hidden;
`;

const AccordionInnerContent = styled.div`
  padding: 0 1rem 1rem;
`

export default function Accordion({ title, children }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <AccordionItem>
      <AccordionHandle onClick={() => setOpen(!isOpen)}>
        <span>{title}</span>
        <Icon style={{transform: isOpen ? `rotate(180deg)` : `rotate(0)`}}>keyboard_arrow_down</Icon>
      </AccordionHandle>
        <AnimatePresence initial={false}>
        {isOpen && <AccordionContent
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
        >
            <AccordionInnerContent>{children}</AccordionInnerContent>
        </AccordionContent>}
        </AnimatePresence>
    </AccordionItem>
  )
}

Accordion.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element
};