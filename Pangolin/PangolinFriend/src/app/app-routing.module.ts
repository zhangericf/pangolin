import { Routes, RouterModule } from '@angular/router';
import { PangolinRegisterComponent } from './pangolins/pangolin-register/pangolin-register.component';
import { PangolinLoginComponent } from './pangolins/pangolin-Login/pangolin-Login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './pangolins/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: PangolinLoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: PangolinRegisterComponent },

  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);
