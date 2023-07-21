import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//login page
import { LoginComponent } from './components/login/login.component';

//dashboard
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [

  //Login 
  { path: 'login', component:LoginComponent},
  { path: 'dashboard', component:DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
