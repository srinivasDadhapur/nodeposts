import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }


  getPosts() {
    return this.http.get<any>('http://localhost:8080/getposts').pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  postComments(comment, username) {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.put<any>('http://localhost:8080/getposts',{comment:comment,user:username},{headers:headers}).pipe(catchError(this.errorHandler));
  }
}
