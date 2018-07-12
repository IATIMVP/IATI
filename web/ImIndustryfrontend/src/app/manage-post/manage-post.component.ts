import { Component, OnInit,EventEmitter, NgModule} from '@angular/core';
import { PostService } from '../create-post/create-post.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.css']
})
export class ManagePostComponent implements OnInit {
  url:any;
  constructor( private _service: PostService,
    private toastr: ToastrService) {

    this.url = 'assets/images/';

   }

  ngOnInit() {

    this.listingPosts();
  }

  listingPosts()
  {
     //get list of all posts
    

  }

  deletePost()
  {

  }

}
