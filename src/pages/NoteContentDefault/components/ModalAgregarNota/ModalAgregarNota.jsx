import React from 'react';
import { Form, Input, Modal } from "antd";
import { TipoCambioProceso, TipoModal } from 'constantes';



// eslint-disable-next-line react/prop-types
export const ModalAgregarNota = ({props, onChange, form}) => {

    const onFinishForm = () =>{
        form
        .validateFields()
        .then((values) => {
          if(props.typeModal === TipoModal.MODAL_ADD)
            onChange({type:TipoCambioProceso.ADD_NOTE_ACTION, value: values})
          else if(props.typeModal === TipoModal.MODAL_EDIT)
            onChange({type:TipoCambioProceso.EDIT_NOTE_ACTION, value: values})
          else
            return;
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
    }    

    return <Modal
    // eslint-disable-next-line react/prop-types
    title={props.typeModal === TipoModal.MODAL_EDIT?"Editar Nota":"Agregar nueva nota"}
    // eslint-disable-next-line react/prop-types
    open={props.modalOpen}
    onOk={onFinishForm}
    onCancel={()=>{onChange({type:TipoCambioProceso.CLOSE_MODAL});}}
    destroyOnClose
  >
    <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="id"
          label="id"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="title"
          label="Titulo"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="Descripción"
          rules={[
            {
              required: true,
              message: 'Ingrese la descripción',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="tag"
          label="Etiqueta"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="index"
          label="Index"
        >
          <Input />
        </Form.Item>
      </Form>
  </Modal>
}
