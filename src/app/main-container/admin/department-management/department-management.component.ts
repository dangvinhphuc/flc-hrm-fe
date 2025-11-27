import { Component } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Department } from '../../../interfaces/department.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-department-management',
  imports: [
    NzTableModule,
    NzTagModule,
    NzDropDownModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
  ],
  templateUrl: './department-management.component.html',
  styleUrl: './department-management.component.scss',
})
export class DepartmentManagementComponent {
  listOfData: Department[] = [
    {
      id: '1',
      shortName: 'HR',
      enFullName: 'Human Resources',
      viFullName: 'Nhân sự',
    },
    {
      id: '2',
      shortName: 'IT',
      enFullName: 'Information Technology',
      viFullName: 'Công nghệ thông tin',
    },
    {
      id: '3',
      shortName: 'FN',
      enFullName: 'Finance',
      viFullName: 'Tài chính',
    },
  ];

  setOfCheckedId = new Set<string>();
  checkedAll = false;
  isModalVisible = false;
  isSubmitting = false;
  isEditMode = false;
  editingItemId: string | null = null;
  form: FormGroup;

  constructor(private fb: FormBuilder, private modal: NzModalService) {
    this.form = this.fb.group({
      shortName: ['', Validators.required],
      enFullName: ['', Validators.required],
      viFullName: ['', Validators.required],
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.editingItemId = null;
    this.form.reset();
    this.isModalVisible = true;
  }

  onAllChecked(checked: boolean): void {
    if (checked) {
      this.listOfData.forEach((item) => this.setOfCheckedId.add(item.id));
    } else {
      this.setOfCheckedId.clear();
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
    this.checkedAll = this.listOfData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
  }

  openEditModal(item: Department): void {
    this.isEditMode = true;
    this.editingItemId = item.id;
    this.form.patchValue({
      shortName: item.shortName,
      enFullName: item.enFullName,
      viFullName: item.viFullName,
    });
    this.isModalVisible = true;
  }

  confirmDelete(departmentId: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this department?',
      nzContent: 'This action cannot be undone.',
      nzOkText: 'Yes, Delete',
      nzOkDanger: true,
      nzOnOk: () => this.processDelete(departmentId),
      nzCancelText: 'Cancel',
    });
  }

  processDelete(departmentId: string) {
    console.log('Delete user with id: ', departmentId);
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  handleOk(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    //call api
  }
}
