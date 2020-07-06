import React, { Fragment, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { moduleName as dataModule, getVacancies } from '@/store/ducks/data';
import { moduleName as settingsModule } from '@/store/ducks/settings';
import { Title, Text, Flex } from '@/elements';
import InfoCard from '@/components/InfoCard';

const List = styled.ul`
  list-style-type: disc;
  margin-bottom: 3rem;
  text-align: center;
`;

const Vacancy = ({ vacancies, getVacancies, appName, phone, cards, vacanciesText }) => {

    useEffect(() => {
        getVacancies();
    }, []);

    const card = useMemo(() => cards.find(card => card.link === location.pathname), [cards]);

    return (
        <main className="layout">
            {card && <InfoCard
                mt="3rem"
                mb="7rem"
                height={innerWidth > 900 ? 50 : 30}
                title="Вакансии"
                imageFirst
                description={card.pageText}
                images={[card.pageImage]}
                autoWidth
            />}
            <Flex aic jcc fdc mb="3rem" p="0 2rem">
                <Title>
                    Открытые вакансии
                </Title>
                <Text center large bold mb="1rem">
                    В студию моделирования взгляда «{appName}» требуются:
                </Text>
                <List>
                    {vacancies.map(item => <li key={item.id}>{item.name}</li>)}
                </List>
                {vacanciesText ?  <div dangerouslySetInnerHTML={{__html: vacanciesText}} /> :  <Fragment><Text center large bold mb="1rem">
                    Мы предлагаем:
                </Text>
                    <List>
                        <li>постоянный поток клиентов;</li>
                        <li>работу в оборудованной студии.</li>
                    </List>
                    <Text center large bold mb="1rem">
                        Условия:
                    </Text>
                    <List>
                        <li>высокий процент (от 50%);</li>
                        <li>расходные материалы студии;</li>
                        <li>оборудованное рабочее место;</li>
                        <li>выплаты з/п 2 раза в месяц (аванс и основная часть);</li>
                        <li>график плавающий, обсуждается индивидуально;</li>
                        <li>выход под запись;</li>
                        <li>большие скидки на услуги студии.</li>
                    </List>
                    <Text center large bold mb="1rem">
                        Требования:
                    </Text>
                    <List>
                        <li>ответственность, вежливость, внимательность;</li>
                        <li>владение техниками классического и объемного наращивания до 3д;</li>
                        <li>скорость наращивания 2,5-3 часа;</li>
                        <li>рассмотрим кандидатов с маленьким опытом.</li>
                    </List>
                    <Text center large bold mb="1rem">
                        Контакты:
                    </Text>
                    <Text center>
                        Присылайте информацию о себе (ФИО, возраст, опыт работы, своё портфолио) на WhatsApp {phone}, или звоните.
                    </Text></Fragment>}
            </Flex>
        </main>
    )
};

Vacancy.propTypes = {
    vacancies: PropTypes.array,
    getVacancies: PropTypes.func.isRequired,
    appName: PropTypes.string,
    phone: PropTypes.string,
    description: PropTypes.string,
    vacanciesText: PropTypes.string,
    cards: PropTypes.array,
};

export default connect(state => ({
    vacancies: state[dataModule].vacancies,
    appName: state[settingsModule].appName,
    phone: state[settingsModule].phone,
    vacanciesText: state[settingsModule].vacanciesText,
    cards: state[dataModule].cards,
}), { getVacancies })(Vacancy);
