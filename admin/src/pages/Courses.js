import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { moduleName as coursesModule, coursesActionCreators } from '@/store/ducks/courses';
import { moduleName as mastersModule, mastersActionCreators } from '@/store/ducks/masters';
import Table from '@/components/Table';
import Select from '@/components/Select';
import { Input, Textarea } from '@/elements';

const headers = [
  {
    name: '#',
    key: 'id',
  },
  {
    name: 'Название',
    key: 'title'
  },
  {
    name: 'Цена',
    key: 'price',
    render: item => `${item.price}₽`
  },
  {
    name: 'Скидка',
    key: 'discount',
    render: item => item.discount ? `${item.discount}%` : 'Нет'
  },
  {
    name: 'График',
    key: 'schedule',
    icon: 'schedule',
    modal: 'course-schedule',
    type: 'button'
  },
  {
    name: 'Теория',
    key: 'theory',
    icon: 'book',
    modal: 'course-theory',
    type: 'button'
  },
  {
    name: 'Практика',
    key: 'practice',
    icon: 'build',
    modal: 'course-practice',
    type: 'button'
  }
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
    Element: Select,
    label: 'Преподаватель',
    columns: 1,
    props: {
      name: 'teachersId',
      loadItems: mastersActionCreators.get,
      itemsPath: `${mastersModule}.masters`
    }
  },
  {
    Element: Input,
    label: 'Цена',
    columns: 1/2,
    props: {
      type: 'number',
      name: 'price',
    }
  },
  {
    Element: Input,
    label: 'Скидка',
    columns: 1/2,
    props: {
      type: 'number',
      name: 'discount',
    }
  },
  {
    Element: Input,
    label: 'Длительность',
    columns: 1/2,
    props: {
      type: 'number',
      name: 'duration',
    }
  },
  {
    Element: Input,
    label: 'Кол-во моделей',
    columns: 1/2,
    props: {
      type: 'number',
      name: 'modelsCount',
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

function Courses({ courses, get, add, update, remove, reorder }) {

  useEffect(() => {
    get({
      fields: '*'
    });
  }, []);

  return (
    <Table
      headers={headers}
      items={courses}
      remove={remove}
      update={update}
      reorder={reorder}
      formProps={{
        fields,
        subject: "курса",
        add,
        update
      }}
    />
  )
}

export default connect(state => state[coursesModule], coursesActionCreators)(Courses);

