import { UserData } from './user.model';
import { TravelTicketData } from './travel.model';

export interface Ticket {
    amount_paid?: number;
    birth_date?: string,
    phone: string
    firstName: string;
    lastName: string;
    email: string;
    travel: number;
    user: number;
    suppliesId: TicketSuppliesData[];
    id?: number,
    buy_date?: Date,
    idCards?: number,
    state?: string,

}

export interface TicketSuppliesData {
    id?: number;
    quantity?: number,
    price: number
}

export interface TicketError {
    code: string;
    message: string;
}


export interface TicketRejected {
    id: number;
    travel: TravelTicketData;
    user: UserData;
    buy_date: string;
    amount_paid: number;
    idCards: 29568521;
    birth_date: string;
    phone: 12323;
    firstName: string;
    lastName: string;
    email: string;
    state: string;
    delete: boolean;
    supplies: []
}






