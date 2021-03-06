import { Time } from "@angular/common"
import { Tracing } from "trace_events";

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
    duration?:string;
    state?:string;
    type_bus?:string;
    bus_id?: string;
    ticket_sold?:number;
    driver_name?:string;
    route?: number;
}

export interface NextTravelData {
    id?: number;
    origin: string;
    destination: string;
    departure_date: string;
    departure_time: string;
    arrival_date: string;
    arrival_time: string;
    bus_id: string;
    ticket_sold: number;
    state: string;
    canInitTravel: boolean;
    available_seats?: number;
    price?: number;
}