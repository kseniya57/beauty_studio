import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    moduleName as vacanciesModule,
    vacanciesActionCreators
} from '@/store/ducks/vacancies';
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
    }
];

const fields = [
    {
        Element: Input,
        label: 'Название',
        columns: 1,
        props: {
            name: 'name'
        }
    }
];

function Vacancy({ vacancies, get, add, update, remove, reorder }) {
    useEffect(() => {
        get();
    }, []);

    return (
        <Table
            headers={headers}
            items={vacancies}
            remove={remove}
            update={update}
            reorder={reorder}
            formProps={{
                fields,
                subject: 'вакансии',
                add,
                update
            }}
        />
    );
}

export default connect(
    state => state[vacanciesModule],
    vacanciesActionCreators
)(Vacancy);
