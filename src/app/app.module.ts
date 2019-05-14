import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ROUTES } from './app.routes';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { SafePipe } from './core/safe.pipe';
import { CallbackComponent } from './callback/callback.component';
import { BackstageComponent } from './backstage/backstage.component';
import { FrontdoorComponent } from './frontdoor/frontdoor.component';
import { PerformerDetailComponent } from './performer-detail/performer-detail.component';
import { PerformerVideoComponent } from './performer-video/performer-video.component';

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    HomeComponent,
    CallbackComponent,
    BackstageComponent,
    FrontdoorComponent,
    PerformerVideoComponent,
    PerformerDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
