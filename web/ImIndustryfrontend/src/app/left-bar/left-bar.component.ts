import { Component, OnInit } from '@angular/core';
import { LoginService } from './../login/login.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.css'],
  providers: [LoginService]
})
export class LeftBarComponent implements OnInit {

  getDetail: Promise<any>;
  name: string;
  email: string;
  picture: string;
  apiUrl: any;
  constructor(
    private service: LoginService
  ) {this.apiUrl = environment.config.API_URL; }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    let id = localStorage.getItem('id');
    this.getDetail = this.service.getDetails(id).then(
      (res: any) => {
        if (res.status == 200) {
          this.name = res.data.name;
          this.email = res.data.email;
          this.picture = this.apiUrl + res.data.picture;
        }
      }
    )
  }

}
