import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResponseBody } from './utils/response.body.model';

import { Driver, DriverData } from 'app/model/driver.model';

@Injectable({ providedIn: 'root' })
export class DriverService {
    private resourceURL = ' http://localhost:8000/api/driver/';


    constructor(private http: HttpClient) { }

    getAllDriver(): Observable<Driver[]> {
        return this.http.get<Driver[]>(this.resourceURL + 'all/');
    }

    getDriver(url: string): Observable<ResponseBody> {
        return this.http.get<ResponseBody>(url);
    }

    save(driver: DriverData): Observable<Driver> {
        return this.http.post<Driver>(this.resourceURL, driver);
    }

    update(driver: DriverData): Observable<Driver> {
        return this.http.put<Driver>(this.resourceURL + driver.id + '/', driver);
    }

    delete(driver: Driver): Observable<Driver> {
        return this.http.delete<Driver>(this.resourceURL + driver.id + '/');

    }

}