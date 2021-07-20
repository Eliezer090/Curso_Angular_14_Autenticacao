import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()


export class AuthInterceptor implements HttpInterceptor{
  constructor(
    private authService:AuthService
  ){

  }
  intercept(req: HttpRequest<any>, next:HttpHandler) {
    console.log(req);
    if(localStorage.getItem('token')){
      let token: string  = localStorage.getItem('token')!;
      const authReq = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
      return next.handle(authReq).pipe(
        catchError((err)=>{
          console.log(err);
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this.authService.logOut();
            }
          }
          return throwError(err);
        })
      )
    }
    return next.handle(req);
  }
}
