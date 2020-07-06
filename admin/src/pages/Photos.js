import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  moduleName as photosModule,
  photosActionCreators
} from '@/store/ducks/photos';
import Table from '@/components/Table';
import PhotoInput from '@/components/PhotoInput';

const headers = [
  {
    name: '#',
    key: 'id'
  },
  {
    name: 'Фото',
    key: 'name',
    type: 'image'
  },
];

const fields = [
  {
    Element: PhotoInput,
    columns: 1,
    props: {
      name: 'name'
    }
  }
];

function Photos({ photos, get, add, update, remove, reorder }) {
  useEffect(() => {
    get();
  }, []);

  return (
    <Table
      headers={headers}
      items={photos}
      remove={remove}
      update={update}
      reorder={reorder}
      formProps={{
        fields,
        subject: 'фотографии',
        add,
        update,
        center: true,
        submit: false
      }}
    />
  );
}

export default connect(
  state => state[photosModule],
  photosActionCreators
)(Photos);
