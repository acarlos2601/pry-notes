import React, { useState } from 'react'
import { Button, Col, Menu, Popover, Row,  Space, Switch, theme } from 'antd'
import {BellFilled,
    VerticalLeftOutlined ,
    VerticalRightOutlined ,
    SettingFilled } from '@ant-design/icons'
import Es from '../../assets/es.svg?react';
import Us from '../../assets/us.svg?react';
import { ProfilePopover } from '../ProfilePopover'
import { EsquemaColores } from '../../constantes/EsquemaColores'
import { Icon } from '@iconify/react';
import { TypeChange } from '../../pages/home/constant/TypeChange';
import { ConfigDrawer } from 'components/ConfigDrawer';

const style = {
    fontSize: '22px',
    borderColor:'black'
}

const styleDiv = {
    fontSize: '22px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px' // Espacio entre los elementos
  };

  const styleFlag = {
    width:'25px',
    borderRadius:'9px'
}

const styleButtonOption = {
    width:'50px',
    height: '50px'
};

const sizeCustomIcon = 40;

const HeaderExtraOption = ({ data, onChangeLatoutOption}) => {
  const [openDrawer, setOpenDrawer] = useState(false)
    const defaultValue = 1;

    const {
        token: { colorTextSecondary},
      } = theme.useToken();

    const items = [
        {
          label: <span > Español</span>,
          key: 1,
          icon: <Es style={styleFlag} />,
        },
        {
          label: <span >Ingles</span>,
          key: 2,
          icon:<Us style={styleFlag} />,
        },
        {
          label: <span >Frances</span>,
          key: 3,
          icon:<Es style={styleFlag} />,
        },
      ];

      const text = <span>Title</span>;

      const content = (
        <div>
          <p>Content</p>
          <p>Content</p>
        </div>
      );
   
      return(
        <div style={styleDiv}>
            <Popover placement="bottom" trigger="click" 
            content={
                <Menu id='languageMenu' style={{borderInlineEnd:'none'}} items={items} defaultSelectedKeys={[0]} />
            }
            >
               <Button type='link' shape='circle' icon={items[defaultValue].icon} />
            </Popover>
            <Popover placement="bottom" title={text} content={content} trigger="click">
                <Button type='link' shape='circle' icon={<BellFilled  style={{...style, color:colorTextSecondary}} />} />
            </Popover>

            <Button type='link' shape='circle' onClick={()=>setOpenDrawer(true)} icon={<SettingFilled   style={{...style,color:colorTextSecondary} } />} />

            {/* <ConfigThemePopover data={{...data,colorTextSecondary:colorTextSecondary}} 
            onChangeLatoutOption={onChangeLatoutOption} /> */}

            <ProfilePopover />
            <ConfigDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} data={{...data,colorTextSecondary:colorTextSecondary}}  onChangeLatoutOption={onChangeLatoutOption} /> 
        </div>
      )
}

const ConfigThemePopover = ({data,onChangeLatoutOption}) => {    

    const colorOptions = [
        { value: 'red', label: 'Red' },
        { value: 'volcano', label: 'Volcano' },
        { value: 'gold', label: 'Gold' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'lime', label: 'Lime' },
        { value: 'green', label: 'Green' },
        { value: 'cyan', label: 'Cyan' },
        { value: 'blue', label: 'Blue' },
        { value: 'geekblue', label: 'Geekblue' },
        { value: 'purple', label: 'Purple' },
        { value: 'magenta', label: 'Magenta' },
        { value: 'grey', label: 'Grey' }
      ];

    return(
        <Popover placement='bottomRight'/*"bottom"*/ trigger="click" content={

            <div style={{ width: 240, paddingInline:'20px' }}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Row gutter={16}>
                <Col span={12}>
                <h4>Mode</h4>
                <Switch defaultChecked checkedChildren={<Icon icon="ph:sun-duotone" />} unCheckedChildren={<Icon icon="ic:twotone-dark-mode" />}
                 onChange={()=>onChangeLatoutOption({type:TypeChange.CHANGE_THEME})} />
                </Col>
                {/* <Col span={12}>
                <h4>Contrast</h4>
                <Switch checkedChildren={<Icon icon="cil:contrast" />} unCheckedChildren={<Icon icon="icon-park-outline:contrast-view-circle" />}
                 checked={contrast} onChange={(checked) => setContrast(checked)} />
                </Col> */}
            </Row>
      
              <h4>Direction</h4>
              
            <div>
                <h4>Layout</h4>
              <Space size="large">
                    <Button
                    style={styleButtonOption}
                    type={data?.isVertical ? 'primary' : 'default'}
                    icon={<Icon  width={sizeCustomIcon} icon="mingcute:layout-fill" />}
                    onClick={()=> onChangeLatoutOption({type:TypeChange.CHANGE_LAYOUT, value:true})}
                    />
                    <Button
                    style={styleButtonOption}
                    type={!data?.isVertical ? 'primary' : 'default'}
                    icon={<Icon width={sizeCustomIcon} icon="ri:layout-top-fill" />}
                    onClick={()=> onChangeLatoutOption({type:TypeChange.CHANGE_LAYOUT, value:false})}
                    />
                </Space>
            </div> 
              
            <div>
              <h4>Stretch</h4>
              <Row justify={'space-between'}>
                <Button
                    style={styleButtonOption}
                    type={data?.isStretch ? 'primary' : 'default'}
                    icon={<React.Fragment><VerticalLeftOutlined /> <VerticalRightOutlined /> </React.Fragment>}
                    onClick={()=> onChangeLatoutOption({type:TypeChange.CHANGE_STRETCH, value:true})}
                    />
                <Button
                    style={styleButtonOption}
                    type={!data?.isStretch ? 'primary' : 'default'}
                    icon={<Icon width={sizeCustomIcon} icon="radix-icons:stretch-horizontally" />}
                    onClick={()=> onChangeLatoutOption({type:TypeChange.CHANGE_STRETCH, value:false})}
                    />    
              </Row>
            </div>

            <div>
                <h4>Presets</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', justifyItems: 'center' }}>
                    {colorOptions.map((color) => (
                        <Button
                        key={color.value}
                        style={{
                        backgroundColor: EsquemaColores[color.value].primary,
                        border: 'none',
                        width: data?.selectedColor === color.value ? 30 : 20,
                        height: data?.selectedColor === color.value ? 30 : 20,
                        borderRadius: '50%',
                        margin: data?.selectedColor === color.value ? '5px' : '10px', // Ajusta el margen para mantener la cuadrícula alineada
                        transition: 'all 0.3s',
                        padding:'5px'
                        }}
                        onClick={() => onChangeLatoutOption({type:TypeChange.CHANGE_COLOR, value:color.value})}
                    />
                    ))}
                </div>
            </div>  
        
            </Space>
          </div>
     
        } >
                <Button type='link' shape='circle' icon={<SettingFilled   style={{...style,color:data?.colorTextSecondary} } />} />
            </Popover>
    )
}


export default HeaderExtraOption;