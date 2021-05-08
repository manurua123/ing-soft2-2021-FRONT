export interface Bus {
    id: number;
    driver: String;
    driver_id: number;
    identification: string;
    model: string;
    licencePlate: string;
    seatNumbers: number;
    type: string;
}

export interface BusData {
    id?: number;
    identification: string;
    driver_id: number;
    driver: string;
    model: string;
    licencePlate: string;
    seatNumbers: number;
    type: string;
}

