import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { moduleName as addressesModule, addressesActionCreators } from '@/store/ducks/addresses';
import Table from '@/components/Table';
import { Input } from '@/elements';

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
    name: 'Метро',
    key: 'subway',
  },
];

const fields = [
  {
    Element: Input,
    label: 'Название',
    columns: 1,
    props: {
      name: 'name',
    }
  },
  {
    Element: Input,
    label: 'Адрес',
    columns: 1,
    props: {
      name: 'address',
    }
  },
  {
    Element: Input,
    label: 'Метро',
    columns: 1/2,
    props: {
      name: 'subway',
    }
  },
  {
    Element: Input,
    label: 'Цвет',
    columns: 1/2,
    props: {
      name: 'color',
      type: 'color'
    }
  },
  {
    Element: Input,
    label: 'Широта',
    columns: 1 / 2,
    props: {
      name: 'lat',
      type: 'number'
    }
  },
  {
    Element: Input,
    label: 'Долгота',
    columns: 1 / 2,
    props: {
      name: 'lng',
      type: 'number'
    }
  },
];

function Addresses({ addresses, get, add, update, remove, reorder }) {

  useEffect(() => {
    get();
  }, []);

  return (
    <Table
      headers={headers}
      items={addresses}
      remove={remove}
      update={update}
      reorder={reorder}
      formProps={{
        fields,
        subject: "адреса",
        add,
        update
      }}
    />
  )
}

export default connect(state => state[addressesModule], addressesActionCreators)(Addresses);

