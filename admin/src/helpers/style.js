const globalModifiers = {
  m: 'margin: ',
  p: 'padding: ',
  mb: 'margin-bottom: ',
  mt: 'margin-top: ',
  mr: 'margin-right: ',
  flex: 'flex: ',
  color: (props, value) => `background-color: ${props.theme[value] || value};`,
  fontColor: (props, value) => `color: ${props.theme[value] || value};`,
};

export const applyModifiers = (modifiers = {}) => (props) => Object.keys(props)
  .reduce((acc, key) => {
    const modifier = modifiers[key] || globalModifiers[key];
    return acc + (props[key] === true
      ? `${modifier};`
      : modifier && props[key]
        ? typeof modifier === 'function' ? modifier(props, props[key]) : `${modifier}${props[key]};`
        : '')
  }, '');
