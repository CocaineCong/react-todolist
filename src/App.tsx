import React from 'react';
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './components/Header'
import {Footer} from "antd/es/layout/layout";


function App() {
  return (
      <Layout id='app'>
        <Header />
        <div className='container'>
          <div className='container_box'>
            <div className="container_content">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer className='footer_content'>TodoList | Copyright &copy; 2023 Author FanOne</Footer>
      </Layout>
  )
}

export default App;
