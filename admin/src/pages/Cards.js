import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { moduleName as cardsModule, cardsActionCreators } from '@/store/ducks/cards';
import Table from '@/components/Table';
import Textarea from '@/components/Textarea';
import { Input } from '@/elements';
import PhotoInput from "@/components/PhotoInput";


const headers = [
  {
    name: '#',
    key: 'id'
  },
  {
    name: 'Название',
    key: 'title'
  },
  {
    name: 'Текст кнопки',
    key: 'buttonText'
  },
  {
    name: 'Ссылка',
    key: 'link'
  },
  {
    name: 'Картинки',
    key: 'images',
    icon: 'photo',
    modal: 'card-images',
    type: 'button'
  },
  {
    name: 'Картинка на странице',
    key: 'pageImage',
    type: 'image'
  },
];

const fields = [
  {
    Element: Input,
    label: 'Название',
    columns: 1,
    props: {
      name: 'title',
    }
  },
  {
    Element: Input,
    label: 'Текст кнопки',
    columns: 1/2,
    props: {
      name: 'buttonText',
    }
  },
  {
    Element: Input,
    label: 'Ссылка',
    columns: 1/2,
    props: {
      name: 'link',
    }
  },
  {
    Element: Textarea,
    label: 'Описание',
    columns: 1,
    props: {
      name: 'description',
    }
  },
  {
    Element: PhotoInput,
    columns: 1,
    props: {
      name: 'pageImage',
      owner: 'cards',
      height: 400,
      width: 500
    },
    wrapperProps: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  },
  {
    Element: Textarea,
    label: 'Текст на странице',
    columns: 1,
    props: {
      name: 'pageText',
    }
  },
];

function Cards({ cards, get, add, update, remove, reorder }) {

  useEffect(() => {
    get();
  }, []);

  return (
    <Table
      headers={headers}
      items={cards}
      remove={remove}
      update={update}
      reorder={reorder}
      formProps={{
        fields,
        subject: "карточки",
        add,
        update
      }}
    />
  )
}

export default connect(state => state[cardsModule], cardsActionCreators)(Cards);

