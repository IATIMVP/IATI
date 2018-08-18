import { Component, OnInit, NgZone, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators as Validators } from '@angular/forms';
import { EditPostService } from './edit-post.service';
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
import {Headers, Http} from '@angular/http';
//New Image uploader

import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { userInfo } from 'os';

// End Image uploader

// const URL = environment + '/user/upload';
let ALLOWED_DOCUMENTS_SHOW = ['.mp3', '.wav', '.aiff', '.flac', '.aac'];
let MAX_DOCUMENTS_TO_UPLOAD = 10;
let MAX_SIZE_DOCUMENTS = 1073741824;

const bucket = new AWS.S3({ params: { Bucket: "iati-audio" } });
const URL = bucket.endpoint.href + "iati-audio";

// interface User {
//   icon?: string;
//   music_audio?: string;
//   title?: string;
//   description?: string;
//   genre_type?: string;
//   genre?: string;
//   privacy?: string;
//   charge?: string;
//   image?: string;
//   video?: string;
//   _id?:string;
// }


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  providers: [EditPostService],
  styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit {
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
  public userInfo: any = {};
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
  imageChangedEvent: any = '';
  croppedImage: any = '';
  previewClass : any ='image-cropper-open';
  postId: any;
  posts:any;
  invalidVideoError:boolean = false;
  invalidVideoMessage: any = '';
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  constructor(
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private _service: EditPostService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private http:Http,
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
    this.route.params.subscribe(params => {
      
      this.postId = params.id;
    })
    
  }

  ngOnInit() {
    this.getGenre()
    this.userInfo.genre = "0";
    this.userInfo.genre_type = "0";
    this.userInfo.privacy = "0";
    this.userInfo.charge = "yes";
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

    
     // this.uploadAudio(this.fileData);
    };
    
    this.getPostData(this.postId);
      //get genre
      //   this.getGenre();
      //get genre type

  }

  getPostData(id)
  {
 
    this._service.getPostData(id).then(res => {
      if (res.status == 200) {
         let postData = JSON.parse(res.data);
 
          this.userInfo.title = postData.title;
          this.userInfo.description = postData.description;
          this.userInfo.genre = postData.genre;
          this.userInfo.genre_type = postData.genre_type;
          this.userInfo.privacy = postData.privacy;
          this.userInfo.charge = postData.charge
          this.userInfo.music_audio = postData.music_audio
          this.userInfo.video = postData.video?postData.video:undefined
          this.userInfo.icon = postData.icon
          this.croppedImage = postData.icon
          this.embedUrl= this.sanitizer.bypassSecurityTrustResourceUrl(postData.video);
       
          if(this.userInfo.video){
          this.preview = true; 
          // if (url != undefined || url != '') {        
            //  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
              var regExp = /^(http:\/\/|https:\/\/)(vimeo\.com|youtu\.be|www\.youtube\.com)\/([\w\/]+)([\?].*)?$/;
              var match = this.userInfo.video.match(regExp);
          
              if (match) {
      
                    // Do anything for being valid
                    // if need to change the url to embed url then use below line          
                    // $('#videoObject').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=1&enablejsapi=1');  
               
                    switch(match[2]){
                      case 'www.youtube.com':
                        if(match[3] == 'watch'){
                          var youtube_id =match[4].split('=')[1];
                          this.embedUrl = 'https://www.youtube.com/embed/' +youtube_id;
                        }else{
                          this.embedUrl = this.userInfo.video
                        }
                        break;
                      case 'youtu.be':
                          var youtube_id =match[3];
                        this.embedUrl = 'https://www.youtube.com/embed/' +youtube_id;
                        break;
                        case 'vimeo.com':
                          let vimeo_id =match[3];
                          this.embedUrl = 'https://player.vimeo.com/video/' +vimeo_id;
                          break;
                    }
                    this.embedUrl=  this.sanitizer.bypassSecurityTrustResourceUrl(this.embedUrl);
                    this.postForm.controls['video'].patchValue(this.userInfo.video);
                    this.preview = true; 
                    this.invalidVideoError = false;
                    this.invalidVideoMessage = "";
                    
                } else {
                
                  this.invalidVideoError = true;
                  this.invalidVideoMessage = "Invalid link.";
               
                }
              
        }else{
      
          for(let i=0;i<postData.music_audio.length;i++){
            this.posts.music_audio[i] = {file:{name:postData.music_audio[i].split('/')[4]}}
            
          }
     
          this.uploader.queue = this.posts.music_audio;
          
        }
        
      } else {
          this.zone.run(() => {
          this.toastr.error(res.msg);
        });
       }
    })

  }

  closeVideoPreview()
  {
   this.preview = false;
   this.userInfo.video = undefined 
  }

  pasteUrl(e){
    var url = e.clipboardData.getData('Text');
    
     if (url != undefined || url != '') {        
       //  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
         var regExp = /^(http:\/\/|https:\/\/)(vimeo\.com|youtu\.be|www\.youtube\.com)\/([\w\/]+)([\?].*)?$/;
         var match = url.match(regExp);
         
       console.log("match", match,'matchhh')
         if (match) {
 
              // Do anything for being valid
              // if need to change the url to embed url then use below line          
              // $('#videoObject').attr('src', 'https://www.youtube.com/embed/' + match[2] + '?autoplay=1&enablejsapi=1');  
         
              console.log("match", match,'matchhh')
              switch(match[2]){
                case 'www.youtube.com':
                  if(match[3] == 'watch'){
                    var youtube_id =match[4].split('=')[1];
                    this.embedUrl = 'https://www.youtube.com/embed/' +youtube_id;
                  }else{
                   this.embedUrl = url
                  }
                 this.croppedImage = "https://img.youtube.com/vi/"+youtube_id+ "/default.jpg"
                  break;
                case 'youtu.be':
                    var youtube_id =match[3];
                  this.embedUrl = 'https://www.youtube.com/embed/' +youtube_id;
                  this.croppedImage = "https://img.youtube.com/vi/"+youtube_id+ "/default.jpg"
                  break;
                 case 'vimeo.com':
                   let vimeo_id =match[3];
                   this.embedUrl = 'https://player.vimeo.com/video/' +vimeo_id;
                   this.croppedImage = "https://res.cloudinary.com/demo/image/vimeo/c_thumb,g_face,w_200,h_220,e_saturation:-70/"+vimeo_id+ ".jpg"
                   break;
              }
              // this.imageLoaded()
              this.embedUrl=  this.sanitizer.bypassSecurityTrustResourceUrl(this.embedUrl);
              console.log(this.embedUrl,"embedUrl", this.embedUrl.SafeResourceUrlImpl,'embedUrlxdxcx')
             //  this.embedUrl = this.embedUrl.SafeResourceUrlImpl.changingThisBreaksApplicationSecurity
             this.postForm.controls['video'].patchValue(url);
              this.userInfo.video = url;
              this.userInfo.icon = this.croppedImage;
              this.uploadimg = true
              this.upload = false
              this.edit = false
              this.imageChangedEvent = undefined
              this.preview = true; 
              this.invalidVideoError = false;
              this.invalidVideoMessage = "";
              
         //  if(match[2] == 'www.youtube.com')
         //  {
         //    let youtube_id =url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
         //    this.embedUrl = 'https://www.youtube.com/embed/' +youtube_id;
         //    this.userInfo.video = url;
         //    this.preview = true; 
         //    this.invalidVideoError = false;
         //    this.invalidVideoMessage = "";
         //  }
         //  else{
         //   this.embedUrl=  this.sanitizer.bypassSecurityTrustResourceUrl(url);
         //   this.userInfo.video = url;
         //   this.preview = true; 
         //   this.invalidVideoError = false;
         //   this.invalidVideoMessage = "";
         //  }
 
         } else {
          
           this.invalidVideoError = true;
           this.invalidVideoMessage = "Invalid link to upload,";
             // Do anything for not being valid
         }
        }
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

  // uploadAudio(file): void {
  //   // debugger;
  //   AWS.config.accessKeyId = 'AKIAIUA2EI3XKGFHVE3Q';
  //   AWS.config.secretAccessKey = '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';
  //   AWS.config.region = 'us-east-1';
  //   let bucket = new AWS.S3({ params: { Bucket: 'iati-audio' } });
  //   let params = { Bucket: 'iati-audio', Key: 'audio/' + file._file.name, ACL: 'public-read', Body: file._file };
  //   let self = this;
  //   self.arrays = [];
  //   bucket.upload(params, function (err, data) {
  //     if (err) {
  //       console.log("error while saving file on s3 server", err);
  //       return;
  //     }
    
  //     self.arrays.push(data.Location);
  //     self.store_music = self.arrays;
  //     self.musics = file._file;
  //     self.userInfo.music_audio = self.store_music;
  //   });
  // }

  uploadImage(cropImage): void {
    // alert('called')
    AWS.config.accessKeyId = 'AKIAJSGLATCQTV4W2U7A';
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
      // this.userInfo.icon = self.imageUrl;
      
    });
  }

  removeFile(item, index) {
    console.log(item,'edfkjjfds',index,'indexcccc',this.userInfo,'userinfoo')
    this.userInfo.music_audio[index] = undefined
    // }
    this.uploader.queue.splice(index, 1)
    // if (index) {
    //   // for(let i=0;i<this.userInfo.music_audio.length;i++){
    //     this.userInfo.music_audio[index] = undefined
    //   // }
    //   this.uploader.queue[index] = undefined
    //   // this.docsArray.splice(indexDoc, 1);
    //   // item.remove();
    // } else {
    //   // item.remove();
    // }
  }


  // fileChangeListener($event) {
  //   const image: any = new Image();
  //   const file: File = $event.target.files[0];
  //   const myReader: FileReader = new FileReader();
  //   const that = this;
  //   that.imageTypeName = $event.target.files[0];
  //   myReader.onloadend = function (loadEvent: any) {
  //     image.src = loadEvent.target.result;
  //     that.cropper.setImage(image);
  //   };
  //   myReader.readAsDataURL(file);
  // }


  // fileOverBase(event) {
  //   console.log(event);
  // }

  // public fileOverAnother(e: any): void {
  //   this.hasAnotherDropZoneOver = e;
  // }

  // filedrop(event) {
  //   console.log(event);
  // }

  post_submission_error() {
    this.postForm.controls['title'].markAsTouched();
    this.postForm.controls['description'].markAsTouched();
    this.postForm.controls['genre'].markAsTouched();
    this.postForm.controls['genre_type'].markAsTouched();
    this.postForm.controls['privacy'].markAsTouched();
  }


  submitpost(userInfo) {
    console.log(userInfo,'userinfdo');
    let self = this;
    console.log(self.postForm,'self.postFormsss')
    this.post_submission_error();
    // let _this = this;
    if (self.postForm.valid) {
    
      self.userInfo._id = self.postId
      self.userInfo.video = self.preview?userInfo.video:undefined
      if(self.userInfo.music_audio.length>0){
        for(let i=0;i<self.userInfo.music_audio.length;i++){
          self.userInfo.music_audio[i] = 'https://iati-audio.s3.amazonaws.com/audio/'+self.userInfo.music_audio[i].file.name
        }
      } 
      console.log(self.userInfo,'self.postFormsss12')
      self.busy = self._service.edit_post(self.userInfo).then(function (data) {
        console.log(data,'dataaa')
        if (data.status == 200) {
          console.log('insideddd status')
          self.router.navigate(['dashboard']);
          self.toastr.success('Edited successfully', 'Success');
          console.log('insideddd sftertrr')
        }
        else
        {
          this.toastr.error('Error in post', 'Error'); 
        }
      }).catch(function (data) { })
    }

  }

    fileChangeEvent(event: any): void {
     
       this.imageChangedEvent = event;
       this.uploadimg = false
       this.upload = true
       this.edit = true
       console.log(event,'envennt')
    }
    imageCropped(image: string) {
      console.log('called')
        this.croppedImage = image;
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
  //   loadImageFailed() {
        
  //   }
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
    cancel(){
      this.router.navigate(['/dashboard']);
    }
  }


