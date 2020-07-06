import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { moduleName as faqModule, faqActionCreators } from '@/store/ducks/faq';
import Table from '@/components/Table';
import { Textarea } from '@/elements';

const headers = [
  {
    name: '#',
    key: 'id'
  },
  {
    name: 'Вопрос',
    key: 'question'
  },
  {
    name: 'Ответ',
    key: 'answer'
  },
];

const fields = [
  {
    Element: Textarea,
    label: 'Вопрос',
    columns: 1,
    props: {
      name: 'question',
    }
  },
  {
    Element: Textarea,
    label: 'Ответ',
    columns: 1,
    props: {
      name: 'answer',
    }
  }
];

function Faq({ faq, get, add, update, remove, reorder }) {

  useEffect(() => {
    get();
  }, []);

  return (
    <Table
      headers={headers}
      items={faq}
      remove={remove}
      update={update}
      reorder={reorder}
      formProps={{
        fields,
        subject: "вопроса и ответа",
        add,
        update
      }}
    />
  )
}

export default connect(state => state[faqModule], faqActionCreators)(Faq);

