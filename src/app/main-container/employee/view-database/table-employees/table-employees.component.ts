import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Employee } from '../../../../interfaces/database.interface';
import { databaseMock } from '../../../../mock-data/database-mock';
import { MoreDetailsComponent } from '../more-details/more-details.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-table-employees',
  imports: [
    NzTableModule,
    CommonModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzDropDownModule,
    NzModalModule,
    MoreDetailsComponent,
    NzFlexModule,
  ],
  templateUrl: './table-employees.component.html',
  styleUrl: './table-employees.component.scss',
})
export class TableEmployeesComponent {
  public database: Employee[] = databaseMock;
  public checkedAll: boolean = false;
  public setOfCheckedId = new Set<string>();
  public isVisibleMoreDetailModal: boolean = false;
  public isVisibleDeleteModal: boolean = false;
  public titleMoreDetailModal: string = '';

  public onClickAddEmployee() {
    console.log('Add Employee button clicked');
    this.titleMoreDetailModal = 'Add Employee';
    this.isVisibleMoreDetailModal = true;
  }

  public onClickDeleteEmployee(): void {
    console.log('Delete Employee button clicked');
    this.isVisibleDeleteModal = true;
  }

  public onClickImportDatabase(): void {
    console.log('Import Database button clicked');
  }

  public onClickExportDatabase() {
    console.log('Export Database button clicked');
  }

  public onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedAllStatus();
  }

  public onAllChecked(checked: boolean): void {
    this.checkedAll = checked;
    this.database.forEach((item) => this.updateCheckedSet(item.id, checked));
    this.refreshCheckedAllStatus();
  }

  public updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  public refreshCheckedAllStatus(): void {
    this.checkedAll = this.database.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
  }

  public onClickActionMoreDetail(employee: Employee): void {
    console.log('onClickMoreDetailEmployeeModal', employee);
    this.titleMoreDetailModal = `${employee.fullName} - ${employee.position}`;
    this.isVisibleMoreDetailModal = true;
  }

  public onClickCloseMoreDetailModal(): void {
    this.isVisibleMoreDetailModal = false;
  }

  public onClickCancelMoreDetailModal(): void {
    this.isVisibleMoreDetailModal = false;
  }

  public onClickCancelDeleteModal(): void {
    this.isVisibleDeleteModal = false;
  }
}
