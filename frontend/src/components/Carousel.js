import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Review from '@/components/Review';
import Slider from "react-slick";
import Icon from "@/elements/Icon";

const Wrapper = styled.div`
  width: 80vw;
  margin: 0 auto;
`;

const settings = {
  adaptiveHeight: true,
  arrows: true,
  nextArrow: <Icon large>keyboard_arrow_right</Icon>,
  prevArrow: <Icon large>keyboard_arrow_left</Icon>
};

export default function Carousel({ reviews }) {
  return (
      <Wrapper>
        <Slider {...settings}>
          {reviews.map((review, index) => <Review key={index} {...review}/>)}
        </Slider>
      </Wrapper>
  )
}

Carousel.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    stars: PropTypes.number,
    text: PropTypes.string,
    author: PropTypes.string,
  }))
}