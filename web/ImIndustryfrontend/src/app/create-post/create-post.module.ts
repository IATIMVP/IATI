import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppModule } from '../app.module';
import { RouterModule } from '@angular/router';
import { CreatePostComponent } from './create-post.component';


@NgModule({
    imports: [
        RouterModule,
        AppModule,
        FormsModule,
        HttpModule,
    ],
    exports: [],
    declarations: [CreatePostComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PostModule { }