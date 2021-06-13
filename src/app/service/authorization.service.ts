import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map} from 'rxjs/operators';
import { ResponseBody } from './utils/response.body.model';
import { elementAt } from 'rxjs-compat/operator/elementAt';


import { Session } from 'app/model/session.model';
import { LocalStorageService } from './utils/local.store.service';

export interface UserParameters {
    username:  string;
    password:string;
}

@Injectable({ providedIn: 'root' })
export class AuthorizationService implements OnInit {
    private resourceURL = ' http://localhost:8000/api/user/';
    private resourceAuthorityURL = 'http://localhost:8000/api/roles/get_roles_by_user';
    
     
    public userEvent:EventEmitter<any> = new EventEmitter<any>();

    constructor(private http: HttpClient, private localStore: LocalStorageService) {}
    
    ngOnInit() {
        
    }
    
    changePassword (user:number, password:string): Observable<any> {
        return this.http.post(this.resourceURL+'change_password/', {'user': user, 'password': password})
    }

   singIn(user: string, password: string): Observable<any> {
        return this.http.post(this.resourceURL+'sign_in/', {'username': user, 'password': password});
   }
    
   getRoles(username:string) {
        return this.http.get<any>(this.resourceAuthorityURL, {params :{"username":username}});
   }
   
   saveUserData(username: string, rol: string, id: string, gold: boolean) {
    this.localStore.set('username', username);
    this.localStore.set('rol', rol);
    this.localStore.set('id', id);
    this.localStore.set('gold', gold ? '1' : '0')
}
   
    updateUserLogged() {
    this.userEvent.emit({
        username: this.localStore.get('username'),
        'rol': this.localStore.get('rol'),
        'id': this.localStore.get('id'),
        'gold': this.localStore.get('gold')
    })
}

   getUserLogged():Observable<any> {
       return this.userEvent;
   }

}


