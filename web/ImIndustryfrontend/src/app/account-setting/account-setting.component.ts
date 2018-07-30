import { Component, OnInit, NgZone, EventEmitter, Output, ViewChild } from '@angular/core';
import { LoginService } from '../login/login.service';
import { FormBuilder, FormGroup, Validators as Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css'],
  providers: [LoginService]
})

export class AccountSettingComponent implements OnInit {
  public userData: any = {};
  public userForm: FormGroup;
  public userPasswordForm: FormGroup;
  public userInfo: any = {};
  is_edit: boolean;

  constructor( private service: LoginService,private formBuilder: FormBuilder, private zone: NgZone,private toastr: ToastrService,) {
    this.is_edit = true;
   }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      gender: [''],
      phone: [''],
      birth_month: [''],
      birth_year: [''],
      country: [''],
      address: [''],
      address1: [''],
      city: [''],
      state: [''],

      zip: ['']

    })

    this.userPasswordForm = this.formBuilder.group({
      email: [''],
      password: ['',Validators.required],
      user_id: ['']
    })
    let data = JSON.parse(localStorage.getItem('user_login'));
    let user_id = data._id;
    this.getUserData(user_id);
  }


  getUserData(user_id)
  {
    var self = this;
    this.service.getDetails(user_id).then(function(res){
      
      if(res.status == 200)
      {
        let user_data = res.data;
        self.userInfo.birth_month = user_data.birth_month;
        self.userInfo.birth_year = user_data.birth_year;
        self.userInfo.gender = user_data.gender;
        self.userInfo.phone = user_data.phone;
        self.userInfo.country = user_data.country;
        self.userInfo.address = user_data.address;
        self.userInfo.address1 = user_data.address1;
        self.userInfo.country = user_data.country;
        self.userInfo.city = user_data.city;
        self.userInfo.state = user_data.state;
        self.userInfo.zip = user_data.zip;
        self.userData.email = user_data.email;
        self.userData.user_id = user_data._id; 
        self.userData.password = ''; 
        //  self.userData = user_data;
      }
      else{


      }

    })
    
  }

  post_submission_error() {
    this.userPasswordForm.controls['password'].markAsTouched();
  }

  updateUserPassword(userInfo) {
    let _this = this;
    _this.post_submission_error();
    if (_this.userPasswordForm.valid) {
      _this.service.updatePassword(userInfo).then(function(res){
        
        if(res.status == 200)
        {
          _this.zone.run(() => {
            _this.toastr.success("password changed successfully.");
          });
        }
        else{
  
          _this.zone.run(() => {
            _this.toastr.error("Error in updating !!");
          });
        }
  
      })
    }
   
  }

  updateUserInfo(userInfo) {
    console.log("sonia",userInfo)
    // let _this = this;
    // _this.post_submission_error();
    // if (_this.userPasswordForm.valid) {
    //   _this.service.updatePassword(userInfo).then(function(res){
        
    //     if(res.status == 200)
    //     {
    //       _this.zone.run(() => {
    //         _this.toastr.success("password changed successfully.");
    //       });
    //     }
    //     else{
  
    //       _this.zone.run(() => {
    //         _this.toastr.error("Error in updating !!");
    //       });
    //     }
  
    //   })
    // }
   
  }
   

}
