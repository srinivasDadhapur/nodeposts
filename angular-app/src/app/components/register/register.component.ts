import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public username: string;
  public password: string;
  public name: string;

  constructor(private loginAuth: LoginService, private router: Router,private flashmessages: FlashMessagesService) { }

  ngOnInit() {

  }

  registerUser() {

    if (this.name == undefined){
      return this.flashmessages.show('please enter your name' , {cssClass: 'alert-danger',timeout:1000});
    }
    else if (this.username == undefined) {
      return this.flashmessages.show('please enter user name' , {cssClass: 'alert-danger',timeout:1000});
    }
    else if(this.password==undefined){
      return this.flashmessages.show('please enter password' , {cssClass: 'alert-danger',timeout:1000});
    }
    else {
      let user = {
        name: this.name,
        email: this.username,
        password: this.password
      }
      this.loginAuth.registerUser(user).subscribe(data => {
        if (data.success) {
          this.router.navigate(['login']);
          this.flashmessages.show('registered successfully' , {cssClass: 'alert-danger',timeout:1500});
        }
        else {
          this.router.navigate(['register'])
        }
      }, error => {
          this.flashmessages.show('cannot register' , {cssClass: 'alert-danger',timeout:1500});
      });
    }
  }

}
