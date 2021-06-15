import { Time } from "@angular/common"

export interface Travel {
    id: number;
    route: number;
    price: number;
    departure_date: Date;
    arrival_date: Date;
    available_seats: number;
}

export interface TravelData {
    id?: number;
    route: number;
    price: number;
    departure_date: string;
    arrival_date: string;
    available_seats: number;
}

export interface TravelTicketData {
    id?: number;
    origin: string;
    destination: string;
    departure_date: string;
    departure_time: string;
    arrival_date: string;
    arrival_time: string;
    price: number;
    available_seats: number;
    delete: boolean;
}