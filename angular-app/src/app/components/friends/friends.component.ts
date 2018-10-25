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

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.getposts();
    this.getUsers();
  }
  getposts() {
    this.feedService.getPosts().subscribe(data => {
        this.posts = data;
        console.log(data);
    });
}
getUsers(){
  this.feedService.getUsers().subscribe(data => {
    this.users = data;
    console.log(data);
});
}

}
