import { Routes } from '@angular/router';
import { FrontdoorComponent } from 'app/frontdoor/frontdoor.component';
import { HomeComponent } from 'app/home/home.component';
import { BackstageHomeComponent } from 'app/backstage/backstagehome/backstagehome.component';
import { CallbackComponent } from 'app/callback/callback.component';
import { AuthGuard } from 'app/auth/auth.guard';
import { RoleGuard } from 'app/auth/role.guard';

export const ROUTES: Routes = [
  { path: '', component: FrontdoorComponent },
  { path: 'backstage', component: FrontdoorComponent },
  { path: 'backstage/home', component: BackstageHomeComponent, canActivate: [RoleGuard]  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' }
];
