
interface authUser{
    name:string,
    id:number
}

declare namespace Express{
    export interface Request{
        user?:authUser,
    }
}