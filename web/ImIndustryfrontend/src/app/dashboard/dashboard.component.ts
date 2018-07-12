import { Component, OnInit,EventEmitter, NgModule} from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {Message,ConfirmationService} from "primeng/primeng";
import { DatePipe } from '@angular/common';
import {GrowlModule} from 'primeng/growl';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  providers: [DashboardService,DatePipe,ConfirmationService],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  url:any;
  lists: any = [];
  msgs: Message[];

  constructor( private _service: DashboardService,private router: Router,private datePipe: DatePipe,private confirmationService: ConfirmationService,
    private toastr: ToastrService) {

   }


  ngOnInit() {
  
        this.listingPosts();
      }
    
      listingPosts()
      {
         let data = JSON.parse(localStorage.getItem('user_login'));
         let user_id = data._id;
         this._service.getPosts(user_id)
         .then(res => {
           if (res.status == 200) {

            let postsarr = JSON.parse(res.data);
            let newarr:any=[];
            
            for (let prop of postsarr) {

              prop.formattedDate= this.datePipe.transform(prop.created_date, 'MMMM d, y, h:mm a');
              newarr.push(prop);
            }         
            
            this.lists = newarr;
           
           }

           else{
            this.toastr.error('Error in post', 'Error'); 
           }

          })
      }
    
      deletePosts(id){
         this.confirmationService.confirm({
           message: 'Are you sure to delete Post?',
           header: 'Confirmation',
           icon: 'fa fa-question-circle',
           accept: () => {
            
             this._service.deletePost(id)
               .then(res => {
                 if (res.status == 200) {
                   this.msgs = [];
                   this.msgs.push({severity: 'success', summary: 'This post has been deleted'});
                   this.listingPosts();
                   
                 }
                 else if (res.status === 401) {
                   this.msgs = [];
                   this.msgs.push({severity: 'error', summary: 'Error Message', detail: res.msg});
                 }
                 else {
                   this.msgs = [];
                   this.msgs.push({severity: 'error', summary: 'Error Message', detail: res.msg});
                 }
             })
           },
           reject: () => {
             this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
           }
         });
         
       }

        editPosts(id)
        {
          this.router.navigate(['/edit-post', id]);
        }

}
