import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import _ from 'lodash';
import { Input } from '@/elements';
import { StyledSelect, Menu, OptionsContainer, Option } from './styled.js';

const stopPropagation = e => {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
};

const MAX_VISIBLE_OPTIONS_COUNT = 7;

function Select({onChange, value: providedValue, items: providedItems, loadItems, itemsPath, valueKey, labelKey, menuHeight, ...rest }) {
  const [isOpen, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [value, setValue] = useState('');
  const [items, setItems] = useState(providedItems);
  const [filteredItems, setFilteredItems] = useState(providedItems);

  useEffect(() => {
    if (loadItems && !providedItems.length) {
      loadItems();
    }
  }, [providedItems, loadItems, itemsPath]);

  useEffect(() => {
    setItems(providedItems);
    setFilteredItems(providedItems);
  }, [providedItems]);

  useEffect(() => {
    if (items.length) {
      setValue(_.get(items.find(item => item[valueKey] === providedValue), labelKey, ''));
    }
  }, [items, providedValue]);


  const set = item => {
    onChange(item[valueKey]);
    setValue(item[labelKey]);
    setActive(-1);
    setOpen(false);
  };

  const handleKeyDown = e => {
    switch (e.keyCode) {
      case 13:
        return set(active);
      case 38:
        return setActive(active === 0 ? items.length - 1 : active - 1);
      case 40:
        return setActive(active === items.length - 1 ? 0 : active + 1);
    }
  };

  const handleChange = e => {
    const { value } = e.target;
    setValue(value);
    setFilteredItems(
      items.filter(item => item[labelKey].startsWith(value))
    );
  };

  return (
    <StyledSelect>
      <Input
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={value}
        {...rest}
      />
      {isOpen && items.length > 0 && <Menu
          onClick={stopPropagation}
      >
        <OptionsContainer
            height={
              !loadItems &&
              filteredItems.length < MAX_VISIBLE_OPTIONS_COUNT
                  ? 0
                  : menuHeight
            }
        >
          {filteredItems.map((option, index) => (
              <Option
                  key={index}
                  value={option[valueKey]}
                  isFocused={index === active}
                  isActive={providedValue && option[valueKey] === providedValue}
                  onClick={() => set(option)}
                  onMouseEnter={() => setActive(index)}
              >
                {option[labelKey]}
              </Option>
          ))}
        </OptionsContainer>
      </Menu>}
    </StyledSelect>
  );
}

Select.defaultProps = {
  items: [],
  itemsPath: 'payload',
  valueKey: 'id',
  labelKey: 'name',
  menuHeight: 200,
};

const mapStateToProps = (state, props) => (props.loadItems ? {
  items: _.get(state, props.itemsPath)
} : {});

const mapDispatchToProps = (dispatch, props) => (props.loadItems ? {
  loadItems: bindActionCreators(props.loadItems, dispatch),
} : {});

export default connect(mapStateToProps, mapDispatchToProps)(Select)
