declare namespace API {

    export type CommonResp = {
        status: number;
        data: any;
        msg: string;
        error: string;
    }

    export type UserRegisterReq = {
        user_name:string;
        password:string;
    }

    export type UserLoginReq = {
        user_name:string;
        password:string;
    }

    export type UserLoginResp = {
        user: UserLoginDataResp;
        token: string;
    }

    export type UserLoginDataResp = {
        id: number;
        user_name: string;
        create_at: number;
    }
    

}
