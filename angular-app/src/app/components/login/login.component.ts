import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(private loginAuth: LoginService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    let user = {
      email: this.username,
      password: this.password
    }
    this.loginAuth.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.router.navigate(['posts']);
      }
      else {
        this.router.navigate(['login'])
      }
    });
  }

}
