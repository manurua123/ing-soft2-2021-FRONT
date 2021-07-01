import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResponseBody } from './utils/response.body.model';
import { Travel, TravelData,TravelTicketData } from 'app/model/travel.model';
import { Ticket, TicketError } from 'app/model/ticket.model';
import { tick } from '@angular/core/testing';

@Injectable({ providedIn: 'root' })
export class TravelService {
    private resourceURL = ' http://localhost:8000/api/travel/';

    constructor(private http: HttpClient) { }
    getAllTravel(): Observable<TravelTicketData[]> {
        return this.http.get<TravelTicketData[]>(this.resourceURL + 'all/');
    }

    getTravel(url: string): Observable<ResponseBody> {
        return this.http.get<ResponseBody>(url);
    }

    getAvailableTravel(origen: number, destination: number, departure: string): Observable<TravelTicketData[]> {
        let params = new HttpParams();
        params = params.append('origin', origen.toString());
        params = params.append('destination', destination.toString());
        params = params.append('departure', departure);
        return this.http.get<TravelTicketData[]>(this.resourceURL+'get_available_travel',{params: params});
    }

    save(travel: TravelData): Observable<Travel> {
        return this.http.post<Travel>(this.resourceURL, travel);
    }

    update(travel: TravelData): Observable<Travel> {
        return this.http.put<Travel>(this.resourceURL + travel.id + '/', travel);
    }

    delete(travel: Travel): Observable<Travel> {
        return this.http.delete<Travel>(this.resourceURL + travel.id + '/');
    }

    private ticketURL = 'http://localhost:8000/api/ticket';
    get_my_travels(userID: string): Observable<Ticket> {
        return this.http.get<Ticket>(this.ticketURL +'/get_my_travels', { params: { user: userID } });
    }

   
    returnTicket(ticket:Ticket): Observable<TicketError>{

        return this.http.post<TicketError>(this.ticketURL + '/return_ticket/', { 'ticket': ticket.id} );
    }
}
