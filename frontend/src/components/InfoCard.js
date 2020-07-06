import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex, Title, Text, Button } from '@/elements';
import { goTo } from '@/modules/history';
import Slider from '@/components/Slider';
import { track } from "@/utils";

const InfoCardWrapper = styled(Flex).attrs({
  aic: true,
  jcc: true
})`
  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
  }
`;

const InfoCardSide = styled(Flex)`
  width: 50rem;
  min-height: ${props => props.height}rem;
  padding: 0 2rem;
  margin: 1rem 0;
  @media (max-width: 900px) {
    width: 100%;
    height: auto;
    padding: 2rem;
    margin-bottom: 2rem;
  }
`;

export default function InfoCard({ title, images, description, link, buttonText, imageFirst, height, autoWidth, ...rest }) {
  const handleClick = useCallback(() => {
    goTo(link)();
    track(buttonText)();
  }, [link, buttonText]);
  return <InfoCardWrapper reversed={imageFirst} {...rest}>
    <InfoCardSide aic fdc jcc height={height}>
      <Title nowrap dangerouslySetInnerHTML={{ __html: title }} />
      <Text center as="p" mb="2rem">{description}</Text>
      {link && <Button fontColor="textAccent" onClick={handleClick} bordered color="base">{buttonText}</Button>}
    </InfoCardSide>
    <Slider height={height} autoWidth={autoWidth} images={images} />
  </InfoCardWrapper>
}

InfoCard.propTypes = {
  title: PropTypes.string,
  images: PropTypes.array,
  description: PropTypes.string,
  link: PropTypes.string,
  buttonText: PropTypes.string,
  imageFirst: PropTypes.bool,
  height: PropTypes.number,
  isLocal: PropTypes.bool,
  autoWidth: PropTypes.bool
}

InfoCard.defaultProps = {
  height: 50,
  isLocal: false,
  autoWidth: false,
  imageFirst: false
};
