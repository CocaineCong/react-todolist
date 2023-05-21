import { Button, Form, message, Input, Modal, MessageArgsProps} from 'antd';
import React, {useState} from 'react';
import { Code } from '../constant';
import { createTask } from '../request/task';


const TaskForm: React.FC = (props:any) => {
    const [visiable, setVisiable] = useState(false);
    const [form] = Form.useForm();
    const {onCreate} = props;
    // 打开弹窗
    const open = () => {
        setVisiable(true);
    };
    //关闭弹窗
    const close = () => {
        setVisiable(false);
    };
    //点击确定提交表单
    const submit = () => {
        form.submit()
    }
    // 提交后获取表单数据，请求接口，重置表单并关闭
    const onSubmit = (values: { title: string; content: string;status:any }) => {
        let {title, content,status} = values;
        createTask({
            title: title,
            content: content,
            status:status,
        }).then(res =>{
            if(res.status === Code.SuccessCode){
                message.success(res?.data?.msg).then()
            }else{
                message.error(res?.data?.error).then()
            }
            if (onCreate){
                onCreate()
            }
        })
        form.resetFields();
        close()
    }
    return (
        <div>
            <div className="text-center">
                <Button type="primary" onClick={open}>
                    新建
                </Button>
            </div>
            <Modal
                wrapClassName="modal-wrap"
                okText="提交"
                cancelButtonProps={{ shape: 'round' }}
                okButtonProps={{ shape: 'round' }}
                width={600}
                open={visiable}
                title="新建任务"
                onCancel={close}
                onOk={submit}
            >
                <div className="form">
                    <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} onFinish={onSubmit}>
                        <Form.Item
                            label="标题"
                            name="title"
                            rules={[{ required: true, message: 'Please input title!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="内容"
                            name="content"
                            rules={[{ required: true, message: 'Please input content!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </div>
    );
}

export default TaskForm