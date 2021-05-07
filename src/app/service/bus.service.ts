import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResponseBody } from './utils/response.body.model';
import { Bus , BusData} from 'app/model/bus.model';
import { elementAt } from 'rxjs-compat/operator/elementAt';


@Injectable({ providedIn: 'root' })
export class BusService {
    private resourceURL = ' http://localhost:8000/api/bus/';

/*    private headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });
  */  

    constructor(private http: HttpClient) {}

    getAllBus(): Observable<Bus[]> {
        return this.http.get<Bus[]>(this.resourceURL+ 'all/');
    }

    getBus(url:string): Observable<ResponseBody> {
        return this.http.get<ResponseBody>(url);
    }

    prueba():Observable<Bus[]> {
        return this.http.get<Bus[]>(this.resourceURL+ 'all/');
    }

    save(driver: BusData): Observable<Bus> {
        return this.http.post<Bus>(this.resourceURL, driver);
    }

    update(driver: BusData): Observable<Bus> {
        return this.http.put<Bus>(this.resourceURL + driver.id + '/', driver);
    }

    delete(driver: Bus): Observable<Bus> {
        return this.http.delete<Bus>(this.resourceURL + driver.id + '/');

    }

}


