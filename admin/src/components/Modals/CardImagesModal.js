import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Image from '@/components/Image';
import PhotoInput from '@/components/PhotoInput';
import { photosActionCreators } from '@/store/ducks/photos';
import { moduleName as cardsModule } from '@/store/ducks/cards';
import { ModalContainer } from './styled';

const CardImage = styled(Image)`
  width: 20rem;
  height: 20rem;
  margin: 1rem;
`;

const Content = styled(ModalContainer)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

function CardImagesModal({ cards, id, images, remove }) {
  const [newImages, setImages] = useState(images);

  useEffect(() => {
    const card = cards.find(item => item.id === id);
    if (card) {
      setImages(card.images);
    }
  }, [cards]);

  return (
    <Content>
      {newImages.map(item => (
        <CardImage
          key={item.name}
          onDelete={() => remove(item)}
          source={item.name}
        />
      ))}
      <PhotoInput
        showPreview={false}
        relation="cards"
        relatedId={id}
        size={20}
        margin={1}
        height={400}
        width={500}
      />
    </Content>
  );
}

export default connect(
  state => ({
    cards: state[cardsModule].cards
  }),
  photosActionCreators
)(CardImagesModal);
