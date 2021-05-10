import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResponseBody } from './utils/response.body.model';
import { User } from 'app/model/user.model';

@Injectable({ providedIn: 'root' })
export class USerService {
    private resourceURL = ' http://localhost:8000/api/profile/';

    constructor(private http: HttpClient) { }


    save(user: User): Observable<User> {
        return this.http.post<User>(this.resourceURL, user);
    }

}
