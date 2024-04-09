import React, {useState} from 'react';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  useDndContext,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
} from '@dnd-kit/sortable';
import {CSS, } from '@dnd-kit/utilities';
import {Page} from './Components';
import './ContainerDraggable.css';
import pageStyles from './Components/ItemDraggable.module.css';
import { Button, Card, theme } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const measuring = {
    droppable: {
      strategy: 'Always',
    },
  };
  const Position = {
    Before: -1,
    After: 1,
  };

  const dropAnimation = {
    keyframes({transform}) {
        return [
          {transform: CSS.Transform.toString(transform.initial)},
          {
            transform: CSS.Transform.toString({
              scaleX: 0.98,
              scaleY: 0.98,
              x: transform.final.x - 10,
              y: transform.final.y - 10,
            }),
          },
        ];
      },
    sideEffects: defaultDropAnimationSideEffects({
      className: {
        active: pageStyles.active,
      },
    }),
  };
  
  export function ContainerDraggable({isDarkMode}) {
    const [activeId, setActiveId] = useState(null);
    const [items, setItems] = useState(() =>
      Array.from({ length: 20 }, (_, index) => `${index + 1}`)
    );
    const activeIndex = activeId ? items.indexOf(activeId) : -1;
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );
  
    const {
        token: { colorPrimary, colorPrimaryActive },
      } = theme.useToken();
    
  
    function handleDragStart(event) {
      const { active } = event;
      setActiveId(active.id);
    }
  
    function handleDragCancel() {
      setActiveId(null);
    }
  
    function handleDragEnd(event) {
      const { over } = event;
      if (over) {
        const overIndex = items.indexOf(over.id);

      if (activeIndex !== overIndex) {
        const newIndex = overIndex;

        setItems((items) => arrayMove(items, activeIndex, newIndex));
      }
    }

    setActiveId(null);
    }
  
    return (
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          sensors={sensors}
          collisionDetection={closestCenter}
          measuring={measuring}
        >
          <SortableContext items={items}>
            <Card style={{height:'100%', paddingBottom:'30px'}} headStyle={{backgroundColor:isDarkMode?colorPrimaryActive:colorPrimary, color:"white"}} bodyStyle={{overflow:'auto', backgroundColor:isDarkMode?'#2c2c2c':'#ededed', height:'100%'}} size="small" title="Small size card" extra={<Button type='text' icon={<CloseOutlined />} />}>
                <ul >
                {items.map((id, index) => (
                    <SortablePage
                    id={id}
                    index={index + 1}
                    key={id}
                    activeIndex={activeIndex}
                    onRemove={() =>
                        setItems((items) => items.filter((itemId) => itemId !== id))
                    }
                    />
                ))}
                </ul>
            </Card>
          </SortableContext>
          <DragOverlay dropAnimation={dropAnimation}>
            {activeId ? (
              <PageOverlay id={activeId} items={items} />
            ) : null}
          </DragOverlay>
        </DndContext>
      );
  }
  
  function PageOverlay({ id, items, ...props }) {
    const { activatorEvent, over } = useDndContext();
    const isKeyboardSorting = activatorEvent && activatorEvent.type === 'keyboard';
    const activeIndex = items.indexOf(id);
    const overIndex = over && over.id ? items.indexOf(over.id) : -1;
  
    return (
        <Page
          id={id}
          {...props}
          clone
          insertPosition={
            isKeyboardSorting && overIndex !== activeIndex
              ? overIndex > activeIndex
                ? Position.After
                : Position.Before
              : undefined
          }
        />
      );
  
  }
  
  function SortablePage({ id, activeIndex, ...props }) {
    const {
      attributes,
      listeners,
      index,
      isDragging,
      isSorting,
      over,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id, animateLayoutChanges: always });
  
    // const isDragging = sortable.isDragging;
    // const isSorting = sortable.isSorting;
    // const over = sortable.over;
    
    return (
        <Page
          ref={setNodeRef}
          id={id}
          active={isDragging}
          style={{
            transition,
            transform: isSorting ? undefined : CSS.Translate.toString(transform),
          }}
          insertPosition={
            over?.id === id
              ? index > activeIndex
                ? Position.After
                : Position.Before
              : undefined
          }
          {...props}
          {...attributes}
          {...listeners}
        />
      );
  
  }
  
  function always() {
    return true;
  }