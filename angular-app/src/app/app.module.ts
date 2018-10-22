import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { LoginService } from './services/login.service'
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';


const appRoutes: Routes = [
  {path :'',component:HomeComponent},
  {path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'profile',component: ProfileComponent },
  {path:'posts',component:PostsComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    PostsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
