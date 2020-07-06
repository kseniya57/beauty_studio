import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex, Text, Button } from '@/elements';
import {API_URL, DIKIDI_URL} from '../constants';
import { track } from "@/utils";

const MasterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  @media (max-width: 750px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    &>* {
      margin: 1rem 0;
    }
  }
`;

const MasterPhoto = styled.img`
  border-radius: 50%;
  width: 17.2rem;
  height: auto;
`;

const ServicesWrapper = styled(Flex)`
  margin-top: 2rem;
  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const Service = styled.div`
  margin: .5rem 2rem;
  text-align: center;
`;

const MasterButton = styled(Button)`
  align-self: center;
`;

const Expanded = styled.div`
  flex: 1;
`;

export default function Master({ name, services, role, description, photo, dikidiId }) {
    return (
      <MasterWrapper>
        <Flex.Item mr="3rem">
          <MasterPhoto src={`${API_URL}/${photo}`} alt=""/>
        </Flex.Item>
        <Expanded>
          <Text as="h3" large mb="2rem">{name}</Text>
          <Text bold>{role}</Text><br/>
          <Text small>{description}</Text>
          <ServicesWrapper fww aic jcsb>
            {services.map(({ name, price }) => <Service key={name}><Text bold>{name}</Text><br/><Text>{price}₽</Text></Service>)}
          </ServicesWrapper>
        </Expanded>
        <MasterButton
            as="a"
            color="base"
            fontColor="textAccent"
            href={`${DIKIDI_URL}?st_m=1&sm_m=${dikidiId}`}
            target="_blank"
            onClick={track(`Запись к ${name}`)}
        >
          Записаться
        </MasterButton>
      </MasterWrapper>
    )
}

Master.propTypes = {
    name: PropTypes.string,
    services: PropTypes.array,
    role: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
    dikidiId: PropTypes.number
};