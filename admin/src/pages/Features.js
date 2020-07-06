import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { moduleName as featuresModule, featuresActionCreators } from '@/store/ducks/features';
import Table from '@/components/Table';
import { Input, Textarea } from '@/elements';
import PhotoInput from "@/components/PhotoInput";

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
    name: 'Картинка',
    key: 'image',
    type: 'image'
  },
  {
    name: 'Иконка',
    key: 'icon',
    type: 'icon'
  },
  {
    name: 'Цвет',
    key: 'iconColor',
    type: 'color'
  },
];

const fields = [
  {
    Element: PhotoInput,
    columns: 1,
    props: {
      name: 'image',
      owner: 'features'
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
    columns: 1,
    props: {
      name: 'name',
    }
  },
  {
    Element: Input,
    label: 'Иконка (<a href="https://material.io/tools/icons/?style=baseline" target="_blank">Material icons</a>)',
    columns: 1 / 2,
    props: {
      name: 'icon',
    }
  },
  {
    Element: Input,
    label: 'Цвет',
    columns: 1 / 2,
    props: {
      type: 'color',
      name: 'iconColor',
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
];

function Features({ features, get, add, update, remove, reorder }) {

  useEffect(() => {
    get();
  }, []);

  return (
    <Table
      headers={headers}
      items={features}
      remove={remove}
      update={update}
      reorder={reorder}
      formProps={{
        fields,
        subject: "особенности",
        add,
        update
      }}
    />
  )
}

export default connect(state => state[featuresModule], featuresActionCreators)(Features);

