import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators as Validators } from '@angular/forms';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

import * as AWS from 'aws-sdk';
let ALLOWED_DOCUMENTS_SHOW = ['.mp3', '.wav', '.aiff', '.flac', '.aac'];
let MAX_DOCUMENTS_TO_UPLOAD = 10;
let MAX_SIZE_DOCUMENTS = 1073741824;
const bucket = new AWS.S3({ params: { Bucket: "iati-audio" } });
const URL = bucket.endpoint.href + "iati-audio";

@Component({
  selector: 'app-create-track',
  templateUrl: './create-track.component.html',
  styleUrls: ['./create-track.component.css'],
  
})
export class CreateTrackComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  public trackForm: FormGroup;
  fileData;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  constructor( private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.trackForm = this.formBuilder.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      track_audio: [''],
      icon: ['',Validators.required]
    })
    this.uploader.onAfterAddingFile = f => {
      f.withCredentials = false;
      const lastValue = this.uploader.queue.slice(-1)[0];
      this.fileData = lastValue;
     // this.uploadAudio(this.fileData);
    };
  }

}
