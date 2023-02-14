import request from "./request";

export const RegisterApi =(params: any)=> request.post('/user/register',params)

export const LoginApi =(params: any)=> request.post('/user/login',params)

export const TaskListApi = (params: any) => request.get("/tasks", { params });

export const TaskCreateApi = (params: any) => request.post("/task", params );

export const TaskUpdateApi = (params: { id: any; }) => request.put(`/task/${params.id}`, params );

export const TaskDeleteApi = (params: { id: any; }) => request.delete(`/task/${params.id}`);
