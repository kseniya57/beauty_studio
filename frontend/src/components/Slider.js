import React, { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '@/elements';
import Image from '@/components/Image';

const Slide = animated(styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.autoWidth ? 'auto' : '100%'};
  max-width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-position: center;
  will-change: opacity;
`);

const SliderWrapper = styled.div`
  position: relative;
  height: ${props => props.height}rem;
  width: 50rem;
  text-align: center;
  
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ImageWrapper = styled(Flex)`
  height: ${props => props.height}rem;
  width: 50rem;
  
  @media (max-width: 900px) {
    width: auto;
  }
`;

export default function Slider({ images, height, isLocal, autoWidth }) {
  if (!images.length) {
    return <span>No images</span>
  } else if (images.length === 1) {
    return <ImageWrapper aic jcc height={height}><Image autoWidth={autoWidth} isLocal={isLocal} source={images[0]} /></ImageWrapper>
  }
  const [index, set] = useState(0);
  const transitions = useTransition(images[index], () => index, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses,
  });
  useEffect(() => {
    const interval = setInterval(() => set(state => (state + 1) % images.length), 5000);
    return () => clearInterval(interval);
  }, []);
  return <SliderWrapper height={height}>
    {transitions.map(({ item, props, key }) => (
    <Slide
      key={key}
      style={props}
    ><Image autoWidth={autoWidth} isLocal={isLocal} source={item.name} /></Slide>
    ))}
  </SliderWrapper>
}

Slider.propTypes = {
  images: PropTypes.array,
  height: PropTypes.number,
  isLocal: PropTypes.bool,
  autoWidth: PropTypes.bool,
};

Slider.defaultProps = {
  images: [],
  height: 200,
  isLocal: false,
  autoWidth: false,
}