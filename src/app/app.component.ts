import { observable, Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';
import { User } from './auth/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'loginapp';
  authenticated$: Observable<boolean> = new Observable;
  users$: Observable<User|null> = new Observable;
  constructor(
    private authService: AuthService
  ){
    this.authenticated$ = this.authService.isAutenticated();
    this.users$ = this.authService.getUser();
  }

  logOut(){
    this.authService.logOut();
  }
}
