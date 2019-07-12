import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css',
              '../../../../node_modules/uikit/dist/css/uikit.min.css',
              '../../../../node_modules/uikit/dist/css/uikit-core.min.css']
})
export class UploadVideoComponent implements OnInit {

  public uploadVideoForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required]),
    url: new FormControl("", [Validators.required]),
    imageUrl: new FormControl("", [Validators.required])
  })
    
  @Input() display: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  public onSubmit(){
  // if(this.nestedForm.invalid){
  //   return
  // }

   console.log(" Form", this.uploadVideoForm);
  }
}
