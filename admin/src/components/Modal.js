import React, { useState } from 'react';
import { useTransition, useSpring } from 'react-spring';
import { Overlay, Content, CloseIcon } from './Modals/styled';

export const ModalContext = React.createContext(null);

export default function Modal({ trigger, children, onClose }) {
  const [isOpen, setOpen] = useState(false);

  const transition = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'translate3d(0, -4rem, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0, -4rem, 0)' },

  });

  const overlayAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    left: isOpen ? '0' : '50%',
    right: isOpen ? '0' : '50%',
  });

  const open = () => {
    setOpen(true)
  };

  const close = () => {
    setOpen(false);
    onClose && onClose();
  };

  return (
    <ModalContext.Provider value={{ open, close }}>
      <React.Fragment>
        {trigger && React.cloneElement(trigger, {
          onClick: open
        })}
        <Overlay style={overlayAnimation}>
          <CloseIcon onClick={close}>close</CloseIcon>
          {transition.map(({ item, key, props: animation }) =>
            item && <Content key={key} style={animation}>
              {children}
            </Content>
          )}
        </Overlay>
      </React.Fragment>
    </ModalContext.Provider>
  )
}
