import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(private loginAuth: LoginService, private router: Router,private flashmessages: FlashMessagesService) { }

  ngOnInit() {
    
  }

  loginUser() {

    if (this.username == undefined) {
      return this.flashmessages.show('please enter user name' , {cssClass: 'alert-danger',timeout:1000});
    }
    else if(this.password==undefined){
      return this.flashmessages.show('please enter password' , {cssClass: 'alert-danger',timeout:1000});
    }
    else {
      let user = {
        email: this.username,
        password: this.password
      }
      this.loginAuth.authenticateUser(user).subscribe(data => {
        if (data.success) {
          localStorage.setItem('userToken', data.token);
          //console.log(data); 
          this.router.navigate(['posts']);
        }
        else {
          this.router.navigate(['login'])
        }
      }, error => {
        if(error.error.msg=='invalid user'){
          this.flashmessages.show('User does not exists' , {cssClass: 'alert-danger',timeout:1500});
        }
        else if(error.error.msg='invalid password'){
          this.flashmessages.show('invalid password' , {cssClass: 'alert-danger',timeout:1500});
        }

      });
    }
  }

}
