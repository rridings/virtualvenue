import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import { ROUTES } from './app.routes';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { SafePipe } from './core/safe.pipe';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { BackstageComponent } from './backstage/backstage.component';
import { FrontdoorComponent } from './frontdoor/frontdoor.component';
import { PerformerVideoComponent } from './performer-video/performer-video.component';
import { PerformerVideoListComponent } from './performer-video-list/performer-video-list.component';


@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    HomeComponent,
    CallbackComponent,
    BackstageComponent,
    FrontdoorComponent,
    PerformerVideoComponent,
    PerformerVideoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
