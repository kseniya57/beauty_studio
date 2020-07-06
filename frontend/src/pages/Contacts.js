import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { moduleName as settingsModule } from '../store/ducks/settings';
import { Title, Text, Button, Flex } from '@/elements';
import Email from '@/components/Email';
import Phone from '@/components/Phone';
import Map from '@/components/Map';
import SocialIcon from "@/components/SocialIcon";

const Address = styled.div`
  text-align: center;
  max-width: 50rem;
  margin: 3rem auto;
`;

const PhoneAndEmail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 3rem;
  @media (max-width: 500px) {
    flex-direction: column;
    & > *:first-child {
      margin-bottom: 1rem;
      margin-right: 0;
    }
  }
`

const Contacts = ({ phone, email, workTimeInterval, lastTime, addresses, social }) => {
  return (
    <main>
      <div className="layout">
        <Title>
          Контакты <br/>
          <Text size="2.3rem">
            Наращивание ресниц Спб <br/>
            {addresses.map(item => `м. ${item.subway}`).join('|')}
          </Text>
        </Title>
        <PhoneAndEmail>
          <Text mr="5rem">
            <Text fontColor="black">Телефон: </Text>
            <Phone phone={phone}/>
          </Text>
          <div>
            <Text fontColor="black">E-Mail: </Text>
            <Email email={email}/>
          </div>
        </PhoneAndEmail>
        <Flex aic jcc mb="3rem">
          {social.map(item => <SocialIcon size={6} key={item.name} {...item} />)}
        </Flex>
        <Title>
          Часы работы </Title>
          <Text as="p" size="1.8rem" mt="1rem" mb="2rem" lh="3rem" center>
            Работа ведется по <br/>
            предварительной записи <br/>
            ПН–ВС: {workTimeInterval}* <br/>
            <Text small>*последняя запись на {lastTime}</Text>
          </Text>
        <Title>
          Наши адреса
        </Title>
        {addresses.map((item, index) => <Address key={index}>
          <Text as="h4" fontColor="black" large mb="2rem">{item.name}</Text>
          <Text as="p" mb="2rem">{item.address}</Text>
          <Text as="p" mb="2rem" small> Чтобы автоматически проложить маршрут к нам в Яндекс.Навигаторе
            нажмите кнопку ниже</Text>
          <Button as="a" target="_blank" href={`https://yandex.ru/maps/?z=14&text=${item.lat}+${item.lng}`} bordered >Построить маршрут</Button>
        </Address>)}
      </div>
      {addresses.length ? <Map /> : null}
    </main>
  )
};

Contacts.propTypes = {
  phone: PropTypes.string,
  email: PropTypes.string,
  workTimeInterval: PropTypes.string,
  lastTime: PropTypes.string,
  addresses: PropTypes.array,
  social: PropTypes.array,
};

export default connect(state => ({
  email: state[settingsModule].email,
  phone: state[settingsModule].phone,
  workTimeInterval: state[settingsModule].workTimeInterval,
  lastTime: state[settingsModule].lastTime,
  subway: state[settingsModule].subway,
  addresses: state[settingsModule].addresses,
  social: state[settingsModule].social,
}))(Contacts);
