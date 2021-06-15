
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

export interface TicketError{
    code: string;
    message: string;
}


