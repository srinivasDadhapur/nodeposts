import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { LoginService } from '../../services/login.service';
import { FeedService } from '../../services/feed.service';
@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    private posts = [];
    private userId;

    constructor(private postService: PostsService, private loginService: LoginService, private feedService:FeedService) { }

    ngOnInit() {
        let token = localStorage.getItem('userToken');
        this.feedService.getUsername(token).subscribe(data=>{
            if(data.tokenexists){
                this.getposts(data.email);
                this.userId = data.email;
            }
        });
    }


    getposts(email) {
        this.postService.getPosts(email).subscribe(data => {
            this.posts = data;
            // console.log(data);
        });
    }

    newpost(title,newpostval,postalert) {
        if (newpostval != '') {
            this.postService.addPost(title,newpostval, this.userId).subscribe(data => {
                if(data){
                    this.getposts(this.userId);
                }
            });
        }
        else{
            postalert.hidden = false
        }
    }



    postComment(validcomment, comment, id) {
        if (comment != '') {
            let token = localStorage.getItem('userToken');
            this.feedService.getUsername(token).subscribe(data => {
                let postedUser = data.name;
                this.feedService.postComments(id, comment, postedUser).subscribe(data => {
                    // console.log(data);
                    this.getposts(this.userId);
                }, error => {
                    // console.log(error);
                });
            });
        }
        else {
            validcomment.hidden = false;
        }
        // console.log(comment+ " " + user+ " postedUser: "+ postedUser+ " post"+id);

    }


    // postComment(commentarea,user){
    //   console.log(commentarea.value+ ' User is : '+user)
    //   this.postService.postComments(commentarea,user).subscribe(data => {
    //     console.log(data);
    // });
    // }

}
