import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from '@/elements';
import vk from '@/assets/icons/vk.svg';
import instagram from '@/assets/icons/instagram.svg';
import { track } from '@/utils';

const icons = {
  vk,
  instagram,
};

export default function SocialIcon({ link, name, size }) {
    return (
      <Circle as="a" href={link} target="_blank" color="base" size={size} mr="1rem" onClick={track(name)}>
        <img src={icons[name]} style={{ width: `${size / 2}rem` }} alt={name}/>
      </Circle>
    )
}

SocialIcon.propTypes = {
    link: PropTypes.string.isRequired,
    name: PropTypes.string,
    size: PropTypes.number
};

SocialIcon.defaultProps = {
    size: 4,
};