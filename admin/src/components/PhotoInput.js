import React, { useState, useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Icon } from '@/elements';
import { connect } from 'react-redux';
import { upload, moduleName as photosModule } from '@/store/ducks/photos';
import Image from '@/components/Image';
import { ModalsContext } from '@/components/Modals';

const StyledPhotoInput = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 1rem;
  border: 3px solid #8a97a6;
  width: ${props => props.size}rem;
  height: ${props => props.size}rem;
  margin: ${props => props.margin || 0}rem;
  .image {
    border-radius: 1rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  & > input {
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: pointer;
  }
`;

function PhotoInput({
  size = 20,
  upload,
  relation,
  relatedId,
    owner,
  value,
  id,
  withEditor = true,
    width,
    height,
    isRounded,
    onChange,
    photo,
    name,
  ...rest
}) {
  const [src, setSrc] = useState(value);

  useEffect(() => {
    if (photo) {
      onChange(photo.name)
    }
  }, [photo]);


  const { openModal } = useContext(ModalsContext);

  const handleEndEditing = useCallback((fileName) => (blob, newSrc) => {
    setSrc(newSrc);
    const formData = new FormData();
    formData.append('file', blob, fileName);
    formData.append('param', name);
    if (relation) {
      formData.append('relation', relation);
      formData.append('relatedId', relatedId);
    }
    if (owner) {
      formData.append('owner', owner);
    }
    if (id) {
      formData.append('id', id);
    }
    upload(formData);
  }, [])

  const handleChange = e => {
    const file = e.target.files[0];

      const reader = new FileReader();

      reader.onloadend = () => {
        if (withEditor) {
          openModal({ modal: 'imageEditor', props: { src: reader.result, onDone: handleEndEditing(file.name), width, height, isRounded } });
        } else {
          handleEndEditing(file.name)(file, reader.result);
        }
      };

      if (file) {
        reader.readAsDataURL(file);
      }
  };

  return (
    <StyledPhotoInput size={size} {...rest}>
      {src ? (
        <Image
          wrapperProps={{ className: 'image' }}
          source={src}
          local={src !== value}
        />
      ) : (
        <Icon size={`${size / 3}rem`} color="#8A97A6">
          add_a_photo
        </Icon>
      )}
      <input type="file" name="file" onChange={handleChange} />
    </StyledPhotoInput>
  );
}

PhotoInput.defaultProps = {
  onChange: () => {},
};

export default connect(
  state => ({
    photo: state[photosModule].photo,
  }),
  { upload }
)(PhotoInput);
