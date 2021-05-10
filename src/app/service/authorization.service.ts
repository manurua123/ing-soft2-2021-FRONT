import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseBody } from './utils/response.body.model';
import { elementAt } from 'rxjs-compat/operator/elementAt';


import { Session } from 'app/model/session.model';

export interface UserParameters {
    username: string;
    password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
    private resourceURL = ' http://localhost:8000/api/token/';
    private resourceAuthorityURL = 'http://localhost:8000/api/roles/get_roles_by_user';


    public userEvent: EventEmitter<any> = new EventEmitter<any>();

    constructor(private http: HttpClient) { }
    singIn(user: string, password: string): Observable<any> {
        return this.http.post(this.resourceURL, { 'username': user, 'password': password });
    }

    getRoles(username: string): Observable<any> {
        return this.http.get<any>(this.resourceAuthorityURL, { params: { "username": username } });
    }

    saveRolByUserLogged(username: string, rol: string) {
        this.userEvent.emit({ 'username': username, 'rol': rol });
    }

    getUserLogged(): EventEmitter<any> {
        return this.userEvent;
    }

}


