import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//auth
import { LoginComponent } from './components/login/login.component';

//dashboard
import { DashboardComponent } from './components/dashboard/dashboard.component';

//client
import { ProfileClientComponent } from './components/client/profile-client/profile-client.component';
import { CreateClientComponent } from './components/client/create-client/create-client.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';
import { TableClientComponent } from './components/client/table-client/table-client.component';

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

//project
import { ListProjectComponent } from './components/project/list-project/list-project.component';
import { CreateProjectComponent } from './components/project/create-project/create-project.component';
import { EditProjectComponent } from './components/project/edit-project/edit-project.component';
import { ShowProjectComponent } from './components/project/show-project/show-project.component';

//customer
import { TableCustomerComponent } from './components/customer/table-customer/table-customer.component';
import { CreateCustomerComponent } from './components/customer/create-customer/create-customer.component';
import { ShowCustomerComponent } from './components/customer/show-customer/show-customer.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';

//roles
import { ListRolesComponent } from './components/roles/list-roles/list-roles.component';
import { EditRolesComponent } from './components/roles/edit-roles/edit-roles.component';
import { ShowRolesComponent } from './components/roles/show-roles/show-roles.component';


const routes: Routes = [
  //auth
  { path: 'login', component: LoginComponent },

  //dashboard
  { path: 'dashboard', component: DashboardComponent },

  //client
  { path: 'table-client', component: TableClientComponent },
  { path: 'create-client', component: CreateClientComponent },
  { path: 'profile-client/:id', component: ProfileClientComponent },
  { path: 'edit-client/:id', component: EditClientComponent },
  //user
  { path: 'table-user', component: TableUserComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'profile-user/:id', component: ProfileUserComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  
  //organization
  { path: 'table-organization', component: TableOrganizationComponent },
  { path: 'create-organization', component: CreateOrganizationComponent },
  { path: 'show-organization/:id', component: ShowOrganizationComponent },
  { path: 'edit-organization/:id', component: EditOrganizationComponent },

  //project
  { path: 'list-project', component: ListProjectComponent },
  { path: 'create-project', component: CreateProjectComponent },
  { path: 'edit-project/:id', component: EditProjectComponent },
  { path: 'show-project/:id', component: ShowProjectComponent },

  //customer
  { path: 'table-customer', component: TableCustomerComponent },
  { path: 'create-customer', component: CreateCustomerComponent },
  { path: 'show-customer/:id', component: ShowCustomerComponent },
  { path: 'edit-customer/:id', component: EditCustomerComponent },

  //roles
  { path: 'list-roles', component: ListRolesComponent },
  { path: 'edit-roles/:id', component: EditRolesComponent },
  { path: 'show-roles/:id', component: ShowRolesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
