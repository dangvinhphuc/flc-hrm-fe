import { RoleEnum } from '../enums/role.enum';

export interface MenuItem {
  icon: string;
  title: string;
  link?: string;
  isOpen: boolean;
  subMenu?: MenuItem[];
  roles?: RoleEnum[];
  action?: string;
}
