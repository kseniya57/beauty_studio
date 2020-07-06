import React from 'react';
import PropTypes from 'prop-types';

export default function Email({ email, subject }) {
    return <a href={`mailto:${email}?subject=${subject}`}>{email}</a>
}

Email.propTypes = {
    email: PropTypes.string,
    subject: PropTypes.string
};