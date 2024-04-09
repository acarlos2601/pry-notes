import React, { forwardRef } from 'react';
import styles from './ItemDraggable.module.css';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, HolderOutlined } from '@ant-design/icons';
import { Card } from 'antd';

// Since enums don't exist in JS, you can use objects to map the keys to values.
const Position = {
  Before: -1,
  After: 1,
};

const Page = forwardRef(function Page(
  { id, index, active, clone, insertPosition, onRemove, value, style, dragOverlay,isDarkMode, ...props },
  ref
) {
  return (
    <li
    className={
        `${styles.Wrapper} ${ active ? styles.active : '' } ${clone ? styles.clone : ''} ${insertPosition === Position.Before ? styles.insertBefore : '' } ${insertPosition === Position.After ?styles.insertAfter : '' }`.trim()}

      style={{...style, '--page-brightness':isDarkMode?'180%':'90%',
      '--pageNumber-opacity':0.3}}
      ref={ref}
    ><Card title={value.title}
    className={styles.Page}
    actions={[
        <HolderOutlined  key="holder" {...props} style={{cursor:dragOverlay?'grabbing':'grab'}} />,
        <EditOutlined key="edit" onClick={()=>onChange({type:TipoCambioProceso.OPEN_MODAL_EDIT, value:value })} />,
        <EllipsisOutlined key="ellipsis" />,
      ]}>
        {!active && onRemove ? (
            <button className={styles.Remove} onClick={onRemove}>
            <DeleteOutlined />
            </button>
        ) : null}
        {index != null ? (
            <span className={styles.PageNumber}>{index}</span>
        ) : null}
        </Card>
    </li>
  );
});

export default Page;