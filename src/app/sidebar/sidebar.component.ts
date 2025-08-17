import { Component } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MenuItem } from '../interfaces/sidebar.interface';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    NzMenuModule,
    NzIconModule,
    RouterLink,
    NzFlexModule,
    NgTemplateOutlet,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public topMenuItems: MenuItem[] = [
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
      title: 'Timesheet',
      link: '/timesheet',
      isOpen: false,
      // subMenu: [],
    },
    {
      icon: 'dollar',
      title: 'Payroll',
      link: '/payroll',
      isOpen: false,
    },
    {
      icon: 'setting',
      title: 'Admin',
      link: '/admin',
      isOpen: false,
    },
  ];

  public bottomMenuItems: MenuItem[] = [
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
        },
      ],
    },
  ];

  public openHandler(value: boolean): void {
    // console.log('openHandler', value);
  }
}
