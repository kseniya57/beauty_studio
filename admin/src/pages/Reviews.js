import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { moduleName as reviewsModule,  reviewsActionCreators } from '@/store/ducks/reviews';
import Table from '@/components/Table';
import {Input, Textarea} from "@/elements";
import Checkbox from '@/components/Checkbox';

const Stars = styled.span`
    color: #fc0;
`;

const headers = [
    {
        name: '#',
        key: 'id'
    },
    {
        name: 'Удовлетворенность',
        key: 'stars',
        // eslint-disable-next-line react/display-name
        render: ({ stars }) => <Stars>{'★'.repeat(stars)}</Stars>
    },
    {
        name: 'Отзыв',
        key: 'text',
        render: ({ text }) => text.length > 100 ? text.slice(0, 100) + '...' : text,
    },
    {
        name: 'Автор',
        key: 'author'
    },
    {
        name: 'Показывать',
        key: 'isShown',
        type: 'checkbox'
    }
];

const fields = [
    {
        Element: Input,
        label: 'Автор',
        columns: 1,
        props: {
            name: 'author',
        }
    },
    {
        Element: Textarea,
        label: 'Текст',
        columns: 1,
        props: {
            name: 'text',
        }
    },
    {
        Element: Input,
        label: 'Удовлетворенность',
        columns: 1,
        props: {
            name: 'stars',
            type: 'number',
            min: 0,
            max: 5,
        }
    },
    {
        Element: Checkbox,
        label: 'Показывать в отзывах',
        columns: 1,
        props: {
            name: 'isShown',
        }
    },
];

function Reviews({  reviews, get, remove, update, add, reorder }) {

    useEffect(() => {
        get();
    }, []);

    return (
        <Table
            headers={headers}
            items={reviews}
            remove={remove}
            update={update}
            reorder={reorder}
            formProps={{
                fields,
                subject: "отзыва",
                add,
                update
            }}
        />
    )
}

export default connect(state => state[reviewsModule],  reviewsActionCreators)(Reviews);

