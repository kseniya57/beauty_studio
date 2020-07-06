import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InfoCard from '@/components/InfoCard';
import { moduleName as schoolModule, getCourses, getProfessionalFeatures, getFaq } from '@/store/ducks/school';
import { moduleName as settingsModule } from '@/store/ducks/settings';
import { Flex, Title, Text } from '@/elements';
import Feature from '@/components/Feature';
import CourseCard from '@/components/CourseCard';
import Accordion from '@/components/Accordion';
import {moduleName as dataModule} from "@/store/ducks/data";

const Features = styled(Flex)`
  @media (max-width: 750px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const CourseInfo = styled(Text)`
  @media (max-width: 750px) {
    display: block;
    text-align: center;
    margin: 0 2rem;
  }
`;

const School = ({ professionalFeatures, courses, faq, getCourses, getProfessionalFeatures, getFaq, cards, coursesInfoText }) => {

  useEffect(() => {
    getCourses();
    getProfessionalFeatures();
    getFaq();
  }, []);

  const card = useMemo(() => cards.find(card => card.link === location.pathname), [cards]);

  return (
    <main className="layout">
        {card && <InfoCard
        imageFirst
        mt="3rem"
        mb="3rem"
        height={innerWidth > 900 ? 50 : 30}
        title="Обучение"
        description={card.pageText}
        images={[card.pageImage]}
        autoWidth
      />}
      <section>
        <Title>Работа лешмейкером - это...</Title>
        <Features fww jcsb aic>
          {professionalFeatures.map(item => <Feature key={item.name} {...item}/>)}
        </Features>
      </section>
      <section>
        <Title>Варианты курсов</Title>
        <Flex jcc fww>
          {courses.map((course, index) => <CourseCard key={index} {...course}/>)}
        </Flex>
        <CourseInfo center mb="4rem" dangerouslySetInnerHTML={{__html: coursesInfoText}} />
      </section>
      <section>
        <Title>
          Частые вопросы
        </Title>
        {faq.map(({question, answer}, index) => <Accordion key={index} title={question}>{answer}</Accordion>)}
      </section>
    </main>
  )
};

School.propTypes = {
    professionalFeatures: PropTypes.array,
    courses: PropTypes.array,
    faq: PropTypes.array,
    getCourses: PropTypes.func.isRequired,
    getProfessionalFeatures: PropTypes.func.isRequired,
    getFaq: PropTypes.func.isRequired,
    cards: PropTypes.array,
    coursesInfoText: PropTypes.string,
};

export default connect(state => ({
    ...state[schoolModule],
    cards: state[dataModule].cards,
    coursesInfoText: state[settingsModule].coursesInfoText,
}), { getCourses, getProfessionalFeatures, getFaq })(School);