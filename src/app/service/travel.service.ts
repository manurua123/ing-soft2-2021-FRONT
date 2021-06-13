import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResponseBody } from './utils/response.body.model';
import { Travel, TravelData } from 'app/model/travel.model';
import { Ticket } from 'app/model/ticket.model';
import { tick } from '@angular/core/testing';

@Injectable({ providedIn: 'root' })
export class TravelService {
    private resourceURL = ' http://localhost:8000/api/travel/';

    constructor(private http: HttpClient) { }

    getAllTravel(): Observable<Travel[]> {
        return this.http.get<Travel[]>(this.resourceURL + 'all/');
    }

    getTravel(url: string): Observable<ResponseBody> {
        return this.http.get<ResponseBody>(url);
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

   
    returnTicket(ticket:Ticket){
        return this.http.post(this.ticketURL + '/return_ticket/', { 'ticket': ticket.id} );
    }
}
