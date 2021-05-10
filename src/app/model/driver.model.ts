export interface Driver {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    birth_date: Date;
    dni: number;

}

export interface DriverData {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    birth_date: Date;
    dni: number;
}