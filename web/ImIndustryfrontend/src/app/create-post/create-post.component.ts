import { Component, OnInit, NgZone, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators as Validators } from '@angular/forms';
import { PostService } from './create-post.service';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { audioPlayer } from 'angular-audio-player-html5-es6';
import { ToastrService } from 'ngx-toastr';
import { environment } from './../../environments/environment';
import { debug } from 'util';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { forEach } from '@angular/router/src/utils/collection';
import * as AWS from 'aws-sdk';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

//New Image uploader

import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';

// End Image uploader

// const URL = environment + '/user/upload';
let ALLOWED_DOCUMENTS_SHOW = ['.mp3', '.wav', '.aiff', '.flac', '.aac'];
let MAX_DOCUMENTS_TO_UPLOAD = 10;
let MAX_SIZE_DOCUMENTS = 1073741824;

const bucket = new AWS.S3({ params: { Bucket: "iati-audio" } });
const URL = bucket.endpoint.href + "iati-audio";

interface User {
  icon?: string;
  music_audio?: string;
  title?: string;
  description?: string;
  genre_type?: string;
  genre?: string;
  privacy?: string;
  charge?: string;
  image?: string;
  video?: string;
  user_id?: string;
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  providers: [PostService],
  styleUrls: ['./create-post.component.css'],
})

export class CreatePostComponent implements OnInit {
  data1: {};
  cropperSettings1: CropperSettings;
  label: any;
  public docsArray: any;
  docError = '';
  data: any;
  crop_image: any;
  arrayfile: any[];
  add_music: any = [];
  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  @Output() Click: EventEmitter<any> = new EventEmitter();
  public postForm: FormGroup;
  public isImageUrl: boolean = false;
  public imageUrl: any = "";
  public file: any;
  public musics: any;
  public imagepath: any;
  imageTypeName: any;
  imageType: any;
  store_music: any;
  image: any = {};
  public userInfo: User = {};
  files: File[];
  fileIsOver: boolean = false;
  busy: Promise<any>;
  audioBuffer: any;
  fileData;
  arrays: any[] = [];
  genres:any;
  charge:any;
  icon:any;
  preview:boolean = false;
  upload:boolean = false;
  edit:boolean = false;
  uploadimg:boolean = true;
  embedUrl:any;
  url:any;
  user_id:any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  previewClass : any ='image-cropper-open';
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  constructor(
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private _service: PostService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private router: Router

  ) {
    this.cropperSettings1 = new CropperSettings();
    this.cropperSettings1.width = 200;
    this.cropperSettings1.height = 200;

    this.cropperSettings1.croppedWidth = 200;
    this.cropperSettings1.croppedHeight = 200;

    this.cropperSettings1.canvasWidth = 200;
    this.cropperSettings1.canvasHeight = 200;

    this.cropperSettings1.minWidth = 100;
    this.cropperSettings1.minHeight = 100;

    this.cropperSettings1.rounded = false;
    this.cropperSettings1.noFileInput = true;
    this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

    this.data1 = {};
    this.embedUrl ='';
  }

