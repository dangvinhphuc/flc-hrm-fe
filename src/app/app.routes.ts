import { Routes } from '@angular/router';
import { TableEmployeesComponent } from './main-container/employee/view-database/table-employees/table-employees.component';
import { SignUpComponent } from './main-container/account/sign-up/sign-up.component';

export const routes: Routes = [
  // {path: 'database', loadChildren: () => import('./database/database.module').then(m => m.DatabaseModule)},
  { path: 'database/view', component: TableEmployeesComponent },
  { path: 'account/sign-up', component: SignUpComponent },
];
