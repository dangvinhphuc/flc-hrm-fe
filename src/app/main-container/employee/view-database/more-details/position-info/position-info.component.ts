import { Component, inject } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-position-info',
  imports: [
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    NzFlexModule
  ],
  templateUrl: './position-info.component.html',
  styleUrl: './position-info.component.scss',
})
export class PositionInfoComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  public positionInfoForm: FormGroup = this.formBuilder.group({
    code: [],
    fullName: [],
    departmentId: [],
    propertyId: [],
    outletId: [],
    positionId: [],
    level: [],
    startingDate: [],
    contractType: [],
  });

  public submitForm() {
    if (this.positionInfoForm.valid) {
      console.log('Form Submitted!', this.positionInfoForm.value);
    } else {
      console.log('Form is invalid!');
    }
  }
}
