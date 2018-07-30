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
  totalCount;
  limit = 10;
  pageNo = 1;
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
            this.totalCount = this.lists.length
           console.log(this.totalCount,'totallcount')
           }

           else{
            this.toastr.error('Error in post', 'Error'); 
           }

          })
      }
      // paginate(event) {
      //   console.log(event, 'page')
      //   this.pageNo = event.page + 1
      //   this.listingPosts()
      // }
      paginate(event) {
        console.log(event,'eventtt')
        // event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
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
