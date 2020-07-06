import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  moduleName as socialModule,
  socialActionCreators
} from '@/store/ducks/social';
import Table from '@/components/Table';
import { Input } from '@/elements';
import PhotoInput from '@/components/PhotoInput';

const headers = [
  {
    name: '#',
    key: 'id'
  },
  {
    name: 'Название',
    key: 'name'
  },
  {
    name: 'Иконка',
    key: 'icon',
    type: 'image',
    style: {
      width: '5rem',
      height: '5rem',
      backgroundColor: '#000',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto'
    }
  },
  {
    name: 'Ссылка',
    key: 'link',
    type: 'link'
  }
];

const fields = [
  {
    Element: PhotoInput,
    columns: 1,
    props: {
      name: 'icon'
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
    Element: Input,
    label: 'Название',
    columns: 1 / 2,
    props: {
      name: 'name'
    }
  },
  {
    Element: Input,
    label: 'Ссылка',
    columns: 1 / 2,
    props: {
      name: 'link'
    }
  }
];

function Social({ social, get, add, update, remove, reorder }) {
  useEffect(() => {
    get();
  }, []);

  return (
    <Table
      headers={headers}
      items={social}
      remove={remove}
      update={update}
      reorder={reorder}
      formProps={{
        fields,
        subject: 'социальной сети',
        add,
        update
      }}
    />
  );
}

export default connect(
  state => state[socialModule],
  socialActionCreators
)(Social);
