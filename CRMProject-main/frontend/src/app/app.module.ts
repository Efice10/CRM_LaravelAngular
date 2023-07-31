import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableAdminComponent } from './components/admin/table-admin/table-admin.component';
import { CreateAdminComponent } from './components/admin/create-admin/create-admin.component';
import { ShowAdminComponent } from './components/admin/show-admin/show-admin.component';
import { EditAdminComponent } from './components/admin/edit-admin/edit-admin.component';
import { CreateUsersComponent } from './components/users/create-users/create-users.component';
import { CreateCompanyComponent } from './components/company/create-company/create-company.component';
import { EditCompanyComponent } from './components/company/edit-company/edit-company.component';
import { DeleteCompanyComponent } from './components/company/delete-company/delete-company.component';
import { CreateProjectComponent } from './components/project/create-project/create-project.component';
import { EditProjectComponent } from './components/project/edit-project/edit-project.component';
import { DeleteProjectComponent } from './components/project/delete-project/delete-project.component';
import { DeleteUsersComponent } from './components/users/delete-users/delete-users.component';
import { EditUsersComponent } from './components/users/edit-users/edit-users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TableAdminComponent,
    CreateAdminComponent,
    ShowAdminComponent,
    EditAdminComponent,
    CreateUsersComponent,
    CreateCompanyComponent,
    EditCompanyComponent,
    DeleteCompanyComponent,
    CreateProjectComponent,
    EditProjectComponent,
    DeleteProjectComponent,
    DeleteUsersComponent,
    EditUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
