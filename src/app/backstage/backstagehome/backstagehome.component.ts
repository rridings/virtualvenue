import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'app/auth/auth.service';
import { CompetitionsService } from 'app/services/competitions.service';
import { VideosService } from 'app/services/videos.service';
import { PerformersService } from 'app/services/performers.service';
import { Role } from 'app/model/role';
import { User } from 'app/model/user';
import { Performer } from 'app/model/performer';

@Component({
  selector: 'app-backstagehome',
  templateUrl: './backstagehome.component.html',
  styleUrls: ['./backstagehome.component.css',
              '../../../../node_modules/uikit/dist/css/uikit.min.css',
              '../../../../node_modules/uikit/dist/css/uikit-core.min.css']
})
export class BackstageHomeComponent implements OnInit {
  rounds$: Observable<number>;
  currentRound$: Observable<number>;
  currentPerformer$: Observable<Performer>;
  
  constructor(public authService: AuthService, private competitonsService: CompetitionsService, private performersService: PerformersService) { }

  ngOnInit() {
    this.rounds$ = this.competitonsService.rounds$;
    this.currentRound$ = this.competitonsService.currentRound$;
    //unsubscribe
    this.authService.user$.subscribe(user => {
        if ( user && user.role && user.role.type == Role.PERFORMER) {
          this.currentPerformer$ = this.performersService.getPerformer(user.id);
          this.currentPerformer$.subscribe(performer => {
            this.performersService.currentPerformer = performer;
          });
        }
      });
  }
  
  onSelect(round: Number): void {
  }
}