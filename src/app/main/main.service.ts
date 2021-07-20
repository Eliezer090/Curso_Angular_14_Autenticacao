import { UrlService } from './../url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Person } from './person';
import { Product } from './product';
import { catchError, tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class MainService {

  readonly url = this.urlService.urlApi(); //'https://braided-torch-243217.uc.r.appspot.com/api' //'http://34.66.99.84:300/api';

  constructor(
    private http: HttpClient,
    private urlService:UrlService
  ) {

  }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.url}/people`)
      .pipe(
        tap(p => console.log(p)),
        catchError((e) => {
          return throwError(e);
        })
      );
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`)
      .pipe(
        tap(p => console.log(p)),
        catchError((e) => {
          return throwError(e);
        })
      );
  }
}
