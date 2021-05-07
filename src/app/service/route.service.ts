import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResponseBody } from './utils/response.body.model';
import { Route, RouteData } from 'app/model/route.model';

@Injectable({ providedIn: 'root' })
export class RouteService {
    private resourceURL = ' http://localhost:8000/api/route/';


    constructor(private http: HttpClient) {}

    getAllRoute(): Observable<Route[]> {
        
        return this.http.get<Route[]>(this.resourceURL+ 'all/');
    }

    getRoute(url:string): Observable<ResponseBody> {
        return this.http.get<ResponseBody>(url);
    }

    save(route: RouteData):Observable<Route> {
        return this.http.post<Route>(this.resourceURL,route);
    }

    update(route: RouteData):Observable<Route> {
        return this.http.put<Route>(this.resourceURL + route.id +'/',route);
    
    }

    delete(route: Route):Observable<Route> {
        return this.http.delete<Route>(this.resourceURL + route.id +'/');
    
    }

}
