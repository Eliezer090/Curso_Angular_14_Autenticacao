import { User } from './user';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { UrlService } from './../url.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static isAutenticated(): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  readonly url = this.urlService.urlAuth();

  private subjectUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private subjectLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private urlService: UrlService,
    private router: Router
  ) { }
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user);
  }
  login(credentials: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, credentials)
      .pipe(
        tap((u: User) => {
          localStorage.setItem('token', u.token);
          this.subjectLoggedIn$.next(true);
          this.subjectUser$.next(u);
        })
      )
  }
  isAutenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (token && !this.subjectLoggedIn$.value) {
      return this.checkTokenValidation();
    }
    return this.subjectLoggedIn$.asObservable();
  }

  checkTokenValidation(): Observable<boolean> {
    return this.http.get<User>(`${this.url}/user`).pipe(
      tap((u: User) => {
        localStorage.setItem('token', u.token);
        this.subjectLoggedIn$.next(true);
        this.subjectUser$.next(u);
      }),
      map((u: User) => (u) ? true : false),
      catchError((err)=>{
        this.logOut();
        return of(false);
      })
    )
  }

  getUser(): Observable<User | null> {
    return this.subjectUser$.asObservable();
  }
  logOut() {
    localStorage.removeItem('token');
    this.subjectLoggedIn$.next(false);
    this.subjectUser$.next(null);
    this.router.navigateByUrl('/auth/login')
  }
}
