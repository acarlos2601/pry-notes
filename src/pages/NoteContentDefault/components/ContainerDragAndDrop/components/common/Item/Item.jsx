import React, { useEffect } from 'react';
import styles from './Item.module.css';
import { Avatar, Button, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, HolderOutlined } from '@ant-design/icons';
import { TipoCambioProceso } from 'constantes/PrincipalNoteProcessType';

export const Item = React.memo(
  React.forwardRef(
    (
      {onChange,
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = 'grabbing';

        return () => {
          document.body.style.cursor = '';
        };
      }, [dragOverlay]);

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <li
          className={`${styles.Wrapper} ${fadeIn ? styles.fadeIn : ''} ${sorting ? styles.sorting : ''} ${dragOverlay ? styles.dragOverlay : ''}`}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(', '),
              '--translate-x': transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              '--translate-y': transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              '--scale-x': transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              '--scale-y': transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              '--index': index,
              '--color': color,
              '--drag-overlay': dragOverlay?1:0
            }
          }
          ref={ref}
        >
          <Card
           data-cypress="draggable-item"
           {...(!handle ? listeners : undefined)}
           {...props}
           tabIndex={!handle ? 0 : undefined}
          className={
            `${styles.Item} ${ dragging ? styles.dragging : '' } ${disabled ? styles.disabled : ''} ${handle ? styles.withHandle : '' } ${dragOverlay ? styles.dragOverlay : '' } ${color ? styles.color : ''}`.trim()}
            style={{
              width: "100%", height:'fit-content'
            }}
            actions={[
              <HolderOutlined  key="holder" {...handleProps} {...listeners} style={{cursor:dragOverlay?'grabbing':'grab'}} />,
              <EditOutlined key="edit" onClick={()=>onChange({type:TipoCambioProceso.OPEN_MODAL_EDIT, value:value })} />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
              <Card.Meta
                title={value.title}
                description={<div className="card-meta-description">{value.content}</div>}
              />
          </Card>
          {/* <div
          className={`${styles.Item} ${dragging ? styles.dragging : ''} ${handle ? styles.handle : ''} ${disabled ? styles.disabled : ''} ${dragOverlay ? styles.dragOverlay : ''} ${color ? styles.color : ''} `}
            style={style}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            {value}
            <span className={styles.Actions}>
              {handle ? <Button type='text' style={{cursor:dragOverlay?'grabbing':'grab'}} icon={<HolderOutlined />} {...handleProps} {...listeners} /> : null}
            </span>
          </div> */}
        </li>
      );
    }
  )
);