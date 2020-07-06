import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Text, Flex, Icon } from '@/elements';
import Image from '@/components/Image';

const FeatureWrapper = styled(Flex)`
  flex-basis: 40%;
  margin-bottom: 5rem;
`

const FeatureText = styled.div`
  width: 40rem;
  text-align: center;
  font-family: "eb garamond", serif;
  font-size: 1.8rem;
  @media (max-width: 1200px) {
    width: 30rem;
  }
`;

const FeatureIcon = styled(Icon)`
  flex-basis: 7rem;
  width: 7rem;
  font-size: 5rem;
  color: ${props => props.color};
`

const StyledImage = styled(Image)`
  margin-right: 2rem;
  width: 5rem;
`;

export default function Feature({ image, icon, name, iconColor, description, ...rest }) {
    return  (
      <FeatureWrapper aic jcsb {...rest}>
          {image ? <StyledImage isLocal={false} source={image}/> : <FeatureIcon color={iconColor}>{icon}</FeatureIcon>}
        <FeatureText>
          <Text as="h3" center large mb="1rem">{name}</Text>
          {description && <p>{description}</p>}
        </FeatureText>
      </FeatureWrapper>
    )
}

Feature.propTypes = {
    image: PropTypes.string,
    icon: PropTypes.string,
    name: PropTypes.string,
    iconColor: PropTypes.string,
    description: PropTypes.string
};