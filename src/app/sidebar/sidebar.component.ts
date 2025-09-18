import { Component, OnInit } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MenuItem } from '../interfaces/sidebar.interface';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Router, RouterLink } from '@angular/router';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NgTemplateOutlet } from '@angular/common';
import { menuItems } from '../const/menu-items';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user.interface';

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
export class SidebarComponent implements OnInit {
  public menuItems: MenuItem[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.menuItems = this.filterMenuItems(menuItems, user);
    });
  }

  filterMenuItems(items: MenuItem[], user: User | null): MenuItem[] {
    return items
      .filter((item) => {
        if (!user) {
          return item.title === 'Account';
        }
        if (item.roles && user.roleName) {
          return item.roles.includes(user.roleName);
        }
        return true;
      })
      .map((item) => {
        if (item.title === 'Account' && item.subMenu) {
          return {
            ...item,
            title: user ? `${user.firstName} ${user.lastName}` : 'Account',
            subMenu: item.subMenu.filter((sub) => {
              if (user) {
                return sub.title !== 'Sign In' && sub.title !== 'Sign Up';
              } else {
                return sub.title === 'Sign In' || sub.title === 'Sign Up';
              }
            }),
          };
        }
        return item;
      });
  }

  openHandler(open: boolean, item: MenuItem, items: MenuItem[]) {
    if (open) {
      items.forEach((i) => {
        if (i !== item) {
          i.isOpen = false;
          if (i.subMenu) {
            i.subMenu.forEach((sub) => (sub.isOpen = false));
          }
        }
      });
    }
  }

  onClickItem(item: MenuItem) {
    switch (item?.action) {
      case 'signOut':
        this.authService.setSignOut();
        this.router.navigate(['/account/sign-in']);
        break;
      default:
        break;
    }
  }
}
