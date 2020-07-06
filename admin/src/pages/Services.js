import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { moduleName as  servicesModule,  servicesActionCreators } from '@/store/ducks/services';
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
];

function Services({  services, get, add, update, remove, reorder }) {

  useEffect(() => {
    get();
  }, []);

  return (
    <Table
      headers={headers}
      items={services}
      remove={remove}
      update={update}
      reorder={reorder}
      formProps={{
        fields,
        subject: "услуги",
        add,
        update
      }}
    />
  )
}

export default connect(state => state[ servicesModule],  servicesActionCreators)(Services);

