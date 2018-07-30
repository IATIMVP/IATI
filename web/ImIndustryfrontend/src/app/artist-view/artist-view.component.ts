import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-view',
  templateUrl: './artist-view.component.html',
  styleUrls: ['./artist-view.component.css']
})
export class ArtistViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('user_login'));
    let user_id = data._id;
    this.getUserData(user_id);
  }


  getUserData(user_id)
  {
    
  }
}
