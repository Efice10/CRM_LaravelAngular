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
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { KeyValuePipe } from '@angular/common';

//all components

//auth
import { LoginComponent } from './components/login/login.component';
import { EmailVerificationComponent } from './components/email/email-verification/email-verification.component';

//dashboard
import { DashboardComponent } from './components/dashboard/dashboard.component';

//client
import { TableClientComponent } from './components/client/table-client/table-client.component';
import { ProfileClientComponent } from './components/client/profile-client/profile-client.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';

//users
import { TableUserComponent } from './components/users/table-user/table-user.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';
import { ProfileUserComponent } from './components/users/profile-user/profile-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';

//organization
import { TableOrganizationComponent } from './components/organization/table-organization/table-organization.component';
import { CreateOrganizationComponent } from './components/organization/create-organization/create-organization.component';
import { EditOrganizationComponent } from './components/organization/edit-organization/edit-organization.component';
import { ShowOrganizationComponent } from './components/organization/show-organization/show-organization.component';

//projects
import { ListProjectComponent } from './components/project/list-project/list-project.component';
import { ShowProjectComponent } from './components/project/show-project/show-project.component';
import { CreateProjectComponent } from './components/project/create-project/create-project.component';
import { EditProjectComponent } from './components/project/edit-project/edit-project.component';

//customer
import { TableCustomerComponent } from './components/customer/table-customer/table-customer.component';
import { ShowCustomerComponent } from './components/customer/show-customer/show-customer.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';
import { CreateCustomerComponent } from './components/customer/create-customer/create-customer.component';

//roles
import { ListRolesComponent } from './components/roles/list-roles/list-roles.component';
import { EditRolesComponent } from './components/roles/edit-roles/edit-roles.component';
import { ShowRolesComponent } from './components/roles/show-roles/show-roles.component';

//PROFILE
import { ProfileComponent } from './components/profile/profile.component';



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
    TableUserComponent,
    EditUserComponent,
    CreateUserComponent,
    CreateClientComponent,
    EditClientComponent,
    TableClientComponent,
    ProfileClientComponent,
    ProfileUserComponent,
    CreateProjectComponent,
    EditProjectComponent,
    ShowRolesComponent,
    ProfileComponent,
    EmailVerificationComponent,   
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
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    KeyValuePipe,
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
