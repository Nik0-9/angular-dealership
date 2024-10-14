import { Routes } from '@angular/router';
import { LogInComponent } from './pages/Login/login.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LogInComponent},
    
];
