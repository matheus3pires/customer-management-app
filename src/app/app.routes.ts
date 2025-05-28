import { Routes } from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {CustomerManagementComponent} from './component/customer-management/customer-management.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'customer-management', component: CustomerManagementComponent }
];
