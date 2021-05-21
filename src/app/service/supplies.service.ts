import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResponseBody } from './utils/response.body.model';
import { Supplies , SuppliesData} from 'app/model/supplies.model';
import { elementAt } from 'rxjs-compat/operator/elementAt';


@Injectable({ providedIn: 'root' })
export class SuppliesService {
    private resourceURL = ' http://localhost:8000/api/supplies/';


    constructor(private http: HttpClient) { }


    getAllSupplies(): Observable<Supplies[]> {

        return this.http.get<Supplies[]>(this.resourceURL + 'all/');
    }

    getSupplies(url: string): Observable<ResponseBody> {
        return this.http.get<ResponseBody>(url);
    }

    save(supplies: SuppliesData): Observable<Supplies> {
        return this.http.post<Supplies>(this.resourceURL, supplies);
    }

    update(supplies: SuppliesData): Observable<Supplies> {
        return this.http.put<Supplies>(this.resourceURL + supplies.id + '/', supplies);

    }

    delete(supplies: SuppliesData): Observable<Supplies> {
        return this.http.delete<Supplies>(this.resourceURL + supplies.id + '/');

    }

}


