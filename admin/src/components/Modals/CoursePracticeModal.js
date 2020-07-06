import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FloatingButton, Icon, Input, Flex } from '@/elements'
import { coursesActionCreators } from '@/store/ducks/courses';
import { ModalContainer } from './styled';

function CoursePracticeModal(props) {

  const { type, id, update, close } = props;

  const [newData, setData] = useState([...props[type]]);

  const addInput = (e) => {
    e.preventDefault();
    setData([...newData, '']);
    //e.target.scrollIntoView();
  };

  const removeInput = index => () => {
    setData(newData.filter((_, i) => i !== index))
  };

  const change = (index) => (e) => {
    setData(newData.map((item, i) => i === index ? e.target.value : item))
  };

  const save = (e) => {
    e.preventDefault();
    update({
      id,
      [type]: JSON.stringify(newData)
    });
    close();
  };

  return (
    <ModalContainer>
      {newData.map((item, index) => <Flex mb="1rem" aic key={index} >
        <Input mr="1rem" value={item} onChange={change(index)}/>
        <Icon color="error" onClick={removeInput(index)}>
          delete
        </Icon>
      </Flex>)}
      <FloatingButton position="relative" center mt="2rem" onClick={addInput}>
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

export default connect(null, coursesActionCreators)(CoursePracticeModal)

