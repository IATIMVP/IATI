import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';
import { environmentProd } from './../../environments/environment.prod';

@Injectable()
export class EditPostService {

  constructor(private _router: Router, private http: Http) { }
  public BASE_URL: string = environment.config.BASE_URL;


  getPostData(post_id) {
    
    return this.http.get(`${this.BASE_URL}user/getPostDetail/${post_id}`).
      toPromise().then((res: Response) => res.json());
  }

  deletePost(id){
    
    return this.http.get(`${this.BASE_URL}user/deletePost/${id}`).
      toPromise().then((res: Response) => res.json());
  }
  edit_post(data){
    console.log("chek data",data)
    return this.http.post(`${this.BASE_URL}user/edit_post`,data).
      toPromise().then((res: Response) => res.json());
  }
  genrelist() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = `${this.BASE_URL}user/getgenrelist`;
    return this.http.get(url, options).toPromise().then((res: Response) => res.json());
}
}
