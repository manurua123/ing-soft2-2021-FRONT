export interface Route {
    id: number;
    origin: string;
    origin_id: number;
    destination:string;
    destination_id: number;
    bus:string;
    bus_id:number
    duration: number;
    distance: number;
    total_minute?: number;
    seat_numbers? : number;
}

export interface RouteData {
    id?: number;
    origin: number;
    destination:number;
    bus:number;
    duration: number;
    distance: number;
}