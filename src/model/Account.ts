import { Permission } from "./Enum/Permission";
import { Patent } from "./Enum/Patent";

export interface Account {
    _id?: number,
	login?: string,
    password?: string,
    permission?: Permission
    name?: string,
    patent?: Patent,
    age?: string,
	created_at?: Date
};