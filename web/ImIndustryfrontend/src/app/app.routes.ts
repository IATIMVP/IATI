import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { AllAuthService } from './service/all-auth.service';
import { CreatePostComponent } from './create-post/create-post.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ManagePostComponent } from './manage-post/manage-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';

export const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
       // canActivate: [AllAuthService]
    },
    {
        path: 'create-post',
        component: CreatePostComponent,
        // canActivate: [AuthGaurdService]
    },
    {
        path: 'reset-password/:token',
        component: ResetPasswordComponent
    },
    {
        path: 'manage-post',
        component: ManagePostComponent
    },
    {
        path: 'edit-post/:id',
        component: EditPostComponent
    }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });