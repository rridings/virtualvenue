import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CompetitionsService } from 'app/services/competitions.service';
import { PerformersService } from 'app/services/performers.service';
import { VideosService } from 'app/services/videos.service';

@Component({
  selector: 'upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css',
              '../../../../node_modules/uikit/dist/css/uikit.min.css',
              '../../../../node_modules/uikit/dist/css/uikit-core.min.css']
})
export class UploadVideoComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  public uploadVideoForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required]),
    url: new FormControl("", [Validators.required])
  })
    
  @Input() display: boolean = false;
  
  constructor(private competitonsService: CompetitionsService, private performerService: PerformersService, private videosService: VideosService) { }

  ngOnInit() {
  }

  public onSubmit(){
    if(this.uploadVideoForm.invalid){
      return
    }
    var video = this.uploadVideoForm.value;    
    this.competitonsService.currentRound$.pipe(take(1)).subscribe( round => {
      if ( round ) {
        video["round"] = round;
      }
      
      this.performerService.currentPerformer$.pipe(take(1)).subscribe( performer => {
        video["performer_id"] = performer.id;

        this.videosService.create(video).then(res => {
          this.videosService.videos$.pipe(take(1)).subscribe( videos => {
            var arrayLength = videos.length; 
            for (var i = 0; i < arrayLength; i++) {
              if ( videos[i].performer_id == performer.id && videos[i].title == video.title ) {
                this.videosService.currentVideo = videos[i];
              }
            }
          });
        });
        
        this.videosService.showUploadVideo$.next(false)
      });
    });
    
    console.log(" Form", this.uploadVideoForm);
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
