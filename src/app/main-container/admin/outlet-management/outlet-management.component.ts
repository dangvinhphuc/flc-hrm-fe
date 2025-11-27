import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Outlet } from '../../../interfaces/outlet.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Property } from '../../../interfaces/property.interface';
import { Department } from '../../../interfaces/department.interface';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-outlet-management',
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
    NzSelectModule
  ],
  templateUrl: './outlet-management.component.html',
  styleUrl: './outlet-management.component.scss',
})
export class OutletManagementComponent {
  listOfData: Outlet[] = [
    {
      id: '1',
      name: 'Outlet A',
      department: {
        id: '1',
        shortName: 'HR',
        enFullName: 'Human Resources',
        viFullName: 'Nhân sự',
      },
      property: {
        id: '1',
        shortName: 'Property A',
        fullName: 'Property A Full Name',
      },
    },
    {
      id: '2',
      name: 'Outlet B',
      department: {
        id: '2',
        shortName: 'IT',
        enFullName: 'Information Technology',
        viFullName: 'Công nghệ thông tin',
      },
      property: {
        id: '2',
        shortName: 'Property B',
        fullName: 'Property B Full Name',
      },
    },
  ];

  properties: Property[] = [
    { id: '1', shortName: 'HCM', fullName: 'Ho Chi Minh City' },
    { id: '2', shortName: 'HN', fullName: 'Ha Noi' },
  ];

  departments: Department[] = [
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

  checkedAll = false;
  setOfCheckedId = new Set<string>();
  isModalVisible = false;
  isEditMode = false;
  isSubmitting = false;
  form: FormGroup;
  editingItemId: string | null = null;

  constructor(private fb: FormBuilder, private modal: NzModalService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      departmentId: ['', Validators.required],
      propertyId: ['', Validators.required],
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

  openEditModal(item: Outlet): void {
    this.isEditMode = true;
    this.editingItemId = item.id;
    this.form.patchValue({
      name: item.name,
      departmentId: item.department.id,
      propertyId: item.property.id,
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

  handleCancel(): void {
    this.isModalVisible = false;
  }

  processDelete(departmentId: string) {
    console.log('Delete user with id: ', departmentId);
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
