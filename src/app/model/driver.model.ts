export interface Driver {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    birth_date: Date;
    idCards: number;

}

export interface DriverData {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    birth_date: Date;
    idCards: number;
}