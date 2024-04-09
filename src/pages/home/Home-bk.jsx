import React, { useEffect, useState } from 'react';
import { Button, Layout, Menu,  theme } from 'antd';
import {UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,RightOutlined, LeftOutlined 
  } from '@ant-design/icons'
import { HeaderExtraOption } from 'components';
import { TypeChange } from './constant/TypeChange';
import { TipoCambio,EsquemaColores } from 'constantes';
import { HomeContext } from './HomeContext';
import { useMediaQuery } from 'react-responsive';

const { Header, Content, Sider } = Layout;

export const Home = ({isDarkMode, onChange, children}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isVertical, setIsVertical] = useState(true);
  const [isStretch, setIsStretch] = useState(false);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [inLinePadding, setInlinePadding] = useState(24)
  const esMovil = useMediaQuery({ query: "(max-width: 860px)" });

  const horizontalHeightSize = '48px'

  const {
    token: { colorBgContainer, colorBorder},
  } = theme.useToken();

  const itemsMenu = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'nav 1',
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'nav 2',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'nav 3',
    },
  ];

  // Actualizar las variables CSS cuando cambie el tema
  useEffect(() => {
    const root = document.documentElement;
    const rgbaColor = hexToRGBA(colorBgContainer, 0.85);
    root.style.setProperty('--background-color-transparent', rgbaColor);
    root.style.setProperty('--dark-content-bg', isDarkMode?'#1e1e1e':undefined);
  }, [colorBgContainer]);

  // Función para convertir hex a rgba
  const hexToRGBA = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    // const rInv = 255 - r;
    // const gInv = 255 - g;
    // const bInv = 255 - b;

    // return `rgba(${rInv}, ${gInv}, ${bInv}, ${opacity})`;

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const onChangeLocalConfig = ({type, value}) =>{
    if(type){
      switch (type) {
        case TypeChange.CHANGE_LAYOUT:
            setIsVertical(value)
          break;
          
        case TypeChange.CHANGE_STRETCH:
            if(value)
              setInlinePadding(60)
            else
              setInlinePadding(24)
            setIsStretch(value)
          break;  
          case TypeChange.CHANGE_COLOR:
            setSelectedColor(value)
            onChange({type:TipoCambio.CHANGE_COLOR_THEME, value: EsquemaColores[value]})
          break;   
        case TypeChange.CHANGE_THEME:
            onChange({type:TipoCambio.CHANGE_THEME})
          break;  
        default:
          break;
      }

      return;
    }
  }

  return (

    <div style={{ position: 'relative' }}> {/* Contenedor relativo para el botón absoluto */}
      
      {/* Tu botón de colapso posicionado de forma absoluta */}
      {isVertical && <div style={{
        position: 'absolute',
        top: '10px',
        left: esMovil && collapsed?'50px':esMovil && !collapsed ? '185px' : !esMovil && collapsed?'65px' :'185px', // Ajusta esto basado en el estado de colapsado
        zIndex: 20, // Asegúrate de que esté sobre los otros elementos
        transition: 'left 0.2s ease-out'
      }}>
        <Button
          type="dashed"
          shape='circle'
          icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: '15px' }}
        />
      </div>}

    <Layout style={{ minHeight: '100vh', width: '100%' }}>
      {isVertical && (
        <Sider collapsedWidth={esMovil?65:80} style={{
          overflow: 'auto',
          height: '100vh', // Altura del 100% de la ventana del navegador
          position: 'fixed', // Posición fija
          left: 0, // Alineado a la izquierda
          zIndex: 10, // Asegúrate de que se sitúe sobre el contenido si se superponen
          paddingRight:esMovil?'-50px':'0',
          borderRight: `1px dashed ${colorBorder}`
        }} theme={isDarkMode ? 'dark' : 'light'} 
         collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div style={{height: '32px', margin:'16px', background: isDarkMode ?'rgba(255,255,255,.2)':'rgba(0,0,0,.2)', borderRadius: '6px'}} />
          <Menu theme={isDarkMode ? 'dark' : 'light'} mode="inline" defaultSelectedKeys={['1']} items={itemsMenu} />
        </Sider>
      )}
      
      <Layout style={{ paddingLeft: esMovil?'60px':!isVertical?0:collapsed ? '80px' : '200px', transition: 'padding-left 0.2s', minHeight: '100vh' }} >
        <Header
          style={{
            position: 'sticky',
              top: 0,
              zIndex: 1,
            paddingLeft:isVertical?0:null,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {<span style={{marginLeft:isVertical?'30px':null}} >Bienvenido</span>}
    
          <HeaderExtraOption data={{isVertical:isVertical,isStretch:isStretch, selectedColor:selectedColor}} 
          onChangeLatoutOption={onChangeLocalConfig} />
        </Header>

        {!isVertical && (
          <Header id='headerHorizontal'
            style={{
              position: 'fixed', // Posición fija
              top: 64, 
              width: '100%', 
              zIndex: 2,
              padding: '0 24px',
              boxSizing: 'border-box',
              // background: colorBgContainer,
              display: 'flex',
              alignItems: 'start',
              height:horizontalHeightSize,
              // borderTop: `1px dashed ${colorBorder}`
            }}
          >
            <Menu id='menuHorizontal' style={{width:'100%', lineHeight: horizontalHeightSize}} theme={isDarkMode ? 'dark' : 'light'} mode="horizontal" defaultSelectedKeys={['2']} items={itemsMenu} />
          </Header>
        )}

        <Content
          style={{
            padding: isVertical?`0 ${inLinePadding}px ${inLinePadding}px ${inLinePadding}px`:`${horizontalHeightSize} ${inLinePadding}px ${inLinePadding}px ${inLinePadding}px`,
            maxWidth: '100%',
          overflowX: 'hidden',
          }}
        >
            <HomeContext.Provider value={{ isVertical:isVertical, widthPadding: !isVertical?0:collapsed?50 : 110, isDarkMode:isDarkMode, colorBgContainer:colorBgContainer }}>
              {children}
            </HomeContext.Provider>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>CR ©2023 Created by CERH</Footer> */}
      </Layout>
    </Layout>
    </div>
  );
};
