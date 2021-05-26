import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResponseBody } from './utils/response.body.model';
import { Travel, TravelData } from 'app/model/travel.model';

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

}
