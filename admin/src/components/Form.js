import React, { useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Text, Flex, Button, Title } from '@/elements';
import { ModalContext } from '@/components/Modal';

const StyledForm = styled.form`
  display: flex;
  justify-content: ${props => (props.center ? 'center' : 'space-between')};
  text-align: ${props => (props.center ? 'center' : 'left')};
  flex-wrap: wrap;
  padding: 1rem;
  max-width: 70vw;
  max-height: 90vh;
  overflow-y: auto;
`;

export default function Form({
  idKey,
  newItemIndex,
  item,
  fields,
  subject,
  add,
  update,
  actions = true,
  submit = true,
  ...rest
}) {
  const [newItem, setItem] = useState({ ...(item || {
    sort: newItemIndex,
  }) });

  const { close } = useContext(ModalContext);

  const cancel = useCallback(e => {
    e && e.preventDefault();
    close && close();
    setItem({ ...item });
  }, [item]);

  const getValue = useCallback((value, type) => {
    switch (type) {
      case 'number':
        return +value;
      default:
        return value;
    }
  }, []);

  const save = e => {
    e.preventDefault();
    const data = fields.reduce((result, { props: { name, type } }) => Object.assign(result, {[name]: getValue(newItem[name], type)}), {});
    if (newItem[idKey]) {
      data[idKey] = newItem[idKey];
      update(data);
    } else {
      add(data);
    }

    // TODO: then cancel (when success) + validation needed
    cancel();
  };

  const setValue = (prop, onChange) => e => {
    setItem({ ...newItem, [prop]: e && e.target ? e.target.value : e });
    if (onChange) {
      onChange(update, newItem);
    }
  };

  return (
    <StyledForm {...rest}>
      <Title flex="1" mb="2rem">
        {newItem[idKey] ? 'Редактирование' : 'Добавление'} {subject}
      </Title>
      {fields.map(({ Element, props, label, columns = 1, onChange, wrapperProps = {} }) => (
        <Flex.Item
          basis={`${columns * 100 - (columns === 1 ? 0 : 2)}%`}
          mb="2rem"
          key={props.name}
            {...wrapperProps}
        >
          <Text mb="5px" p="4px" dangerouslySetInnerHTML={{ __html: label }} />
          <Element
            value={newItem[props.name]}
            id={newItem[idKey]}
            onChange={setValue(props.name, onChange)}
            {...props}
          />
        </Flex.Item>
      ))}
      {actions && (
        <Flex asc aic jcc mt="4rem" flex="1">
          {submit && (
            <Button color="gray" mr="1rem" onClick={cancel}>
              Отмена
            </Button>
          )}
          <Button color="primary" onClick={submit ? save : cancel}>
            {submit ? 'Сохранить' : 'ОК'}
          </Button>
        </Flex>
      )}
    </StyledForm>
  );
}
