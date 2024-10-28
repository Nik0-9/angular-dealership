import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './pages/Login/login.component';
import { VehicleShowcaseComponent } from './pages/vehicle-showcase/vehicle-showcase.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { authGuard } from './auth.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LogInComponent },

  {
    path: 'showcase',
    component: VehicleShowcaseComponent,
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
  },
  {
    path: 'sold',
    component: VehicleShowcaseComponent,
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
  },
  {
    path: 'stats',
    component: StatsPageComponent,
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
  },

  {
    path: 'my-vehicles',
    component: VehicleShowcaseComponent,
    canActivate: [authGuard],
    data: { role: 'USER' },
  },
  {
    path: 'vehicle-for-sale',
    component: VehicleShowcaseComponent,
    canActivate: [authGuard],
    data: { role: 'USER' },
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
    canActivate: [authGuard],
    data: { role: 'USER' },
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component:NotFoundComponent  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
