import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { moduleName as mastersModule, mastersActionCreators } from '@/store/ducks/masters';
import Table from '@/components/Table';
import { Input, Textarea } from '@/elements';
import PhotoInput from '@/components/PhotoInput';

const headers = [
  {
    name: '#',
    key: 'id'
  },
  {
    name: 'Имя',
    key: 'name'
  },
  {
    name: 'Роль',
    key: 'role'
  },
  {
    name: 'Фото',
    key: 'photo',
    type: 'image'
  },
  {
    name: 'Услуги',
    key: 'services',
    icon: 'room_service',
    modal: 'master-services',
    type: 'button'
  }
];

const fields = [
  {
    Element: PhotoInput,
    columns: 1,
    props: {
      name: 'photo',
      owner: 'masters',
      width: 300,
      height: 300,
      isRounded: true,
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
    label: 'Имя',
    columns: 1,
    props: {
      name: 'name',
    }
  },
  {
    Element: Input,
    label: 'Роль',
    columns: 1,
    props: {
      name: 'role',
    }
  },
  {
    Element: Input,
    label: 'Dikidi ID',
    columns: 1,
    props: {
      name: 'dikidiId',
      type: 'number'
    }
  },
  {
    Element: Textarea,
    label: 'Описание',
    columns: 1,
    props: {
      name: 'description',
    }
  }
];

function Masters({ masters, get, add, update, remove, reorder }) {

  useEffect(() => {
    get();
  }, []);

  return (
    <Table
      headers={headers}
      items={masters}
      remove={remove}
      update={update}
      reorder={reorder}
      formProps={{
        fields,
        subject: "мастера",
        add,
        update
      }}
    />
  )
}

export default connect(state => state[mastersModule], mastersActionCreators)(Masters);

