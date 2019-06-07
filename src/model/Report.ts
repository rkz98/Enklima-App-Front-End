import { Status } from "./Enum/Status";

export interface Report {
    _id?: string,
    officer_id?: number,
	report?: string,
    place?: string,
    status?: Status;
	created_at?: Date
};