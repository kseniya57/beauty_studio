import React from 'react';
import { Flex, Text, FloatingButton, Icon } from '@/elements'
import DoubleInput from '@/components/DoubleInput';

export default function DayScheduleCard({ day, data, onChange, ...rest }) {
  return (
    <Flex fww {...rest}>
      <Flex.Item basis="100%">
        <Text small m="0.5rem">{day} день</Text>
      </Flex.Item>
      {data.map(([time, value], index) => <DoubleInput m="1rem" key={index} left={time} right={value} onSave={(value) => onChange(data.map((el, i) => i === index ? value : el))}/>)}
      <FloatingButton color="blue" position="static" m="0.7rem" onClick={() => onChange([...data, ['', '']])}>
        <Icon>add</Icon>
      </FloatingButton>
    </Flex>
  )
}
