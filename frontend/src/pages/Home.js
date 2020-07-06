import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { moduleName as dataModule, getReviews } from '@/store/ducks/data';
import { moduleName as settingsModule } from '@/store/ducks/settings';
import InfoCard from '@/components/InfoCard';
import SocialIcon from '@/components/SocialIcon';
import Carousel from '@/components/Carousel';
import { Title, Flex } from '@/elements'
import video from '@/assets/images/video.gif';

const Social = styled(Flex)`
  padding: 3rem 0;
  margin: 4rem 0;
`;

const Video = styled.div`
  position:relative;
  width: 100%;
  height: 60vmin;
  background-color: #000008;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    position: absolute; 
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    width: 100%; 
    height: 100%;
    object-fit: fill;
    overflow: hidden;
  }
`

const Home = ({ cards, social, reviews, getReviews }) => {

  useEffect(() => {
    getReviews({
        filter: {
            isShown: 1
        }
    });
  }, []);

  return (
    <main>
      <Video>
          <img src={video} alt=""/>
      </Video>
      <section className="layout">
        {cards.map((card, index) => <InfoCard height={innerWidth > 900 ? 40 : 30} autoWidth={true} key={index} {...card} imageFirst={index % 2 === 1}/>)}
      </section>
      <Social as="section" className="layout section" aic jcc fdc>
        <Title>Мы в социальных сетях</Title>
        <div>
          {social.map(item => <SocialIcon size={6} key={item.name} {...item} />)}
        </div>
      </Social>
      {reviews.length > 0 && <Fragment>
        <Title>Отзывы</Title>
        <Carousel reviews={reviews}/>
      </Fragment>}
    </main>
  )
};

Home.propTypes = {
    cards: PropTypes.array,
    social: PropTypes.array,
    reviews: PropTypes.array,
    getCards: PropTypes.func,
    getReviews: PropTypes.func
};

export default connect(state => ({
  cards: state[dataModule].cards,
  reviews: state[dataModule].reviews,
  social: state[settingsModule].social,
  appName: state[settingsModule].appName,
}), { getReviews })(Home);
