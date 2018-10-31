import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

  checkUser(): boolean{
    if(localStorage.getItem('userToken')){
      return true;
    }
    return false;
  }
  clearItem(){
    localStorage.removeItem('userToken');
  }



}
