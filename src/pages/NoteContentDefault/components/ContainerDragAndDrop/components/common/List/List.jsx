import React, { forwardRef } from 'react';
import styles from './List.module.css';
import { Card, Space } from 'antd';

export const List = forwardRef(
  ({ children, isDarkMode }, ref) => {
    return (
      <Card headStyle={{backgroundColor:isDarkMode?'rgb(65 65 65)':'rgb(195 193 193)'}}  bodyStyle={{overflow:'auto', backgroundColor:isDarkMode?'#2c2c2c':'#ededed', height:'100%'}} style={{overflow:'hidden'}} size="small" title="Small size card"  >
    <ul
            ref={ref}
            className={`${styles.List} `}
          ><Space size={'middle'} direction='vertical' style={{width:'100%'}}>
            {children}
          </Space>
            
          </ul>
      </Card>
      
    );
  }
);