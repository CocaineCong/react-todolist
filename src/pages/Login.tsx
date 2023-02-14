import React from 'react';
import { Button, message, Form, Input, MessageArgsProps} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom'
import "./less/Login.less"
// @ts-ignore
import {LoginApi} from "../request/api";


const Login: React.FC = () => {
    const navigate = useNavigate()

    const onFinish = (values: { username: any; password: any; }) => {
        LoginApi({
            user_name: values.username,
            password: values.password
            // @ts-ignore
        }).then((res: { status: number; data: { token: string; user: { user_name: string; }; }; msg: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | MessageArgsProps | null | undefined; }) => {
            console.log(res)
            if(res.status===200){
                localStorage.setItem("token",res.data.token);
                localStorage.setItem("user_name",res.data.user.user_name);
                localStorage.setItem("avatar","https://q1.qlogo.cn/g?b=qq&nk=3274661196&s=640")
                message.success("登陆成功").then();
                // 跳到登录页
                setTimeout(()=>{
                    navigate('/list')
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
                    <h1>登陆</h1>
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
                            <Link style={{
                                float: 'right',
                            }} to="/register">还没账号?立即注册</Link>
                        </Form.Item>

                        <Form.Item>
                            <Button size='large' type="primary" htmlType="submit" block>
                                登陆
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </div>
    )
};

export default Login;