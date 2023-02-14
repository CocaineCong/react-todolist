import { ProList } from '@ant-design/pro-components';
import {message, MessageArgsProps, Pagination, Space, Tag} from 'antd';
import React, {useState, useEffect} from 'react';
// @ts-ignore
import {TaskListApi, TaskUpdateApi, TaskDeleteApi} from "../request/api";
import moment from "moment";
import TaskForm from "./Form";

const defaultData = [
    {
        id: '1',
        title: '一键三连',
        content: '给小生凡一的视频一键三连(这是写死在前端的列表)',
        start_time: '2023年01月01日'
    }
];
const List: React.FC = () => {
    const [dataSource, setDataSource] = useState(defaultData);
    const [total, setTotal] = useState(1)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const getList = (num: React.SetStateAction<number>) => {
        TaskListApi({
            start: num,
            limit: pageSize,
            // @ts-ignore
        }).then((res: { status: number; data: { item: any[] | ((prevState: { id: string; title: string; content: string; start_time: string; }[]) => { id: string; title: string; content: string; start_time: string; }[]) | null; total: React.SetStateAction<number>; }; msg: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | MessageArgsProps | null | undefined; })=>{
            if (res.status === 200 && res.data.item !== null ){
                // @ts-ignore
                (res.data.item)?.map((value: { start_time: string; }, _: any)=>{
                        value.start_time = moment(parseInt(value.start_time)*1000).format("YYYY-MM-DD HH:mm:ss");
                        })
                setDataSource(res.data.item)
                setTotal(res.data.total)
                setCurrent(num)
            }else if (res.status!==200){
                message.error(res.msg).then()
            }
        })
    }

    const updateList=(values: { id: any; title: any; content: any; status: any; })=>{
        const {id,title,content,status} = values
        TaskUpdateApi({
            id:id,
            // @ts-ignore
            title:title,
            content:content,
            status:status
            // @ts-ignore
        }).then((res: { status: number; msg: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | MessageArgsProps | null | undefined; })=>{
            if (res.status === 200){
                message.success(res.msg).then()
            }else{
                message.error(res.msg).then()
            }
        })
    }

    const deleteList=(values: { id: any; })=>{
        const {id} = values
        TaskDeleteApi({
            id:id,
            // @ts-ignore
        }).then((res: { status: number; msg: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | MessageArgsProps | null | undefined; })=>{
            if (res.status === 200){
                message.success(res.msg).then()
            }else{
                message.error(res.msg).then()
            }
        })
    }

    // 请求文章列表
    useEffect(()=>{
        getList(current)
    },[])

    // 分页
    const onChange = (pages: React.SetStateAction<number>) => {
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
                         <TaskForm onCreate={()=>{
                                 return getList(current);
                             }}/>
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
    //                  editable={{
    //     onDelete: async (key: any, record: { id: any; }, originRow: any) => {
    //         deleteList(record)
    //         return true;
    //     },
    // }}
        onDataSourceChange={setDataSource} metas={{
        title: {
            dataIndex: 'title',
        },
        description: {
            dataIndex: 'content',
        },
        subTitle: {
            dataIndex: 'start_time',
            render: (_: any, row: { start_time: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
                return (<Space size={0}>
                        <Tag>
                            {row.start_time}
                        </Tag>
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