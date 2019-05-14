import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { PerformerService } from './../performer/performer.service';
import { Performer } from '../performer/performer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
              '../../../node_modules/uikit/dist/css/uikit.min.css',
              '../../../node_modules/uikit/dist/css/uikit-core.min.css']
})
export class HomeComponent implements OnInit {

  selectedPerformer: Performer;

  performers: Performer[];

  constructor(public auth: AuthService, public performerService: PerformerService) { }

  ngOnInit() {
    this.getPerformers();
  }

  getPerformers(): void {
    this.performers = this.performerService.getPerformers();
  }

  onSelect(performer: Performer): void {
    this.selectedPerformer = performer;
    this.performerService.setCurrentPerformer(performer);
  }

}
