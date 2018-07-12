import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacebookModule } from 'ng2-facebook-sdk';
import { AppComponent } from './app.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginHeaderComponent } from './login-header/login-header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CookieModule } from 'ngx-cookie';
import {GrowlModule} from 'primeng/primeng';
import {ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxCropperModule } from 'ngx-cropper';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { FileUploadModule } from "ng2-file-upload/file-upload/file-upload.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { AllAuthService } from './service/all-auth.service';
import { LoginService } from './login/login.service';
import { CreatePostComponent } from './create-post/create-post.component';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ManagePostComponent } from './manage-post/manage-post.component';
import { Session } from "./helper/session";
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    LoginHeaderComponent,
    ImageCropperComponent,
    FooterComponent,
    DashboardComponent,
    CreatePostComponent,
    LeftBarComponent,
    ResetPasswordComponent,
    ManagePostComponent,
    EditPostComponent
  ],
  imports: [
    FormsModule,
    FileUploadModule,
    AngularDraggableModule,
    ImageCropperModule,
    DragulaModule,
    HttpModule,
    BrowserAnimationsModule,
    FacebookModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ToastrModule.forRoot(),
    CookieModule.forRoot(),
    GrowlModule,
    ConfirmDialogModule,
  ],
  providers: [AuthGaurdService,AllAuthService,Session,LoginService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
