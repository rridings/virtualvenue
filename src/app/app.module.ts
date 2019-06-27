import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import { ROUTES } from 'app/app.routes';
import { AuthService } from 'app/auth/auth.service';
import { AuthGuard } from 'app/auth/auth.guard';
import { RoleGuard } from 'app/auth/role.guard';
import { SafePipe } from 'app/core/safe.pipe';
import { AppComponent } from 'app/app.component';
import { FrontdoorComponent } from 'app/frontdoor/frontdoor.component';
import { HomeComponent } from 'app/home/home.component';
import { CallbackComponent } from 'app/callback/callback.component';
import { PerformerVideoComponent } from 'app/performer-video/performer-video.component';
import { PerformerVideoListComponent } from 'app/performer-video-list/performer-video-list.component';
import { BackstageHomeComponent } from './backstage/backstagehome/backstagehome.component';
import { PerformerBioComponent } from './performerbio/performerbio.component';


@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    FrontdoorComponent,
    HomeComponent,
    CallbackComponent,
    PerformerVideoComponent,
    PerformerVideoListComponent,
    BackstageHomeComponent,
    PerformerBioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthService, AuthGuard, RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
