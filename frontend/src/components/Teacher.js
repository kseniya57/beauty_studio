import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex, Text, Rounded } from '@/elements';
import {API_URL} from "@/constants";

const TeacherCard = styled(Flex)`
  height: 50rem;
   @media (max-width: 750px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: auto;
    &>* {
      margin: 1rem 0;
    }
  }
`;

const TeacherCardTextSide = styled.div`
  width: 50rem;
  max-width: 50%;
`;

export default function Teacher({ name, photo, description }) {
    return (
      <TeacherCard aic jcc>
        <Flex.Item basis="30rem" mr="3rem">
          <Rounded as="img" src={`${API_URL}/${photo}`} alt=""/>
        </Flex.Item>
        <TeacherCardTextSide>
          <Text as="h3" center large mb="1rem">{name}</Text>
          <Text as="p" center>{description}</Text>
        </TeacherCardTextSide>
      </TeacherCard>
    )
}

Teacher.propTypes = {
    name: PropTypes.string,
    photo: PropTypes.string,
    description: PropTypes.string
};