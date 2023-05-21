import React from 'react';
import { Button, message, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Link, useNavigate} from 'react-router-dom'
import "../assets/login.less"
import { register } from '../api/user';
import { Code } from '../constant';
import { useDispatch } from 'react-redux';
import { save } from '../store/user';

const Register: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const onFinish = async (values: {
        user_name: string;
        password: string;
    }) => {
        const data:any = await register({...values});
        if (data.status === Code.SuccessCode) {
            dispatch(save({...data.data.user, token: data.data.token}));
            message.success("登陆成功")
            navigate('/login');
        } else {
            message.error("账号名/密码错误")
        }
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
                        <Input size='large' prefix={<UserOutlined className="site-form-item-icon" rev={undefined} />} placeholder="请输入用户名"/>
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
                        <Input.Password size='large' prefix={<LockOutlined className="site-form-item-icon" rev={undefined} />} placeholder="请输入密码"/>
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