import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { LoginService } from '../../services/login.service';
@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    private users = [];
    private keys = [];

    constructor(private postService: PostsService, private loginService: LoginService) { }

    ngOnInit() {
        this.getposts();
    }

    getposts() {
        this.postService.getPosts().subscribe(data => {
            this.users = data;
            console.log(data);
        });
    }

    newpost(newpostval) {

        if (newpostval != '') {
            this.postService.addPost(newpostval, this.postService.userid).subscribe(data => {
                console.log(data);
            });
        }
    }

    // postComment(commentarea,user){
    //   console.log(commentarea.value+ ' User is : '+user)
    //   this.postService.postComments(commentarea,user).subscribe(data => {
    //     console.log(data);
    // });
    // }

}