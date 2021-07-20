import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private urlBase:string ='https://braided-torch-243217.uc.r.appspot.com'
  //private urlBase:string ='http://localhost:8080'
  constructor() { }

  urlApi(){
    return this.urlBase+'/api'
  }
  urlAuth(){
    return this.urlBase+'/auth'
  }
}
