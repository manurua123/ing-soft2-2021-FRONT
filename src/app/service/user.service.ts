import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResponseBody } from './utils/response.body.model';
import { User, UserData } from 'app/model/user.model';

@Injectable({ providedIn: 'root' })
export class USerService {
    private resourceURL = ' http://localhost:8000/api/profile/';
    private profileURL = 'http://localhost:8000/api/user/view_profile/'
    constructor(private http: HttpClient) { }


    save(user: User): Observable<User> {
        return this.http.post<User>(this.resourceURL, user);

    }

    view_profile(username: string) {
        return this.http.post<User>(this.profileURL, { 'username': username, });
    }

    update(user: UserData): Observable<User> {

        return this.http.put(this.resourceURL + user.id + '/', user);
    }

    unsubscribe(user: User) {


    }
}

