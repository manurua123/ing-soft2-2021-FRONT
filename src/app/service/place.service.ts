import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResponseBody } from './utils/response.body.model';
import { Place, PlaceData } from 'app/model/place.model';

@Injectable({ providedIn: 'root' })
export class PlaceService {
    private resourceURL = ' http://localhost:8000/api/place/';



    constructor(private http: HttpClient) { }


    getAllPlace(): Observable<Place[]> {

        return this.http.get<Place[]>(this.resourceURL + 'all/');
    }

    getPlace(url: string): Observable<ResponseBody> {
        return this.http.get<ResponseBody>(url);
    }

    save(place: PlaceData): Observable<Place> {
        return this.http.post<Place>(this.resourceURL, place);
    }

    update(place: PlaceData): Observable<Place> {
        return this.http.put<Place>(this.resourceURL + place.id + '/', place);

    }

    delete(place: PlaceData): Observable<Place> {
        return this.http.delete<Place>(this.resourceURL + place.id + '/');

    }
}




