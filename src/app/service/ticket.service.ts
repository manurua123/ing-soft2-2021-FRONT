import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResponseBody } from './utils/response.body.model';
import { Travel, TravelData, TravelTicketData } from 'app/model/travel.model';
import { Ticket } from 'app/model/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
    private resourceURL = ' http://localhost:8000/api/ticket/';

    constructor(private http: HttpClient) { }

    save(tiket: Ticket): Observable<Ticket> {
        return this.http.post<Ticket>(this.resourceURL, tiket);
    }

}
