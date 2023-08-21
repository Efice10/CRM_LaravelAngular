import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//auth
import { LoginComponent } from './components/login/login.component';

//dashboard
import { DashboardComponent } from './components/dashboard/dashboard.component';

//admin
import { TableAdminComponent } from './components/admin/table-admin/table-admin.component';
import { CreateAdminComponent } from './components/admin/create-admin/create-admin.component';
import { ShowAdminComponent } from './components/admin/show-admin/show-admin.component';
import { EditAdminComponent } from './components/admin/edit-admin/edit-admin.component';

//users
import { TableUserComponent } from './components/users/table-user/table-user.component';
import { CreateUserComponent } from './components/users/create-user/create-user.component';

//organization
import { TableOrganizationComponent } from './components/organization/table-organization/table-organization.component';
import { CreateOrganizationComponent } from './components/organization/create-organization/create-organization.component';

//project
import { ListProjectComponent } from './components/project/list-project/list-project.component';
import { CreateProjectComponent } from './components/project/create-project/create-project.component';

//customer
import { TableCustomerComponent } from './components/customer/table-customer/table-customer.component';
import { CreateCustomerComponent } from './components/customer/create-customer/create-customer.component';
import { ShowCustomerComponent } from './components/customer/show-customer/show-customer.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';

//roles
import { ListRolesComponent } from './components/roles/list-roles/list-roles.component';
import { EditRolesComponent } from './components/roles/edit-roles/edit-roles.component';


const routes: Routes = [
  //auth
  { path: 'login', component: LoginComponent },

  //dashboard
  { path: 'dashboard', component: DashboardComponent },

  //admin
  { path: 'table-admin', component: TableAdminComponent},
  { path: 'create-admin', component: CreateAdminComponent },
  { path: 'show-admin/:id', component: ShowAdminComponent },
  { path: 'edit-admin/:id', component: EditAdminComponent },

  //user
  { path: 'table-user', component: TableUserComponent },
  { path: 'create-user', component: CreateUserComponent },
  
  //organization
  { path: 'table-organization', component: TableOrganizationComponent },
  { path: 'create-organization', component: CreateOrganizationComponent },

  //project
  { path: 'list-project', component: ListProjectComponent },
  { path: 'create-project', component: CreateProjectComponent },

  //customer
  { path: 'table-customer', component: TableCustomerComponent },
  { path: 'create-customer', component: CreateCustomerComponent },
  { path: 'show-customer', component: ShowCustomerComponent },
  { path: 'edit-customer', component: EditCustomerComponent },

  //roles
  { path: 'list-roles', component: ListRolesComponent },
  { path: 'edit-roles', component: EditRolesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
