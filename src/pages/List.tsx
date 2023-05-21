import { ProList } from '@ant-design/pro-components';
import {message, Pagination, Space, Tag} from 'antd';
import React, {useState, useEffect} from 'react';
import moment from "moment";
import TaskForm from "./Form";
import { deleteTask, listTask, updateTask } from '../api/task';
import { Code } from '../constant';
import { stat } from 'fs';

const defaultData = [
    {
        id: '1',
        title: '一键三连',
        content: '给小生凡一的视频一键三连(这是写死在前端的列表,如果一条数据都没有就会出现)',
        start_time: '2023年01月01日'
    }
];
const List: React.FC = () => {
    const [dataSource, setDataSource] = useState(defaultData);
    const [total, setTotal] = useState(1)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const getList = async (num: number)=> {
        let res:any = await listTask({
            start: num,
            limit: pageSize,
        })
        if (res.status === Code.SuccessCode){
            (res.data.item)?.map((value: { start_time: string; }, _: any)=>{
                    value.start_time = moment(parseInt(value.start_time)*1000).format("YYYY-MM-DD HH:mm:ss");
                })
            if (res?.data?.total !== 0) {
                setDataSource(res.data.item || []);
                setTotal(res.data.total)
                setCurrent(num)
                message.success(res?.data)
            }
        } else {
            message.error(res?.error)
        }
    }

    const updateList = async (values: { id: any; title: string; content: string; status: any; })=>{
        const {id,title,content,status} = values
        let res:any = await updateTask({
            id:id,
            title:title,
            content:content,
            status:status
        })
        if (res?.data?.status === Code.SuccessCode){
            message.success(res?.data)
        }else{
            message.error(res?.error)
        }
    }

    const deleteList = async (values: { id: any; })=>{
        const {id} = values
        const res:any = await deleteTask({
            id:id,
        })
        if (res.status === Code.SuccessCode){
            message.success(res?.msg)
        }else{
            message.error(res?.error)
        }
    }

    // 请求文章列表
    useEffect(()=>{
        getList(current)
    },[])

    // 分页
    const onChange = (pages: number) => {
        getList(pages);
    }

    return (
        <div>
        <ProList rowKey="id"
                 headerTitle="我的备忘录"
                 dataSource={dataSource}
                 showActions="hover"
                 toolBarRender={() => {
                     return [
                            // @ts-ignore
                            <TaskForm onCreate={()=>{return getList(current);}}/>
                         ];
                     }}
                 editable={{
                     onSave: async (key, record, originRow) => {
                         // @ts-ignore
                         updateList(record)
                         return true;
                     },
                     onDelete: async (key, row) =>{
                         deleteList(row)
                         return
                     }
                 }}
        onDataSourceChange={setDataSource} metas={{
        title: {
            dataIndex: 'title',
        },
        description: {
            dataIndex: 'content',
        },
        subTitle: {
            dataIndex: 'start_time',
            render: (_: any, row: { start_time: any}) => {
                return (<Space size={0}>
                        <Tag>{row.start_time}</Tag>
                </Space>);
            },
            search: false,
        },
        actions: {
            render: (text: any, row: { id: any; }, index: any, action: { startEditable: (arg0: any) => any; } | null | undefined) => [
                <a onClick={() => {
                    action === null || action === void 0 ? void 0 : action.startEditable(row.id);
                }} key="link">
                    编辑
                </a>,
            ],
        },
    }}/>
        <Pagination style={{float: 'right',marginTop: '20px'}}
                    onChange={onChange}
                    showTotal={(total) => `Total ${total} items`}
                    total={total}
                    current={current}
                    pageSize={pageSize} />
        </div>
    );
};

export default List;