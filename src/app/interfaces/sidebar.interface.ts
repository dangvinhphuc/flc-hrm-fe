export interface MenuItem {
  icon: string;
  title: string;
  link?: string;
  isOpen: boolean;
  subMenu?: MenuItem[];
}
