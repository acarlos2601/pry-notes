import { useState } from 'react'
import { Home } from './pages/home'
import { ConfigProvider, theme } from 'antd'
import { TipoCambio } from './constantes'
import {
  blue,
} from '@ant-design/colors';
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NoteContentDefault } from './pages/NoteContentDefault';
import { LoginPage } from './pages/login';

function App() {
  const [color, setColor] = useState(blue)
  const { defaultAlgorithm, darkAlgorithm } = theme;
 const [isDarkMode, setIsDarkMode] = useState(false);

  const onChange = ({type, value}) =>{
    if(type){
      switch (type) {
        case TipoCambio.CHANGE_COLOR_THEME:
            setColor(value)
          break;
          
        case TipoCambio.CHANGE_THEME:
            onChangeMode()
          break;  
          
        default:
          break;
      }

      return;
    }
  }

  const onChangeMode = () =>{
    setIsDarkMode((prevVal) => !prevVal)
  }
  

  return (
    <ConfigProvider
    
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token:{   colorPrimary: color?color.primary:undefined,
          "borderRadius": 9,
        }
      }}
      modal={{
        styles: {
          mask: {
            backdropFilter: 'blur(5px)',
          }
        },
      }}
    >
      <BrowserRouter>
      <Home isDarkMode={isDarkMode} onChange={onChange}>
        {/* Aquí van tus rutas */}
        <Routes>
          <Route exact path="/" element={<NoteContentDefault />} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="/index" element={<Navigate replace to="/" />} />
          <Route exact path="/login" element={<LoginPage />} />
        </Routes>
      </Home>
    </BrowserRouter>
      {/* <Home isDarkMode={isDarkMode} onChange={onChange} /> */}
    </ConfigProvider>
  )
}

export default App
