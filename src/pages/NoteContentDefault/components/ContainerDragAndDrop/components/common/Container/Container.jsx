import React from 'react';
import styles from './Container.module.css';
import { Button, Card, theme } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export function Container({children, isDarkMode, lowItems}) {

  const {
    token: { colorPrimary, colorPrimaryActive },
  } = theme.useToken();

  return (

<Card headStyle={{backgroundColor:isDarkMode?colorPrimaryActive:colorPrimary, color:"white"}} bodyStyle={{overflow:'auto', backgroundColor:isDarkMode?'#2c2c2c':'#ededed', height:'100%'}} className={`${styles.Container} `.trim()} size="small" title="Small size card" extra={<Button type='text' icon={<CloseOutlined />} />} >
  <ul
    className={`${lowItems?'few-items':''}`}
  >
    {children}
  </ul>
  </Card>
  );
}