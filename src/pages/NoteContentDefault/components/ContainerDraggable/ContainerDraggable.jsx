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
  useDroppable,
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
import { Button, Card, Modal, theme } from 'antd';
import { CloseOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { TipoCambioProceso } from 'constantes/PrincipalNoteProcessType';

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

  const TRASH_ID = 'void';
  
  export function ContainerDraggable({isDarkMode, items, setItems, onChange}) {
    const [activeId, setActiveId] = useState(null);
    // const [items, setItems] = useState(() =>
    //   Array.from({ length: 20 }, (_, index) => `${index + 1}`)
    // );
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const getIndex = (id) => items.findIndex(item => item.id === id) ;
    const activeIndex = activeId ? getIndex(activeId) : -1;
  
    const {
        token: { colorPrimary, colorPrimaryActive, colorBgContainer, colorText },
      } = theme.useToken();
    
  
    function handleDragStart(event) {
      const { active } = event;
      setActiveId(active.id);
    }
  
    function handleDragCancel() {
      setActiveId(null);
    }
  
    function handleDragEnd(event) {
        setActiveId(null);
        if (event && event.over) {
            const over = event.over
          if (over.id === TRASH_ID) {
              DeleteItem(activeId)
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
          }
        }
    }

    const cancelDrop = async ({ over }) => {
        if (!over || over?.data.current != null) {
            return false;
        }
    
        document.body.style.cursor = '';
        const confirmed = await DeleteItemModal();
    
        return !confirmed;
    };

    const DeleteItemModal = ()=>{
      return new Promise((resolve) => {
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
    }

    const onDeleteItem = async(id) => {
      const confirmed = await DeleteItemModal();
      if(confirmed){
        DeleteItem(id);
      }
      return;
    }

    const DeleteItem = (id) =>{
      const updatedItemsAfterDelete = items.reduce((acc, item) => {
        if (item.id !== id) {
          acc.push({ ...item, index: acc.length });
        }
        return acc;
      }, []);
      onChange({type:TipoCambioProceso.DELETE_NOTE_ACTION, value: updatedItemsAfterDelete });
    }
  
    return (
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          cancelDrop={cancelDrop}
          sensors={sensors}
          collisionDetection={closestCenter}
          measuring={measuring}
          isDarkMode={isDarkMode}
        >
          <SortableContext items={items}>
            <Card style={{height:'100%', paddingBottom:'30px'}} headStyle={{backgroundColor:isDarkMode?colorPrimaryActive:colorPrimary, color:"white"}} bodyStyle={{overflow:'auto', backgroundColor:isDarkMode?'#2c2c2c':'#ededed', height:'100%'}} size="small" title="Small size card" extra={<Button type='text' icon={<CloseOutlined />} />}>
                <ul >
                {items.map((item, index) => (
                    <SortablePage
                    id={item.id}
                    value={item}
                    index={index + 1}
                    key={item.id}
                    activeIndex={activeIndex}
                    isDarkMode={isDarkMode}
                    onRemove={() =>
                        onDeleteItem(item.id)
                    }
                    />
                ))}
                </ul>
            </Card>
          </SortableContext>
          <DragOverlay dropAnimation={dropAnimation}>
            {activeId ? (
              <PageOverlay id={activeId} items={items} value={items[activeIndex]} isDarkMode={isDarkMode} />
            ) : null}
          </DragOverlay>
          {activeId && (
          <Trash id={TRASH_ID} isDarkMode={isDarkMode}/>
        ) }
        </DndContext>
      );
  }

  function Trash({ id, isDarkMode }) { 
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
                left: `50%`,
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
  
  function PageOverlay({ id, items, value, ...props }) {
    const { activatorEvent, over } = useDndContext();
    const isKeyboardSorting = activatorEvent && activatorEvent.type === 'keyboard';
    const activeIndex = items.indexOf(id);
    const overIndex = over && over.id ? items.indexOf(over.id) : -1;
  
    return (
        <Page
          id={id}
          value={value}
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
      value
    } = useSortable({ id, animateLayoutChanges: always });
  
    // const isDragging = sortable.isDragging;
    // const isSorting = sortable.isSorting;
    // const over = sortable.over;
    
    return (
        <Page
          ref={setNodeRef}
          id={id}
          active={isDragging}
          value={value}
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