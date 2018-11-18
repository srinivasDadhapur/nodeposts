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
import { PostsService } from './services/posts.service';
import { FriendsComponent } from './components/friends/friends.component';
import { RouteGuard } from './guards/route.guard';
import { FlashMessagesModule,FlashMessagesService  } from 'angular2-flash-messages';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component'

const appRoutes: Routes = [
  {path :'',component:HomeComponent,canActivate:[LoginGuard]},
  {path: 'home', component: HomeComponent, canActivate:[LoginGuard]},
  { path: 'login', component: LoginComponent,canActivate:[LoginGuard]},
  { path: 'profile',component: ProfileComponent,canActivate:[RouteGuard]},
  {path:'posts',component:PostsComponent,canActivate:[RouteGuard]},
  {path:'friends',component:FriendsComponent,canActivate:[RouteGuard]},
  {path:'register',component:RegisterComponent,canActivate:[LoginGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    PostsComponent,
    FriendsComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule
  ],
  providers: [LoginService,PostsService,RouteGuard,FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
