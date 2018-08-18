import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';
import { environmentProd } from './../../environments/environment.prod';

@Injectable()
export class DashboardService {

  constructor(private _router: Router, private http: Http) { }
  public BASE_URL: string = environment.config.BASE_URL;


  getPosts(user_id) {
    
    return this.http.get(`${this.BASE_URL}user/getpostsList/${user_id}`).
      toPromise().then((res: Response) => res.json());
  }

  deletePost(id){
    
    return this.http.get(`${this.BASE_URL}user/deletePost/${id}`).
      toPromise().then((res: Response) => res.json());
  }

}
