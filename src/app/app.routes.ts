import { Routes } from '@angular/router';
import { FrontdoorComponent } from './frontdoor/frontdoor.component';
import { HomeComponent } from './home/home.component';
import { BackstageComponent } from './backstage/backstage.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuard } from './auth/auth.guard';

export const ROUTES: Routes = [
  { path: '', component: FrontdoorComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'backstage', component: BackstageComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' }
];
