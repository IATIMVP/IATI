import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators as Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FacebookService, InitParams, LoginResponse } from 'ng2-facebook-sdk';
import { environment } from './../../environments/environment';
import { validateEmail, validatePassword } from './../common/common';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  busy: Promise<any>;
  gService: Promise<any>;
  auth2: any;
  public Google_App_Id: string = environment.config.GOOGLE_CLIENT_ID;
  public Fb_App_Id: string = environment.config.FB_APP_ID;
  constructor(
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private _router: Router,
    private service: LoginService,
    private toastr: ToastrService,
    private fb: FacebookService
  ) { }

  ngOnInit() {
    this.googleInit();
    this.fb.init(this.initParams);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  initParams: InitParams = {
    appId: this.Fb_App_Id,
    version: 'v1.0',
    xfbml: true
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.Google_App_Id,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        let userDetails = {
          profile,
          loginType: 3
        }
        this.gService = this.service.signup(userDetails).then(
          (res: any) => {
            if (res.status == 400 || res.status == 200) {
              localStorage.setItem('id', res.data._id);
              this.zone.run(() => {
                this.toastr.success("Login successful");
                this._router.navigate(['/create-post']);
              });

            }
            else{
              this.toastr.success("Login unsuccessful");
              this._router.navigate(['/login']);
            }
          }
        )
      }, (error) => {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  facebookLogin() {
    this.fb.login()
      .then((response: LoginResponse) => {
        console.log(response);
      }).catch((err) => {
        console.log('error while login')
      })
  }

  login_submission_error() {
    this.loginForm.controls['email'].markAsTouched();
    this.loginForm.controls['password'].markAsTouched();

  }


  login() {
    console.log('----------------------', !this.loginForm.valid)
    this.login_submission_error();
    if (!this.loginForm.valid) {
      this.zone.run(() => {
        this.toastr.error('Please fill the login form');
      });
    }
    else {
      this.zone.run(() => {
        let data = {
          email:this.loginForm.value.email,
          password:this.loginForm.value.password
        }
        this.service.login(data).then(
          (res: any) => {
            if (res.status == 400 || res.status == 200) {
             // localStorage.setItem('id', res.data._id);
              this.service.setSession(res.data);
              
              this.zone.run(() => {
                this.toastr.success("Login successful");
                this._router.navigate(['/dashboard']);
              });

            }
            else{
              this.zone.run(() => {
                this.toastr.error("Not a valid email");
                this._router.navigate(['/login']);
              });
             
            }
          }
        )
        // this.toastr.success("Login successful");
        // this._router.navigate(['/create-post']);
      })
    }
  }
}
