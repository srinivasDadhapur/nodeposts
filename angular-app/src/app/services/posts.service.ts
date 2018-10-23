import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }
  public userid;

  getPosts() {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<any>('http://localhost:8080/getposts',{userId:this.userid},{headers:headers}).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  postComments(comment, username) {
    // let headers = new HttpHeaders().set('Content-Type','application/json');
    // return this.http.put<any>('http://localhost:8080/getposts',{comment:comment,user:username},{headers:headers}).pipe(catchError(this.errorHandler));
  }
  addPost(post,username){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<any>('http://localhost:8080/post',{userId:username,post:post},{headers:headers}).pipe(catchError(this.errorHandler));
  }
}
