import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from '@/modules/axios';
import { Title, Text, Centered, Input, Button } from '@/elements';

const Form = styled(Centered)`
  @media(max-width: 576px) {
    margin: 0 2rem;
  }
`

export default function CourseForm({ course }) {
    const [isSended, setSended] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const update = useCallback((setValue) => (e) => {
        setValue(e.target.value);
    }, [])

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            axios.post('/courses/recording', {
                name,
                phone,
                course: course.title,
            });
            setSended(true);
        },
        [name, phone, course],
    );

    return (
        <section>
            <Title>Записаться на обучение</Title>
            <Form as="form" onSubmit={handleSubmit}>
                <Input mb="2rem" required placeholder="Ваше имя и фамилия*" value={name} onChange={update(setName)}/>
                <Input mb="2rem" required placeholder="Ваш номер телефона*" value={phone} onChange={update(setPhone)}/>
                <Input mb="2rem" required placeholder="Название курса" disabled value={course.title}/>
                <Button color="base" fontColor="textAccent" type="submit" disabled={isSended}>{isSended ? 'Спасибо! Мы с вами свяжемся.' : 'Получить консультацию'}</Button>
                <Text center as="p" mt="2rem">
                    Отправляя данную форму Вы подтверждаете, что ознакомились и согласны с политикой обработки персональных данных данного сайта
                </Text>
            </Form>
        </section>
    )
}

CourseForm.propTypes = {
    course: PropTypes.shape({
        title: PropTypes.string,
    })
}