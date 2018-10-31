import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FeedService } from './feed.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient, private feedService: FeedService) { }
  

  getPosts(userId) {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<any>('http://localhost:8080/getposts',{userId:userId},{headers:headers}).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
  addPost(post,username){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<any>('http://localhost:8080/post',{userId:username,post:post},{headers:headers}).pipe(catchError(this.errorHandler));
  }
}
