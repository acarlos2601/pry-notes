import { useState } from 'react';
import { Avatar, Button, Col, Divider, Popover, Row } from 'antd'

const ProfilePopover = () => {
    const [isLogin,] = useState(false)

    const buttonProps = {
        type:'text',
        style:{
            textAlign:'start',
            marginLeft: '5px',
        height: '40px'
        },
        block:true
    }

      const ProfileImage = ({size}) => <Avatar size={size?size:undefined} style={{ borderColor:'black' }} src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
   
      return(
            <Popover trigger="click" placement='bottomRight'/*"bottom"*/ arrow={{ pointAtCenter: true, }} content={
            <Row align={'middle'} wrap={false} style={{width:'330px'}} >
                <Col span={12} style={{borderRight:'dashed 1px #cecfd1e8'}} >
                    <ProfileImage size={150} />
                </Col>
                <Col span={12} >
                    <div >
                    <span style={{textAlign:'start',  paddingLeft:'20px'}} >{ isLogin?'Bienvenido':'Invitado' }</span>
                    <Divider
                    dashed
                        style={{
                            margin: '0 0 0 20px',
                            paddingLeft:'20px',
                            minWidth: '130px',
                            width: '130px'
                        }}
                    />
                    <Button {...buttonProps}>Inicio</Button>
                    <Button {...buttonProps} >Perfil</Button>
                    <Divider
                    dashed
                        style={{
                            margin: '0 0 0 20px',
                            paddingLeft:'20px',
                            minWidth: '130px',
                            width: '130px'
                        }}
                    />
                    <Button {...buttonProps} danger >Logout</Button>
                    </div>
                </Col>
            </Row>
                
            }
            >
                    <Button type='link' shape='circle' icon={<ProfileImage />} />
            </Popover>
      )
}

export default ProfilePopover;