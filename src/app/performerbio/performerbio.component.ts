import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from 'app/auth/auth.service';
import { PerformersService } from 'app/services/performers.service';
import { Performer } from 'app/model/performer';

@Component({
  selector: 'performer-bio',
  templateUrl: './performerbio.component.html',
  styleUrls: ['./performerbio.component.css',
              '../../../node_modules/uikit/dist/css/uikit.min.css',
              '../../../node_modules/uikit/dist/css/uikit-core.min.css']
})
export class PerformerBioComponent implements OnInit {

  currentPerformer$: Observable<Performer>;
  
  edit$ = new BehaviorSubject<boolean>(false);
  
  public performerBioForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    bio: new FormControl("")
  })
  
  constructor(public authService: AuthService, private performersService: PerformersService) { }

  ngOnInit() {
    this.currentPerformer$ = this.performersService.currentPerformer$.pipe(
      tap(performer => this.performerBioForm.patchValue(performer))
    );
  }
  
  public showEdit() {
    return this.performersService.currentPerformer$.pipe(
      tap(performer => { 
        var user = this.authService.user;
        if ( user.id == performer.user_id )
          return true;
        else
          return false;
      })
    );
  }
  
  public onEdit() {
    this.edit$.next(true);
  }
  
  public onSubmit(){
    if(this.performerBioForm.invalid){
      return
    }
    
    var performerForm = this.performerBioForm.value; 
    
    this.currentPerformer$.pipe(take(1)).subscribe( performer => {
        performer.name = performerForm.name;
        performer.bio = performerForm.bio;
        return this.performersService.update(performer);
        this.performersService.currentPerformer = performer;
    });
    
    this.edit$.next(false);   
  }
}
