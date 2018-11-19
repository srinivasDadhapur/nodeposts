import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  private var;

  constructor() { 
  }

  ngOnInit() {
    console.log(this.var);
    
  }

}
