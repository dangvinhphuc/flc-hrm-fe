import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { User } from '../../../interfaces/user.interface';
import { RoleEnum } from '../../../enums/role.enum';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { UserService } from '../../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  debounceTime,
  distinctUntilChanged, startWith,
  Subject,
  takeUntil
} from 'rxjs';

@Component({
  selector: 'app-user-management',
  providers: [NzModalService],
  imports: [
    NzTableModule,
    NzButtonModule,
    NzTagModule,
    NzCheckboxModule,
    NzIconModule,
    FormsModule,
    NzMenuModule,
    NzDropDownModule,
    NzSwitchModule,
    NzModalModule,
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit, OnDestroy {
  allChecked = false;
  search: string = '';
  page: number = 1;
  limit: number = 20;
  users: User[] = [];

  isEditModalVisible = false;
  editForm!: FormGroup;
  roles = Object.values(RoleEnum);

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private message: NzMessageService,
    private modal: NzModalService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      id: [''],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      email: [{ value: '', disabled: true }],
      roleName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        startWith(''),
        takeUntil(this.destroy$)
      )
      .subscribe((keyword) => {
        this.getUsers(keyword || '');
      });
  }

  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  openEditModal(user: User) {
    console.log('user for edit:', user);
    this.editForm.patchValue(user);
    this.isEditModalVisible = true;
  }

  onSaveEditModal() {
    if (this.editForm.valid) {
      const updatedUser = this.editForm.getRawValue();
      this.userService.updateUser(updatedUser).subscribe({
        next: (user) => {
          const index = this.users.findIndex((u) => u.id === user.id);
          if (index !== -1) {
            this.users[index] = user;
          }
          this.message.success('User updated successfully ✅');
        },
        error: (error) => {
          console.error('Error updating user:', error);
          this.message.error(error?.message || 'Failed to update user ❌');
        },
        complete: () => {
          this.isEditModalVisible = false;
        },
      });
    }
  }

  onCancelEditModal() {
    this.isEditModalVisible = false;
  }

  getUsers(keyword: string = ''): void {
    this.userService.getUsers(this.page, this.limit, keyword).subscribe({
      next: (response) => {
        this.users = response.data;
        this.allChecked = this.users.every((user) => user.checked === true);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  getRoleColor(role: RoleEnum): string {
    const roleColorMap: Record<RoleEnum, string> = {
      [RoleEnum.SYSTEM_MANAGEMENT]: 'volcano',
      [RoleEnum.HR_MANAGEMENT]: 'geekblue',
      [RoleEnum.HR_ADMIN]: 'blue',
      [RoleEnum.HR_CB]: 'gold',
      [RoleEnum.HR_RECRUITMENT]: 'cyan',
      [RoleEnum.HR_TRAINING]: 'purple',
      [RoleEnum.HR_PAYROLL]: 'green',
    };

    return roleColorMap[role] ?? 'default';
  }

  checkAll(value: boolean): void {
    this.users.forEach((user) => (user.checked = value));
  }

  refreshCheckedStatus(): void {
    this.allChecked = this.users.every((user) => user.checked === true);
  }

  confirmDelete(userId: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this user?',
      nzContent: 'This action cannot be undone.',
      nzOkText: 'Yes, Delete',
      nzOkDanger: true,
      nzOnOk: () => this.deleteUser(userId),
      nzCancelText: 'Cancel',
    });
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== userId);
        this.message.success('User deleted successfully ✅');
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.message.error(error?.message || 'Failed to delete user ❌');
      },
    });
  }

  toggleActive(userId: string) {
    this.userService.toggleActive(userId).subscribe({
      next: (updatedUser) => {
        const index = this.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      },
      error: (error) => {
        console.error('Error toggling user active status:', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
