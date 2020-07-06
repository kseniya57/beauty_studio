import React from 'react';
import styled from 'styled-components';
import { API_URL } from '../constants';
import Icon from '../elements/Icon';

const ImageWrapper = styled.div`
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const DeleteIcon = styled(Icon)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  transition: color 0.3s ease;
  color: #606266;
  &:hover {
    color: #000000;
  }
`;

// TODO: onError
export default function Image({
  source,
  local,
  onDelete,
  wrapperProps = {},
  ...rest
}) {
  return (
    <ImageWrapper {...wrapperProps}>
      {onDelete && <DeleteIcon onClick={onDelete}>close</DeleteIcon>}
      <StyledImage
        src={local ? source : `${API_URL}/${source}`}
        onError={() => null}
        alt=""
        {...rest}
      />
    </ImageWrapper>
  );
}
