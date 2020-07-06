import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { moduleName as schoolModule, getCourse } from '@/store/ducks/school';
import { Flex, Title, Text, Centered } from '@/elements';
import CourseCard from '@/components/CourseCard';
import CourseForm from '@/components/CourseForm';
import Teacher from "@/components/Teacher";

const List = styled.ul`
  list-style-type: disc;
  margin-bottom: 3rem;
`;

const CourseMain = styled(Centered)`
  flex: 1;
  &>* {
    display: block;
    margin-bottom: 1rem;
  }
`;

const CourseTop = styled(Flex)`
  @media (max-width: 750px) {
    flex-direction: column-reverse;
  }
`;

const CourseTopLeft = styled(Flex.Item)`
   @media (max-width: 750px) {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 2rem;
    flex-basis: auto;
  }
`;

const Course =  ({ course, match, getCourse }) => {

  useEffect(() => {
    getCourse(match.params.id);
  }, []);

  return course ? (
      <div className="layout">
      <CourseTop jcsb mt="3rem">
        <CourseTopLeft as="aside" basis="30rem">
          <CourseCard withLink={false} mb={"2rem"} {...course}/>
          <Text as="h5" fontColor="black" mb="2rem">Теоретическая часть</Text>
          <List>
            {course.theory.map((item, index) => <li key={index}>{item}</li>)}
          </List>
          <Text as="h5" fontColor="black" mb="1rem">Практическая часть</Text>
          <List>
            {course.practice.map((item, index) => <li key={index}>{item}</li>)}
          </List>
        </CourseTopLeft>
        <CourseMain as="main">
          <Title>{course.title}</Title>
          {course.teacher && <Text as="p">
            <Text fontColor="black">Преподаватель: </Text>
            <Text>{course.teacher.name}</Text>
          </Text>}
          <Text as="p">
            <Text fontColor="black">Длительность: </Text>
            <Text>{course.duration}</Text>
          </Text>
          <Text fontColor="black">Расписание</Text>
          {course.schedule.map((item, index) => <div key={index}>
            <Text fontColor="black">{index + 1} день</Text><br/>
            <ul type="disc">
              {Object.entries(item).map(([interval, value]) => <li key={interval}>
                {interval} {value}
              </li>)}
            </ul>
          </div>)}
        </CourseMain>
      </CourseTop>
        {course.teacher && <section>
          <Title>Преподаватель</Title>
          <Teacher {...course.teacher}/>
        </section>}
      <CourseForm course={course}/>
    </div>
  ) : null
};

Course.propTypes = {
  course: PropTypes.object,
  match: PropTypes.object,
  getCourse: PropTypes.func.isRequired,
};

export default connect(state => ({
  course: state[schoolModule].course
}), { getCourse })(withRouter(Course));
