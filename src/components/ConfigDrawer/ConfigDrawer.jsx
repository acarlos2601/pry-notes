import { SettingFilled, VerticalLeftOutlined, VerticalRightOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { Button, Col, Drawer, Row, Space, Switch } from "antd";
import { EsquemaColores } from "constantes/EsquemaColores";
import { TypeChange } from "pages/home/constant";
import React from "react";


const styleButtonOption = {
    width:'50px',
    height: '50px'
};
const sizeCustomIcon = 40;

const ConfigDrawer = ({openDrawer, setOpenDrawer, data, onChangeLatoutOption}) => {    

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
        <Drawer title={"Configurar"} open={openDrawer} onClose={()=>setOpenDrawer(false)}>

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
     
          </Drawer>
    )
}

export default ConfigDrawer;