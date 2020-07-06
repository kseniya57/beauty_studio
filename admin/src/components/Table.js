import React, { useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from '@/components/Modal';
import Form from '@/components/Form';
import Image from '@/components/Image';
import Checkbox from '@/components/Checkbox';
import { FloatingButton, Icon } from '@/elements';
import { ModalsContext } from '@/components/Modals';

const StyledTable = styled.table`
  width: 100%;
  border-radius: 0.5rem;
  border-collapse: collapse;
  overflow: hidden;
  table-layout: fixed;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  background:
    repeating-linear-gradient(
        transparent,transparent 20px, #195826 22px
        ),
    repeating-linear-gradient(
        90deg,
        transparent,transparent 20px, #195826 22px
        );
  tr {
    height: 6rem;
    font-size: 1.3rem;
    cursor: grab;
    display: table-row;
    user-select: none;
    background-color: #fff;
    
    &:not(:last-child) {
      border-bottom: 0.6px solid rgba(#8a97a6, 0.3);
    }
  }

  thead {
    tr {
      color: #ffffff;
      background-color: #195826;
    }
  }

  td,
  th {
    padding: 1rem 0;
    vertical-align: middle;
    text-align: center;
    display: table-cell;
  }

  img {
    width: 7rem;
  }
`;

const ColorBox = styled.div`
  display: inline-block;
  width: 35px;
  height: 35px;
  background-color: ${props => props.value};
`;

const triggerId = 'item-modal-trigger';

const ModalTrigger = (
  <FloatingButton
    id={triggerId}
    bottom="1rem"
    right="1rem"
    color="primary"
    size={4}
  >
    <Icon color="white">add</Icon>
  </FloatingButton>
);

const getItemStyle = (isDragging, draggableStyle) => isDragging ? ({
  display: 'flex',
  justifyContent: 'space-between',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
  padding: '1rem',
  ...draggableStyle
}) : draggableStyle;


const gettUpdateMap = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  const minIndex = Math.min(startIndex, endIndex);
  const maxIndex = Math.max(startIndex, endIndex);

  return result.slice(minIndex, maxIndex + 1).reduce((map, item, index) => Object.assign(map, {[item.id]: minIndex + 1 + index}), {});
};

export default function Table({ headers, items, formProps, remove, update, idKey, reorder }) {
  const [currentItem, setCurrentItem] = useState(null);

  const startEditing = item => {
    setCurrentItem(item);
    document.getElementById(triggerId).click();
  };

  const { openModal } = useContext(ModalsContext);

  const renderCell = (item, props) => {
    const { key, style } = props;
    switch (props.type) {
      case 'image':
        return <Image wrapperProps={{ style }} source={item[key]} />;
      case 'icon':
        return <Icon style={style}>{item[key]}</Icon>;
      case 'checkbox':
        return (
          <Checkbox
            style={style}
            checked={item[key] === 1}
            onChange={() =>
              update({
                [idKey]: item[idKey],
                [key]: item[key] === 1 ? 0 : 1
              })
            }
          />
        );
      case 'color':
        return (
            <ColorBox value={item[key]}/>
        );
      case 'button':
        return (
          <Icon
            style={style}
            color={props.color}
            onClick={() => openModal({ modal: props.modal, props: item })}
          >
            {props.icon}
          </Icon>
        );
      case 'html':
        return <div dangerouslySetInnerHTML={{__html: props.render
              ? props.render(item)
              : item[key]}} />
      default:
        return props.render
          ? props.render(item)
          : item[key];
    }
  };

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) {
      return;
    }
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    reorder({
      startIndex,
      endIndex,
      updateMap: gettUpdateMap(items, startIndex, endIndex)
    });
  }, [items]);

  return (
    <React.Fragment>
      {items && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                  <StyledTable
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                  >
                    <thead>
                    <tr>
                      {headers.map(item => (
                          <th key={item.name}>{item.name}</th>
                      ))}
                      <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={`${item[idKey]}`}
                            index={index}
                            isDragDisabled={!reorder}
                        >
                          {(provided, snapshot) => (
                        <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}
                        >
                          {headers.map(header => (
                              <td key={`${header.name}-${item[idKey]}`}>
                                {renderCell(item, header)}
                              </td>
                          ))}
                          {(formProps || remove) && <td>
                            {formProps && <Icon color="info" onClick={() => startEditing(item)}>
                              edit
                            </Icon>}
                            {remove && <Icon color="error" onClick={() => remove(item[idKey])}>
                              delete
                            </Icon>}
                          </td>}
                        </tr>)}
                        </Draggable>
                    ))}
                    </tbody>
                  </StyledTable>
              )}
            </Droppable>
          </DragDropContext>
      )}
      {formProps && (
        <Modal trigger={ModalTrigger} onClose={() => setCurrentItem(null)}>
          <Form {...formProps} idKey={idKey} item={currentItem} newItemIndex={items.length} />
        </Modal>
      )}
    </React.Fragment>
  );
}

Table.defaultProps = {
  idKey: 'id'
}