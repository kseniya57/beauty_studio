import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Flex, Text, Button } from '@/elements';
import saleImage from '@/assets/images/sale.png';
import { goTo } from '@/modules/history';
import { track } from "@/utils";

const Card = styled(Flex)`
  border: 2px solid #071e29;
  padding: 2rem;
  position: relative;
  flex-basis: 30%;
  margin: 0 2rem 2rem;
  font-family: 'Roboto', sans-serif;
  max-width: 30rem;
  @media (max-width: 750px) {
    flex-basis: 48%;
  }
  @media (max-width: 450px) {
    flex-basis: 100%;
  }
`;

const SaleImage = styled.img.attrs({
  src: saleImage,
  alt: 'Акция'
})`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 4.5rem;
  height: 4.5rem;
`;

export default function CourseCard({ title, description, discount, price, id, withLink }) {
  const handleClick = useCallback(() => {
    goTo(`/course/${id}`)();
    track(`Страница курса ${title}`)();
  }, [id, title]);
  return (<Card fdc aic jcsb>
    <Flex fdc aic jcc>
      <Text center size="2rem" mb="1rem" fontColor="black" bold as="h3">{title}</Text>
      {discount > 0 ? <SaleImage /> : null}
      <Text size="1.4rem" center mb="2rem">{description}</Text>
    </Flex>
    <Flex fdc aic>
      <Text size="1.8rem" fontColor="black">Стоимость курса</Text>
      <Text  size="1.8rem" bold fontColor={discount > 0 ? 'red' : 'black'} mb="2rem">{Math.round(price * ((100 - discount) / 100))}₽</Text>
      {withLink ? <Button bordered onClick={handleClick}>Подробнее</Button> : null}
    </Flex>
</Card>)
}

CourseCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  discount: PropTypes.number,
  price: PropTypes.number,
  id: PropTypes.number,
  withLink: PropTypes.bool
};

CourseCard.defaultProps = {
  withLink: true
};
