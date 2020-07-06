import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { API_URL } from '../constants';

const StyledImage = styled.img`
    width: ${props => props.autoWidth ? 'auto' : '100%'};
    max-width: 100%;
`;

export default function Image({ source, isLocal, ...rest }) {
    return <StyledImage
      src={isLocal ? source : `${API_URL}/${_.get(source, 'name', source)}`}
      onError={() => null}
      alt=""
      {...rest}
    />
}


Image.propTypes = {
    source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    isLocal: PropTypes.bool,
    autoWidth: PropTypes.bool
};

Image.defaultProps = {
    isLocal: false,
    autoWidth: false
};
