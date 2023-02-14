import React from 'react';
import { Button, message, Form, Input, MessageArgsProps} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom'
import "./less/Login.less"
// @ts-ignore
import {RegisterApi} from "../request/api";


const Register: React.FC = () => {
    const navigate = useNavigate()

    const onFinish = (values: { username: any; password: any; }) => {
        RegisterApi({
            user_name: values.username,
            password: values.password
            // @ts-ignore
        }).then((res: { status: number; msg: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | MessageArgsProps | null | undefined; }) => {
            console.log(res)
            if(res.status===200){
                message.success("注册成功").then();
                // 跳到登录页
                setTimeout(()=>{
                    navigate('/login')
                } ,800)
            }else{
                message.error(res.msg).then();
            }
        })
    };

    return (
        <div className="login">
            <div className="login_box">
                <div className='register_form'>
                    <h1>注册</h1>
                    <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    >
                        <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                    >
                        <Input.Password size='large' prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码"/>
                    </Form.Item>

                    <Form.Item>
                        <Link to="/login">已有账号?立即登录</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button size='large' type="primary" htmlType="submit" block>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
                </div>
            </div>
        </div>
    )
};

export default Register;