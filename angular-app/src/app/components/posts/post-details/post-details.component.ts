import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  private post = {};
  private comment;

  constructor(private route:ActivatedRoute,private postService:PostsService, private feedService: FeedService) { 
  }

  ngOnInit() {
  this.getpost();
  }


  getpost(){
    this.postService.getPost(this.route.snapshot.paramMap.get('id')).subscribe(data=>{
      this.post = data;
     //  console.log(this.post);
      
    });
  }



  postComment(id) {
    if (this.comment != undefined) {
        let token = localStorage.getItem('userToken');
        this.feedService.getUsername(token).subscribe(data => {
            let postedUser = data.name;
            this.feedService.postComments(id, this.comment, postedUser).subscribe(data => {
                // console.log(data);
                this.comment = '';
                this.getpost();
            }, error => {
                // console.log(error);
            });
        });
    }
    else {
        // validcomment.hidden = false;
    }
    // console.log(comment+ " " + user+ " postedUser: "+ postedUser+ " post"+id);

}





}
