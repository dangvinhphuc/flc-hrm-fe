import { Routes } from '@angular/router';
import { TableEmployeesComponent } from './main-container/employee/view-database/table-employees/table-employees.component';
import { SignUpComponent } from './main-container/account/sign-up/sign-up.component';
import { SignInComponent } from './main-container/account/sign-in/sign-in.component';
import { UserManagementComponent } from './main-container/admin/user-management/user-management.component';
import { DepartmentManagementComponent } from './main-container/admin/department-management/department-management.component';
import { PropertyManagementComponent } from './main-container/admin/property-management/property-management.component';
import { OutletManagementComponent } from './main-container/admin/outlet-management/outlet-management.component';
import { LevelManagementComponent } from './main-container/admin/level-management/level-management.component';
import { PositionManagementComponent } from './main-container/admin/position-management/position-management.component';

export const routes: Routes = [
  { path: 'database/view', component: TableEmployeesComponent },
  { path: 'account/sign-up', component: SignUpComponent },
  { path: 'account/sign-in', component: SignInComponent },
  { path: 'admin/user-management', component: UserManagementComponent },
  { path: 'admin/property-management', component: PropertyManagementComponent },
  {
    path: 'admin/department-management',
    component: DepartmentManagementComponent,
  },
  { path: 'admin/outlet-management', component: OutletManagementComponent },
  { path: 'admin/level-management', component: LevelManagementComponent },
  { path: 'admin/position-management', component: PositionManagementComponent },
];
