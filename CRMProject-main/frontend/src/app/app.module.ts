import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';

//component

//auth
import { LoginComponent } from './components/login/login.component';

//dashboard
import { DashboardComponent } from './components/dashboard/dashboard.component';

//admin
import { TableAdminComponent } from './components/admin/table-admin/table-admin.component';
import { CreateAdminComponent } from './components/admin/create-admin/create-admin.component';
import { ShowAdminComponent } from './components/admin/show-admin/show-admin.component';
import { EditAdminComponent } from './components/admin/edit-admin/edit-admin.component';
<<<<<<< Updated upstream

//users
import { TableUserComponent } from './components/users/table-user/table-user.component';

//organization
import { TableOrganizationComponent } from './components/organization/table-organization/table-organization.component';
import { CreateOrganizationComponent } from './components/organization/create-organization/create-organization.component';
import { EditOrganizationComponent } from './components/organization/edit-organization/edit-organization.component';
import { ShowOrganizationComponent } from './components/organization/show-organization/show-organization.component';

//projects
import { ListProjectComponent } from './components/project/list-project/list-project.component';
import { ShowProjectComponent } from './components/project/show-project/show-project.component';

//customer
import { TableCustomerComponent } from './components/customer/table-customer/table-customer.component';
import { ShowCustomerComponent } from './components/customer/show-customer/show-customer.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';
import { CreateCustomerComponent } from './components/customer/create-customer/create-customer.component';

//roles
import { ListRolesComponent } from './components/roles/list-roles/list-roles.component';
import { EditRolesComponent } from './components/roles/edit-roles/edit-roles.component';

=======
import { CreateUsersComponent } from './components/users/create-users/create-users.component';
import { CreateCompanyComponent } from './components/company/create-company/create-company.component';
import { EditCompanyComponent } from './components/company/edit-company/edit-company.component';
import { DeleteCompanyComponent } from './components/company/delete-company/delete-company.component';
import { CreateProjectComponent } from './components/project/create-project/create-project.component';
import { EditProjectComponent } from './components/project/edit-project/edit-project.component';
import { DeleteProjectComponent } from './components/project/delete-project/delete-project.component';
import { DeleteUsersComponent } from './components/users/delete-users/delete-users.component';
import { EditUsersComponent } from './components/users/edit-users/edit-users.component';
import { AlertsComponent } from './components/alerts/alerts.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TableOrganizationComponent,
    CreateOrganizationComponent,
    EditOrganizationComponent,
    ShowOrganizationComponent,
    ListProjectComponent,
    TableCustomerComponent,
    ShowCustomerComponent,
    EditCustomerComponent,
    CreateCustomerComponent,
    ShowProjectComponent,
    ListRolesComponent,
    EditRolesComponent,
    TableAdminComponent,
    TableUserComponent,
    CreateAdminComponent,
    ShowAdminComponent,
    EditAdminComponent,
<<<<<<< Updated upstream
=======
    CreateUsersComponent,
    CreateCompanyComponent,
    EditCompanyComponent,
    DeleteCompanyComponent,
    CreateProjectComponent,
    EditProjectComponent,
    DeleteProjectComponent,
    DeleteUsersComponent,
    EditUsersComponent,
    AlertsComponent,
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
