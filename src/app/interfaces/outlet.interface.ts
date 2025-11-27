import { Department } from './department.interface';
import { Property } from './property.interface';

export interface Outlet {
  id: string;
  name: string;
  department: Department;
  property: Property;
}
