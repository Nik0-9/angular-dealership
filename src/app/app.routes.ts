import { Routes } from '@angular/router';
import { LogInComponent } from './pages/Login/login.component';
import { VehicleShowcaseComponent } from './pages/vehicle-showcase/vehicle-showcase.component';
import { VehicleSoldComponent } from './pages/vehicle-sold/vehicle-sold.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LogInComponent},
    {path: 'showcase', component: VehicleShowcaseComponent},
    {path: 'sold', component: VehicleSoldComponent},
    {path: 'stats', component:StatsPageComponent}
    
];
