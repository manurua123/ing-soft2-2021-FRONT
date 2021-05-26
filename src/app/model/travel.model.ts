import { Time } from "@angular/common"

export interface Travel {
    id: number;
    route: number;
    origin: string;
    destination: string;
    price: number;
    departure_date: Date;
    departure_time: Time;
    arrival_date: Date;
    arrival_time: Time;
    available_seats: number;
}

export interface TravelData {
    id?: number;
    route: number;
    origin: string;
    destination: string;
    price: number;
    departure_date: Date;
    departure_time: Time;
    arrival_date: Date;
    arrival_time: Time;
    available_seats: number;

}

