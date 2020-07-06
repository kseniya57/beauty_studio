import React, { useState } from 'react';
import { connect } from 'react-redux';
import DayScheduleCard from '@/components/DayScheduleCard';
import { FloatingButton, Icon } from '@/elements'
import { coursesActionCreators } from '@/store/ducks/courses';
import { ModalContainer } from './styled';

const transformSchedule = (schedule) => schedule.map(item => Object.entries(item));
const transformScheduleBack = (schedule) => JSON.stringify(schedule.map(item => item.reduce((map, [key, value]) => Object.assign(map, {[key]: value}), {})));

function CourseScheduleModal({ id, schedule, update, close }) {
  const [newSchedule, setSchedule] = useState(transformSchedule(schedule));

  const addDay = (e) => {
    e.preventDefault();
    setSchedule([...newSchedule, []]);
    //e.target.scrollIntoView();
  };

  const addTime = (index) => (newItem) => {
    setSchedule(newSchedule.map((item, i) => i === index ? newItem : item))
  }

  const save = (e) => {
    e.preventDefault();
    update({
      id,
      schedule: transformScheduleBack(newSchedule)
    });
    close()
  };

  return (
    <ModalContainer>
      {newSchedule.map((item, index) => <DayScheduleCard m="1rem" key={index} day={index + 1} data={item} onChange={addTime(index)}/>)}
      <FloatingButton position="relative" center mt="2rem" onClick={addDay}>
        <Icon>add</Icon>
      </FloatingButton>
      <FloatingButton
        position="absolute"
        top="1rem"
        right="1rem"
        onClick={save}>
        <Icon>save</Icon>
      </FloatingButton>
    </ModalContainer>
  )
}

export default connect(null, coursesActionCreators)(CourseScheduleModal)
