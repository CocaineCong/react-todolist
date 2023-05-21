declare namespace API {

    export type ListTaskReq = {
        limit: number;
        start: number;
    }
    
    export type CreateTaskReq = {
        title: string;
        content: string;
        status: string | numebr;
    }

    export type UpdateTaskReq = {
        title: string;
        content: string;
        id: any;
        status: string | number;
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