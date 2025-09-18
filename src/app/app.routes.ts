import { Routes } from '@angular/router';
import { TableEmployeesComponent } from './main-container/employee/view-database/table-employees/table-employees.component';
import { SignUpComponent } from './main-container/account/sign-up/sign-up.component';
import { UserManagementComponent } from './main-container/user/user-management/user-management.component';
import { SignInComponent } from './main-container/account/sign-in/sign-in.component';

export const routes: Routes = [
  { path: 'database/view', component: TableEmployeesComponent },
  { path: 'account/sign-up', component: SignUpComponent },
  { path: 'account/sign-in', component: SignInComponent },
  { path: 'admin/user-management', component: UserManagementComponent },
];
