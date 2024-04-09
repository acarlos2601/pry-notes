import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';

import {
  closestCenter,
  DragOverlay,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  defaultAnimateLayoutChanges,
} from '@dnd-kit/sortable';
// import { createRange } from '../../utilities';
import { Item, Wrapper } from './common';
import { Button, Modal, theme } from 'antd';
import { TipoCambioProceso } from 'constantes/PrincipalNoteProcessType';
import { ExclamationCircleFilled } from '@ant-design/icons';

const TRASH_ID = 'void';

export function Sortable({
  isDarkMode,
  widthPadding,
  activationConstraint,
  animateLayoutChanges =defaultAnimateLayoutChanges,
  adjustScale = false,
  Container,
  coordinateGetter = sortableKeyboardCoordinates,
  dropAnimation,
  getItemStyles = () => ({}),
  getNewIndex,
  handle = false,
  items,
  onChange,
  isDisabled = () => false,
  measuring,
  modifiers,
  removable=true,
  renderItem,
  strategy = rectSortingStrategy,
  style,
  useDragOverlay = true,
  wrapperStyle = () => ({}),
}) {
  
  const {
    token: { colorBgContainer, colorText},
  } = theme.useToken();
  
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint,
    }),
    useSensor(TouchSensor, {
      activationConstraint,
    }),
    useSensor(KeyboardSensor, {
      scrollBehavior: 'Cypress' in window ? 'auto' : undefined,
      coordinateGetter,
    })
  );
  const isFirstAnnouncement = useRef(true);
  const getIndex = (id) => items.findIndex(item => item.id === id) ;
  const activeIndex = activeId ? getIndex(activeId) : -1;
  const lastOverId = useRef(null);
  const handleRemove = removable
    ? (id) =>
        console.log(id)//setItems((items) => items.filter((item) => item !== id))
    : undefined;
  const cancelDrop = async ({ over }) => {
    console.log('cancel')
    if (!over || over?.data.current != null) {
        return false;
    }

    document.body.style.cursor = '';
    const confirmed = await new Promise((resolve) => {
      Modal.confirm({
        styles:{ content:{backgroundColor:colorBgContainer}, mask:{ backdropFilter: 'blur(5px)' }},
        centered:true,
        title: <span style={{color:colorText}}>¿Desea eliminar el item seleccionado?</span>,
        icon: <ExclamationCircleFilled />,
        content: <span style={{color:colorText}}>El item se eliminará de la lista</span>,
        onOk() {
          resolve(true);
        },
        onCancel() {
          resolve(false);
        },
      });
    });

    return !confirmed;
};

const onDragCancel = () => { 
    setActiveId(null);
 };


  useEffect(() => {
    if (!activeId) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({active}) => {
        if (!active) {
          return;
        }

        setActiveId(active.id);
      }}
      onDragEnd={({over}) => {
        setActiveId(null);
        if (over.id) {
          if (over.id === TRASH_ID) {
            const updatedItemsAfterDelete = items.reduce((acc, item) => {
              if (item.id !== activeId) {
                acc.push({ ...item, index: acc.length });
              }
              return acc;
            }, []);
            onChange({type:TipoCambioProceso.DELETE_NOTE_ACTION, value: updatedItemsAfterDelete });
            return;
          }

          const overIndex = getIndex(over.id);
          if (activeIndex !== overIndex) {
            // if (activeIndex !== overIndex) {
            const updatedItemsAfterMove = arrayMove(items, activeIndex, overIndex);
            for (let i = Math.min(activeIndex, overIndex); i <= Math.max(activeIndex, overIndex); i++) {
              updatedItemsAfterMove[i] = { ...updatedItemsAfterMove[i], index: i };
            }
            onChange({type:TipoCambioProceso.CHANGE_NOTE_ACTION, value: updatedItemsAfterMove })

          // }
          }
        }
        
      }}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      measuring={measuring}
      modifiers={modifiers}
    >

      <Wrapper style={style} center>
        <SortableContext items={items} strategy={strategy}>
          <Container hover={activeId} lowItems={items.length <=5}>
            {items.map((value, index) => (
              <SortableItem
                key={value.id}
                id={value.id}
                value={value}
                handle={handle}
                onChange={onChange}
                index={index}
                style={getItemStyles}
                wrapperStyle={wrapperStyle}
                disabled={isDisabled(value)}
                renderItem={renderItem}
                onRemove={handleRemove}
                animateLayoutChanges={animateLayoutChanges}
                useDragOverlay={useDragOverlay}
                getNewIndex={getNewIndex}
              />
            ))}
          </Container>
        </SortableContext>
      </Wrapper>
      {createPortal(
            <DragOverlay
              adjustScale={adjustScale}
              dropAnimation={dropAnimation}
            >
              {activeId ? (
                renderSortableItemDragOverlay(items,activeIndex,activeId, handle, renderItem, wrapperStyle, getItemStyles)
              ) : null}
            </DragOverlay>,
            document.body
          )}
    {activeId && (
        <Trash id={TRASH_ID} isDarkMode={isDarkMode} widthPadding={widthPadding} />
      ) }
    </DndContext>
  );
}

function renderSortableItemDragOverlay(items, activeIndex, activeId, handle, renderItem, wrapperStyle, getItemStyles ) { 
    return (
        <Item
            value={items[activeIndex]}
            handle={handle}
            renderItem={renderItem}
            wrapperStyle={wrapperStyle({
              active: {id: activeId},
              index: activeIndex,
              isDragging: true,
              id: items[activeIndex].id,
            })}
            style={getItemStyles({
              id: items[activeIndex].id,
              index: activeIndex,
              isSorting: activeId !== null,
              isDragging: true,
              overIndex: -1,
              isDragOverlay: true,
            })}
            dragOverlay
        />
      );
   }

function Trash({ id, isDarkMode, widthPadding }) { 
    const {setNodeRef, isOver} = useDroppable({
        id,
      });
    
      return (
        <Button
            ref={setNodeRef}
            danger
            type={isDarkMode?"primary":"dashed"}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                left: `calc(50% + ${widthPadding}px)`,
                marginLeft: -150,
                bottom: 15,
                width: 300,
                height: 60,
                borderRadius: 5,
                border: isDarkMode?'0px':'1px dashed',
                // border: '1px solid',
                backgroundColor: isOver ? '#ff7875' : undefined,
                color: isDarkMode? undefined: isOver ? 'rgb(255 255 255)' : '#ff4d4f',
                borderColor: isOver ? 'rgb(255 255 255)' : '#ff4d4f',
            }}
        >
            Drop here to delete
        </Button>
    );
 }

export function SortableItem({
  disabled,
  animateLayoutChanges,
  getNewIndex,
  handle,
  id,
  index,
  onRemove,
  onChange,
  style,
  renderItem,
  value,
  wrapperStyle,
}) {
  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    overIndex,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
    disabled,
    getNewIndex,
  });

  return (
    <Item
      ref={setNodeRef}
      value={value}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      onChange={onChange}
      handleProps={
        handle
          ? {
              ref: setActivatorNodeRef,
            }
          : undefined
      }
      renderItem={renderItem}
      index={index}
      style={style({
        index,
        id,
        isDragging,
        isSorting,
        overIndex,
      })}
      onRemove={onRemove ? () => onRemove(id) : undefined}
      transform={transform}
      transition={transition}
      wrapperStyle={wrapperStyle?.({index, isDragging, active, id})}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={false && isDragging}//!useDragOverlay && 
      {...attributes}
    />
  );
}