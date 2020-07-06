import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex, Text } from '@/elements';

const StyledReview = styled.div`
  text-align: center;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
`;

const Stars = styled(Flex)`
  color: #fc0;
`;

const ReviewText = styled.p`
  flex: 1;
  margin: 1rem 0;
  max-width: 500px;
`;

function Review({ stars, text, author }) {
    return (
        <StyledReview>
            <Stars jcc aic>{'★'.repeat(stars)}</Stars>
            <ReviewText>«{text}»</ReviewText>
            <Text bold>{author}</Text>
        </StyledReview>
    )
}

Review.propTypes = {
    stars: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
};

export default Review;