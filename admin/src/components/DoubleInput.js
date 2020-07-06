import React, { useState, useEffect } from 'react';
import { Input, Flex, Icon } from '@/elements';

export default function DoubleInput({
  left,
  right,
  onSave,
  onDelete,
  leftDisabled,
  rightDisabled,
  leftEl,
  rightEl,
  ...rest
}) {
  const [data, setData] = useState([left, right]);
  useEffect(() => {
    setData([left, right]);
  }, [left, right]);
  const [isEditing, setEditing] = useState(false);
  const change = n => e =>
    setData(n === 0 ? [e.target.value, right] : [left, e.target.value]);
  const toggleEditing = () => {
    if (isEditing) {
      onSave(data);
    }
    setEditing(!isEditing);
  };

  return (
    <Flex {...rest} aic>
      {leftEl || (
        <Input
          onChange={change(0)}
          value={data[0]}
          disabled={!isEditing || leftDisabled}
        />
      )}
      {rightEl || <Input
        onChange={change(1)}
        value={data[1]}
        disabled={!isEditing || rightDisabled}
        mr="0.5rem"
      />}
      {onSave && (
        <Icon onClick={toggleEditing} color="primary">
          {isEditing ? 'save' : 'edit'}
        </Icon>
      )}
      {onDelete && (
        <Icon onClick={onDelete} color="red">
          delete
        </Icon>
      )}
    </Flex>
  );
}
