import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  private users = [];
  private posts = [];
  private showuser=true;
  private commentEmpty = false;

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.getposts();
    this.getUsers();
  }
  getposts() {
    this.feedService.getPosts().subscribe(data => {
        this.posts = data;
        // console.log(data);
    });
}

checkUser(username){
  for( let i=0; i<this.posts.length; i++){
    if(this.posts[i].userId==username){
      return true
    }
  }
  return false
}
getUsers(){
  this.feedService.getUsers().subscribe(data => {
    this.users = data;
    // console.log(data);
});
}
postComment(validcomment, comment,id){
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjViYmRkZDAxNTFhYzlhZDE5NWY5MjhjMiIsInBvc3RzIjpbIiB0aGUgcG9zdCBoZXJlIGlzIHJlbGF0ZWQgdG8gcHJvZmVzc29yIHByb3RvbiBzaG93IGFpcmVkIGluIGJiYyBvbiBldmVyeSBzdW5kYXkgYXQgNCBBTSwgdGhlIHNob3cgd2FzIG9yaWdpbmFsbHkgdGhlIHNob3cgd2FzIGludGVuZGVkIGZvciBraWRzIGJ1dCBsYXRlciBvbiBpdCB3YXMgdGFrZW4gYnkgYWxsIHNvcnRzIG9mIHBlcnNvbiBhcyBpdCBoYWQgZXhjaXRpbmcgc2NpZW5jZSBleHBlcmltZW50cyBldmVuIHRoZSBhZHVsdHMgd2VyZSBhbXVzZWQgb2YuIHRoZSBzaG93IHdhcyBjYW5jZWxsZWQgb24gaXRzIGZpZnRoIHNlYXNvbiBhcyBpdCBkaWQgbm90IHJlY2VpdmVkIHRoZSBlbm91Z2ggbW9uZXRhcnkgdmFsdWUgZm9yIGl0cyBleHBlbnNlcyIsInRoZXJlIGlzIHNvbWUgb3RoZXIgcG9zdCJdLCJuYW1lIjoiUHJvZmVzc29yIFByb3RvbiIsImVtYWlsIjoicHJvdG9uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGR2Tmo1UC9zcTZncW1FTTJ6TGNqb3UzZ0hSTE9xOWhzRWN0VlNvQmpSTEdtWThrOTJaM3RxIiwiX192IjowfSwiaWF0IjoxNTQwMjExMjM5fQ.BdJ2-pkRfOOLlWhQkXiq-2ywmnfAqVRQBoPfIgUgpMQ"
  let postedUser = "";
  this.feedService.getUsername(token).subscribe(data=>{
    postedUser = data.token;
    if(comment!=''){
      this.feedService.postComments(id,comment,postedUser).subscribe(data=>{
        console.log(data);
        this.getposts();
      },error=>{
        console.log(error);
      });
     }
     else{
       validcomment.hidden = false;
     }
  });
  // console.log(comment+ " " + user+ " postedUser: "+ postedUser+ " post"+id);
  
}

}
