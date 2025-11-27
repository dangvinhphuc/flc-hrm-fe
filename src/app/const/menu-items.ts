import { RoleEnum } from '../enums/role.enum';
import { MenuItem } from '../interfaces/sidebar.interface';

export const menuItems: MenuItem[] = [
  {
    icon: 'user',
    title: 'Account',
    isOpen: false,
    subMenu: [
      {
        icon: '',
        title: 'My Profile',
        link: '/account/my-profile',
        isOpen: false,
      },
      {
        icon: '',
        title: 'Sign In',
        link: '/account/sign-in',
        isOpen: false,
      },
      {
        icon: '',
        title: 'Sign Up',
        link: '/account/sign-up',
        isOpen: false,
      },
      {
        icon: '',
        title: 'Sign Out',
        link: '/account/sign-out',
        isOpen: false,
        action: 'signOut',
      },
    ],
  },
  {
    icon: 'team',
    title: 'Database',
    isOpen: false,
    subMenu: [
      {
        icon: '',
        title: 'View',
        link: '/database/view',
        isOpen: false,
      },
      {
        icon: '',
        title: 'Report',
        isOpen: false,
        subMenu: [
          {
            icon: '',
            title: 'Manning',
            link: '/database/report/manning-report',
            isOpen: false,
          },
          {
            icon: '',
            title: 'Turnovers',
            link: '/database/report/turnovers-report',
            isOpen: false,
          },
        ],
      },
    ],
  },
  {
    icon: 'solution',
    title: 'Recruitment',
    isOpen: false,
    subMenu: [
      {
        icon: '',
        title: 'Job',
        link: '/recruitment/job',
        isOpen: false,
      },
      {
        icon: '',
        title: 'Applicant',
        link: '/recruitment/applicant',
        isOpen: false,
      },
    ],
  },
  {
    icon: 'field-time',
    title: 'Time sheet',
    link: '/time-sheet',
    isOpen: false,
  },
  {
    icon: 'dollar',
    title: 'Payroll',
    link: '/payroll',
    isOpen: false,
  },
  {
    icon: 'setting',
    title: 'System management',
    isOpen: false,
    roles: [RoleEnum.SYSTEM_MANAGEMENT],
    subMenu: [
      {
        icon: '',
        title: 'User',
        link: '/admin/user-management',
        isOpen: false,
      },
      {
        icon: '',
        title: 'Property',
        link: '/admin/property-management',
        isOpen: false,
      },
      {
        icon: '',
        title: 'Department',
        link: '/admin/department-management',
        isOpen: false,
      },
      {
        icon: '',
        title: 'Outlet',
        link: '/admin/outlet-management',
        isOpen: false,
      },
      {
        icon: '',
        title: 'Level',
        link: '/admin/level-management',
        isOpen: false,
      },
      {
        icon: '',
        title: 'Position',
        link: '/admin/position-management',
        isOpen: false,
      },
    ],
  },
];
