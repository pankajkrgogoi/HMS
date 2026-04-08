import { Routes } from '@angular/router';
import { Admin } from './admin/admin';
import { RoleGuard } from './services/role-guard';
import { User } from './user/user';
import { Login } from './login/login';
import { Error } from './error/error';
import { Doctor } from './doctor/doctor';
import { PatientComponent } from './patient/patient';
import { Appointment } from './appointment/appointment';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: 'admin', component: Admin, canActivate: [RoleGuard], data: { role: 'admin' } },
  { path: 'user', component: User, canActivate: [RoleGuard], data: { role: 'user' } },
   { path: 'home', component: Dashboard },
  { path: 'login', component: Login },
  { path: 'doctor', component: Doctor },
  { path: 'patient', component: PatientComponent },
  { path: 'appointment', component: Appointment },
  { path: 'notification', component: Notification },

  { path: 'error', component: Error },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
