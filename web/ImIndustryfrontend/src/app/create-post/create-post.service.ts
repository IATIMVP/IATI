import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';
import { environmentProd } from './../../environments/environment.prod';
import { Session } from "../helper/session";

@Injectable()
export class PostService {

    constructor(private _router: Router, private http: Http) { }
    public BASE_URL: string = environment.config.BASE_URL;


    create_post(userInfo) {
        const headers = new Headers({ 'Content-Type': undefined });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(`${this.BASE_URL}user/create`, userInfo)
            .toPromise().then((res: Response) => res.json());
    }

    genrelist() {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        const url = `${this.BASE_URL}user/getgenrelist`;
        return this.http.get(url, options).toPromise().then((res: Response) => res.json());
    }

 
}