import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  
  constructor(public auth: AuthService, private performers: PerformersService) { }

  ngOnInit() {
    this.currentPerformer$ = this.performers.currentPerformer$;
  }
}
