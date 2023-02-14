import React,{useState,useEffect} from "react";
// @ts-ignore
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, message } from 'antd';
import {useNavigate} from "react-router-dom";
import '../assets/base.less'

const Header: React.FC = () => {
    const [avatar,setAvatar]=useState('')
    const [userName,setUserName]=useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        let username1 = localStorage.getItem('user_name')
        let avatar1 = localStorage.getItem('avatar')
        if(username1){
            setUserName(username1)
        }
        if(avatar1){
            setAvatar(avatar1)
        }
    },[]);

    // 退出登录
    const logout = ()=>{
        localStorage.removeItem("token");
        message.success('退出成功,即将返回登录页');
        setTimeout(()=>navigate('/login'),800)
    };

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" onClick={logout} >
                    退出登录
                </a>
            ),
        },
    ];

    return(
        <header>
            <div className="right">
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <img src={avatar} className="avatar" alt=""/>
                            <span>{userName}</span>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}

export default Header;