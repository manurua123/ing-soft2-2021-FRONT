import { SimplifiedSaleComponent } from 'app/components/simplifiedSale/simplified-sale-travel.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResponseBody } from './utils/response.body.model';
import { Travel, TravelData, TravelTicketData } from 'app/model/travel.model';
import { Ticket,TicketRejected } from 'app/model/ticket.model';
import { StringifyOptions } from 'querystring';

import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TicketService {
    private resourceURL = ' http://localhost:8000/api/ticket/';

    constructor(private http: HttpClient) { }

    save(tiket: Ticket): Observable<Ticket> {
        return this.http.post<Ticket>(this.resourceURL, tiket);
    }
    
    simplifiedSale(username: String, travel: number): Observable<any> {
        return this.http.post<any>(this.resourceURL+'simple_buy/', {username: username, travel: travel});
    }

    getTickets(idTravel: string): Observable<Ticket[]> {
      
        return this.http.get<Ticket[]>(this.resourceURL +'get_tickets_travel/', { params: { travel: idTravel } });
    }

    get_ticket_rejected(url: string): Observable<ResponseBody> {
        return this.http.get<ResponseBody>(url);
    }
    test_result(idTicket: number, state: string): Observable<Ticket> {
        return this.http.post<Ticket>(this.resourceURL + 'test_result/', {ticket: idTicket, state: state});
    }
   
}
