import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ResponseBody } from './utils/response.body.model';

import { Comment, CommentData } from 'app/model/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
    private resourceURL = ' http://localhost:8000/api/comment/';


    constructor(private http: HttpClient) { }

    getAllComment(): Observable<Comment[]> {
        return this.http.get<Comment[]>(this.resourceURL +'all/');
    }

    getComment(url: string): Observable<ResponseBody> {
        return this.http.get<ResponseBody>(url);
    }

    save(comment: CommentData): Observable<Comment> {
        return this.http.post<Comment>(this.resourceURL, comment);
    }

    update(comment: CommentData): Observable<Comment> {
        return this.http.put<Comment>(this.resourceURL + comment.id + '/', comment);
    }

    delete(comment: Comment): Observable<Comment> {
        return this.http.delete<Comment>(this.resourceURL + comment.id + '/');

    }

}