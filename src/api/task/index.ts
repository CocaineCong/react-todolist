import _ from 'lodash';
import instance from "../index";

const taskBaseUrl = "/api/v1/"

// 获取所有的task
export async function listTask (body?: API.ListTaskReq, options?: { [key: string]: any }) {
    let params = new FormData();
    _.forIn(body, function (value, key) {
      return params.append(key, value);
    })
    return instance<API.CommonResp>(taskBaseUrl+`task_list`, {
        method: 'GET',
        params:params,
        ...(options || {}),
    });
}

// 获取某一个task
export async function getTask (body?:any, options?: { [key: string]: any }) {
    return instance<API.CommonResp>(taskBaseUrl+`task_show`, {
        method: 'GET',
        params:body,
        ...(options || {}),
    });
}

// 创建一个task
export async function createTask(body:API.CreateTaskReq, options?:{[key:string]:any}){
    let params = new FormData();
    _.forIn(body,function(value,key){
        return params.append(key, value);
    })
    return instance<API.CommonResp>(taskBaseUrl+`task_create`,{
        method:'POST',
        data:params,
        ...(options||{}),
    });
}

// 创建一个task
export async function updateTask(body:API.UpdateTaskReq, options?:{[key:string]:any}){
    let params = new FormData();
    _.forIn(body,function(value,key){
        return params.append(key, value);
    })
    return instance<API.CommonResp>(taskBaseUrl+`task_update`,{
        method:'POST',
        data:params,
        ...(options||{}),
    });
}

// 搜索task
export async function searchTask(body:API.SearchTaskReq, options?:{[key:string]:any}){
    let params = new FormData();
    _.forIn(body,function(value,key){
        return params.append(key, value);
    })
    return instance<API.CommonResp>(taskBaseUrl+`task_search`,{
        method:'POST',
        data:params,
        ...(options||{}),
    });
}

// 删除task
export async function deleteTask(body:any, options?:{[key:string]:any}){
    let params = new FormData();
    _.forIn(body,function(value,key){
        return params.append(key, value);
    })
    return instance<API.CommonResp>(taskBaseUrl+`task_delete`,{
        method:'POST',
        data:params,
        ...(options||{}),
    });
}