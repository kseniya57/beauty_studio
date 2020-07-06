import React from 'react';
import { connect } from 'react-redux';
import {
  moduleName as settingsModule,
  settingsActionCreators
} from '@/store/ducks/settings';
import DoubleInput from '@/components/DoubleInput';

const settingsMap = {
  appName: 'Название',
  city: 'Город',
  email: 'E-Mail',
  lastTime: 'Время последней записи',
  period: 'Период существования',
  phone: 'Телефон',
  workTimeInterval: 'Время работы',
  title: 'Meta title',
  description: 'Meta описание',
  keywords: 'Meta ключевые слова',
  'og:type': 'Meta og:type',
  'og:url': 'Meta og:url',
  'og:site_name': 'Meta og:site_name',
};

function Settings({ settings, update }) {
  return (
    <div className={'fullwidth'}>
      {Object.entries(settingsMap).map(([key, text]) => (
        <DoubleInput
          key={key}
          left={text}
          right={settings[key]}
          leftDisabled={true}
          onSave={(values) => update({ key, value: values[1] })}
        />
      ))}
    </div>
  );
}

export default connect(
  state => state[settingsModule],
  settingsActionCreators
)(Settings);
