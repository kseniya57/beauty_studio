import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { moduleName as settingsModule,  settingsActionCreators } from '@/store/ducks/settings';
import Table from '@/components/Table';
import Editor from "@/components/Editor";

const headers = [
    {
        name: 'Название',
        key: 'name',
    },
    {
        name: 'Текст',
        key: 'value',
        render: ({ value }) => value && value.length > 100 ? value.slice(0, 100) + '...' : value,
        type: 'html'
    },
];

const fields = [
    {
        Element: Editor,
        label: 'Текст',
        columns: 1,
        props: {
            name: 'value',
        }
    },
];

const textsConfig = [
    {
        key: 'coursesInfoText',
        name: 'Информация об окончании курса'
    },
    {
        key: 'policy',
        name: 'Политика конфиденциальности'
    },
    {
        key: 'vacanciesText',
        name: 'Текст на странице вакансий'
    }
];

function Texts({ settings, update }) {

    const [texts, setTexts] = useState([]);

    useEffect(() => {
        setTexts(textsConfig.map(item => ({...item, value: settings[item.key] || ''})))
    }, [settings]);

    const handleUpdate = useCallback(({ key, value = '' }) => {
        setTexts(texts.map(item => item.key === key ? {...item, value } : item));
        update({ key, value });
    }, [texts, update]);

    return (
        <Table
            headers={headers}
            items={texts}
            update={handleUpdate}
            idKey="key"
            formProps={{
                fields,
                subject: "текста",
                update: handleUpdate
            }}
        />
    )
}

export default connect(state => ({
    settings: state[settingsModule].settings
}),  settingsActionCreators)(Texts);

