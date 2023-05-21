declare namespace API {
    export type CreateTaskRespData = {
        id: number;
        title: string;
        content: string;
        view: number;
        status: number;
        created_at: number;
        start_time: number;
        end_time: number;
    }

    export type CreateTaskReq = {
        title: string;
        content: string;
        status: number;
    }

    export type UpdateTaskReq = {
        title: string;
        content: string;
        id: number;
        status: number;
    }

    export type SearchTaskReq = {
        info: string;
    }

    export type ListTaskRespDataItem = {
        id: number;
        title: string;
        content: string;
        view: number;
        status: number;
        created_at: number;
        start_time: number;
        end_time: number;
    }
    
    export type ListTaskRespData = {
        item: ListTaskRespDataItem[];
        total: number;
    }

}