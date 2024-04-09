import React, { useContext, useState } from 'react';
import { ModalAgregarNota } from './components';
import { Button, Form, Row, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { HomeContext } from '../home/HomeContext';
import { TipoCambioProceso, TipoModal } from 'constantes';
import { ContainerDragAndDrop } from './components';
import { ContainerDraggable } from './components/ContainerDraggable';

const DefaultValuesProps = {
    modalOpen:false, typeModal:undefined,
    dataEditModal: undefined
}

export const NoteContentDefault = () =>{
    const { isVertical, widthPadding, isDarkMode, colorBgContainer } =useContext(HomeContext)
    const [items, setItems] = useState(
        Array.from({ length: 15 }, (_, i) => { return { id:`A${i + 1}`, title:`A${i + 1}`,content:"contenido de prueba", tag:'A', index:i} })
      );
      const [props, setProps] = useState({...DefaultValuesProps})
      const [form] = Form.useForm();

    const onChange = ({ type, value }) => {
        switch (type) {
            case TipoCambioProceso.ADD_NOTE_ACTION:
                returnDefaultValues();  
                const newItem = [{...value,id:value.content}, ...items].map((item, index) => ({ ...item, index }))
                setItems( newItem )
                break;
            case TipoCambioProceso.CHANGE_NOTE_ACTION:
                setItems(value)
                break;
            case TipoCambioProceso.DELETE_NOTE_ACTION:
                setItems(value)
                break;
            case TipoCambioProceso.CLOSE_MODAL:
                returnDefaultValues();
                break;
            case TipoCambioProceso.OPEN_MODAL_ADD:
                setProps((prevVal)=> { return {...prevVal, modalOpen:true, typeModal: TipoModal.MODAL_ADD } })
                break;
            case TipoCambioProceso.OPEN_MODAL_EDIT:
                form.setFieldsValue(value)
                setProps((prevVal)=> { return {...prevVal, modalOpen:true, typeModal: TipoModal.MODAL_EDIT } })
                break;
            case TipoCambioProceso.EDIT_NOTE_ACTION:
                returnDefaultValues();
                setItems(items.map((item, idx) => idx === value.index ? {...item, ...value} : item))
                break;
            default:
                break;
        }
    }

    const returnDefaultValues = () =>{
        form.resetFields();
        setProps({...DefaultValuesProps})
    }

    return (
        <React.Fragment>
            <Row justify={'center'} style={{padding:'10px'}} ><Space style={{ backgroundColor:colorBgContainer, padding:'5px', borderRadius:'15px', boxShadow: '0px 4px 6px rgba(133, 132, 132, 0.2)'}} >
                <Button  type='text' style={{ minWidth:'150px', width:'25vw', textAlign:'start'}}
                onClick={()=> onChange({type:TipoCambioProceso.OPEN_MODAL_ADD})} >Agregar nota ...</Button>
                <Button type='text' shape='circle' icon={<SearchOutlined />} />
                <Button type='text' shape='circle' icon={<SearchOutlined />} />
            </Space></Row>
            <div style={{ height:`calc(95vh - ${isVertical?150:198}px)`, borderRadius:'20px', overflow:'hidden' }}>{/** isVertical?'82vh':'77vh' */}

            {/* <ContainerDragAndDrop isDarkMode={isDarkMode} items={items} setItems={setItems} onChange={onChange} widthPadding={widthPadding} /> */}
            <ContainerDraggable isDarkMode={isDarkMode} items={items} onChange={onChange}/>

          </div>
          <ModalAgregarNota onChange={onChange} props={props} form={form} />
        </React.Fragment>
      );
    };
