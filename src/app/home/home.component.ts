import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'app/auth/auth.service';
import { PerformersService } from 'app/services/performers.service';
import { VideosService } from 'app/services/videos.service';
import { Performer } from 'app/model/performer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
              '../../../node_modules/uikit/dist/css/uikit.min.css',
              '../../../node_modules/uikit/dist/css/uikit-core.min.css']
})
export class HomeComponent implements OnInit {
  loading$: Observable<boolean>;
  performers$: Observable<Performer[]>;
  noResults$: Observable<boolean>; 
  currentPerformer$: Observable<string>;
  
  constructor(public auth: AuthService, private performers: PerformersService, private videos: VideosService) { }

  ngOnInit() {
    this.loading$ = this.performers.loading$;
    this.noResults$ = this.performers.noResults$;
    this.performers$ = this.performers.performers$;
    this.currentPerformer$ = this.performers.currentPerformer$;
  }

  onSelect(performerId: string): void {
    this.videos.init(performerId);
    this.performers.currentPerformer = performerId;
  }

}
