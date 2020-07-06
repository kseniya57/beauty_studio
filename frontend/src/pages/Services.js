import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { moduleName as dataModule, getFeatures, getMasters } from '@/store/ducks/data';
import { moduleName as settingsModule } from '@/store/ducks/settings';
import { Flex, Title, Text } from '@/elements';
import InfoCard from '@/components/InfoCard';
import Feature from '@/components/Feature';
import Master from '@/components/Master';

const Features = styled(Flex)`
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Services = ({ appName, features, masters, getFeatures, getMasters, cards }) => {

  useEffect(() => {
    getFeatures();
    getMasters()
  }, []);

    const card = useMemo(() => cards.find(card => card.link === location.pathname), [cards]);

  return (
    <main className="layout">
        {card && <InfoCard
        mt="3rem"
        mb="3rem"
        height={innerWidth > 900 ? 50 : 30}
        title={`Услуги студии<br/>«${appName}»`}
        description={card.pageText}
        images={[card.pageImage]}
        autoWidth
      />}
      <section>
        <Title>Почему стоит выбрать нас?</Title>
        <Features fww jcsb aic>
          {features.map(item => <Feature key={item.name} {...item}/>)}
        </Features>
      </section>
      <section>
        <Text mt="3rem" as="p" center>Ниже приведен список мастеров, а так же стоимость услуг с градацией по уровню мастеров.
          Категория мастера зависит от времени работы в студии, скорости работы и наличия сертификатов об окончании обучения (повышения квалификации), но не влияет на качество работы.</Text>
        <Title>Мастера и услуги студии</Title>
        {masters.map((item, index) => <Master key={index} {...item} />)}
      </section>
    </main>
  )
};

Services.propTypes = {
    appName: PropTypes.string,
    features: PropTypes.array,
    masters: PropTypes.array,
    getFeatures: PropTypes.func.isRequired,
    getMasters: PropTypes.func.isRequired,
    cards: PropTypes.array,
};

export default connect(state => ({
    features: state[dataModule].features,
    masters: state[dataModule].masters,
    appName: state[settingsModule].appName,
    cards: state[dataModule].cards,
}), { getFeatures, getMasters })(Services);