  ngOnInit() {
    this.userInfo.genre = "0";
    this.userInfo.genre_type = "0";
    this.userInfo.privacy = "0";
    this.userInfo.charge = "yes";
    this.userInfo.user_id = '';
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      genre_type: ['', Validators.required],
      privacy: ['', Validators.required],
      music_audio: [''],
      video: [''],
      icon: [''],
      charge: [''],

    })
    this.uploader.onAfterAddingFile = f => {
      f.withCredentials = false;
      const lastValue = this.uploader.queue.slice(-1)[0];
      this.fileData = lastValue;
      this.uploadAudio(this.fileData);
    };

      //get genre
         this.getGenre();
      //get genre type

  }

  closeVideoPreview()
  {
   this.preview = false; 
  }

  pasteUrl(e){
    
    this.url = e.clipboardData.getData('Text');
    
    this.embedUrl= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.preview = true; 
    this.userInfo.video = this.url;
    let image = "http://img.youtube.com/vi/"+this.url+"/hqdefault.jpg";
    this.getImage(image);
    //console.log("you tube",this.image)
   }

   getImage(image)
   {
    // var reader = new FileReader();
    // reader.onloadend = function(evt) {
    //     console.log("read success");
    //     console.log(evt.target.result);
    // };
    // reader.readAsDataURL(image);
    var xhr = new XMLHttpRequest()
    xhr.open("GET", image);
    xhr.responseType = "blob";
    xhr.send();
    var image;
    xhr.addEventListener("load", function() {
        var reader = new FileReader();
       
        reader.readAsDataURL(xhr.response); 
        reader.addEventListener("loadend", function() {      
            image = reader.result;       
           console.log("image1", image)
            // this.upload = true;
            // this.uploadimg = false;
            // this.upload = true;
            // this.edit = true;
        });
        
    });
 // console.log("image",image)
 //   this.uploadImage(image);
   }


  getGenre(){
    this._service.genrelist().then(res => {
      if (res.status == 200) {
        this.genres=res.data;
            
      }else {
          this.zone.run(() => {
          this.toastr.error(res.msg);
        });
       }
    })
  }

  uploadAudio(file): void {
    // debugger;
    AWS.config.accessKeyId = 'AKIAIUA2EI3XKGFHVE3Q';
    AWS.config.secretAccessKey = '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';
    AWS.config.region = 'us-east-1';
    let bucket = new AWS.S3({ params: { Bucket: 'iati-audio' } });
    let params = { Bucket: 'iati-audio', Key: 'audio/' + file._file.name, ACL: 'public-read', Body: file._file };
    let self = this;
    self.arrays = [];
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log("error while saving file on s3 server", err);
        return;
      }
    
      self.arrays.push(data.Location);
      self.store_music = self.arrays;
      self.musics = file._file;
      self.userInfo.music_audio = self.store_music;
    });
  }

  uploadImage(cropImage): void {
   
    AWS.config.accessKeyId = 'AKIAIUA2EI3XKGFHVE3Q';
    AWS.config.secretAccessKey = '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';
    AWS.config.region = 'us-east-1';
    const bucket = new AWS.S3({ params: { Bucket: 'iati-image' } });
   
    const buf = new Buffer(cropImage.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    var uuidv4 = require('uuid/v4');
  
    let croppedImageName = uuidv4();
    var params = {
      Bucket: 'iati-image',
      Key: 'image/' + croppedImageName,
      ACL: 'public-read', ContentEncoding: 'base64',
      ContentType: 'image/jpeg', Body: buf
    };

    let self = this;
    bucket.upload(params, function (err, data) {
  
      if (err) {
        console.log("error while saving file on s3 server", err);
        return;
      }
      
      self.isImageUrl = true;
      self.imageUrl = data.Location;
 
      // self.imagepath = this.imageTypeName;
      // self.crop_image = this.data1.image;
      self.userInfo.icon = self.imageUrl;
      this.userInfo.icon = self.imageUrl;
      
    });
  }

  removeFile(item, itemName) {
    if (itemName) {
      let indexDoc = this.docsArray.indexOf(itemName);
      this.docsArray.splice(indexDoc, 1);
      item.remove();
    } else {
      item.remove();
    }
  }


  fileChangeListener($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    that.imageTypeName = $event.target.files[0];
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    myReader.readAsDataURL(file);
  }


  fileOverBase(event) {
    console.log(event);
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  filedrop(event) {
    console.log(event);
  }

  post_submission_error() {
    this.postForm.controls['title'].markAsTouched();
    this.postForm.controls['description'].markAsTouched();
    this.postForm.controls['genre'].markAsTouched();
    this.postForm.controls['genre_type'].markAsTouched();
    this.postForm.controls['privacy'].markAsTouched();
  }


  submitpost(userInfo) {
  
    this.post_submission_error();
    let _this = this;
    let data = JSON.parse(localStorage.getItem('user_login'));
    
    this.userInfo.user_id = data._id;
    if (_this.postForm.valid) {
      this.busy = this._service.create_post(this.userInfo).then(function (data) {
        if (data.status == 200) {

          _this.toastr.success('Post successfully saved', 'Success');
          _this.router.navigate(['/dashboard']);
        }
        else
        {
          _this.toastr.error('Error in post', 'Error'); 
        }
      }).catch(function (data) { })
    }
  }

    fileChangeEvent(event: any): void {
     
       this.imageChangedEvent = event;
    }
    imageCropped(image: string) {
        this.croppedImage = image;
        // console.log(this.croppedImage)
        this.uploadImage(this.croppedImage);
        this.upload = true;
        this.uploadimg = false;
        this.upload = true;
        this.edit = true;
       // console.log(this.croppedImage)
    }
    imageLoaded() {
        // show cropper
    }
    loadImageFailed() {
        
    }
    previewClose(){
      this.previewClass = "image-cropper-close";
      this.upload = false;
      this.edit = true;
    }
    previewOpen(){
      this.previewClass = "image-cropper-open";
      this.upload = false;
      this.edit = false;
      this.uploadimg = true;
    }
  }

