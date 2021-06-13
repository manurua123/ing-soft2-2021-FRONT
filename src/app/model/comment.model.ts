
export interface Comment {
    id?: number;
    user_first_name?: string;
    user_last_name?:string;
    date: Date;
    text: string;
    user: number;

}

export interface CommentData {
    id?: number;
    user_first_name?: string;
    user_last_name?:string;
    text: string;
    user: number;
}

