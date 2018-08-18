import { Component, OnInit } from '@angular/core';
import { LoginService } from './../login/login.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.css'],
  providers: [LoginService]
})
export class LoginHeaderComponent implements OnInit {

  name: string;
  picture: string;
  userEmail: string;
  getDetail: Promise<any>;
  logoutUser: Promise<any>;
  apiUrl: any;
  constructor(
    private toastr: ToastrService,
    private _router: Router,
    private service: LoginService,
   
  ) {
    this.apiUrl = environment.config.API_URL;
   }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    let id = localStorage.getItem('id');
    this.getDetail = this.service.getDetails(id).then(
      (res: any) => {
        if (res.status == 200) {
          this.name = res.data.name;
          this.picture = this.apiUrl + res.data.picture;
          this.userEmail = res.data.email;
        }
      }
    )
  }

  logout() {
    this.logoutUser = this.service.logoutUser(this.userEmail).then(
      (res: any) => {
        if (res.status == 200) {
          localStorage.removeItem('id');
          this._router.navigate(['/']);
        }
        else {
          this.toastr.error("Can not logout.");
        }
      }
    )
  }

}
