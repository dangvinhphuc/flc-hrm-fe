import { Component } from '@angular/core';
import { Property } from '../../../interfaces/property.interface';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-property-management',
  imports: [
    NzTableModule,
    NzButtonModule,
    NzMenuModule,
    NzDropDownModule,
    NzIconModule,
    NzModalModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NzTagModule,
  ],
  templateUrl: './property-management.component.html',
  styleUrl: './property-management.component.scss',
})
export class PropertyManagementComponent {
  listOfData: Property[] = [
    { id: '1', shortName: 'HCM', fullName: 'Ho Chi Minh City' },
    { id: '2', shortName: 'HN', fullName: 'Ha Noi' },
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
      fullName: ['', Validators.required],
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.editingItemId = null;
    this.form.reset();
    this.isModalVisible = true;
  }

  openEditModal(item: Property): void {
    this.isEditMode = true;
    this.editingItemId = item.id;
    this.form.patchValue({
      shortName: item.shortName,
      fullName: item.fullName,
    });
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    //call api
  }

  handleCancel(): void {
    this.isModalVisible = false;
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

  addNew() {
    console.log('Add new property');
  }

  edit(item: Property) {
    console.log('Edit: ', item);
  }

  delete(item: Property) {
    console.log('Delete: ', item);
  }

  confirmDelete(propertyId: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this property?',
      nzContent: 'This action cannot be undone.',
      nzOkText: 'Yes, Delete',
      nzOkDanger: true,
      nzOnOk: () => this.processDelete(propertyId),
      nzCancelText: 'Cancel',
    });
  }

  processDelete(propertyId: string) {
    console.log('Delete user with id: ', propertyId);
  }
}
