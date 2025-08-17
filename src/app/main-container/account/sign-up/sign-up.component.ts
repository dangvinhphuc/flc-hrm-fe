import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UserService } from '../../../services/user.service';
import { RoleEnum } from '../../../enums/role.enum';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
  ],
  providers: [NzModalService],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
  passwordVisible = false;
  confirmPasswordVisible = false;

  roles = [
    { value: RoleEnum.SYSTEM_MANAGEMENT, label: 'System Management' },
    { value: RoleEnum.HR_MANAGEMENT, label: 'HRM' },
    { value: RoleEnum.HR_ADMIN, label: 'Admin' },
    { value: RoleEnum.HR_RECRUITMENT, label: 'Recruitment' },
    { value: RoleEnum.HR_TRAINING, label: 'Training' },
    { value: RoleEnum.HR_CB, label: 'C&B' },
    { value: RoleEnum.HR_PAYROLL, label: 'Payroll' },
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [
        '',
        [Validators.required, this.confirmationValidator.bind(this)],
      ],
      role: [null, [Validators.required]],
    });

    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.updateConfirmValidator();
    });
  }

  confirmationValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return { required: true };
    }
    if (control.value !== this.registerForm?.get('password')?.value) {
      return { confirm: true, error: true };
    }
    return null;
  }

  updateConfirmValidator(): void {
    const confirmControl = this.registerForm.get('confirmPassword');
    if (confirmControl?.value) {
      confirmControl.updateValueAndValidity();
    }
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      const { confirmPassword, ...userRegistration }: any =
        this.registerForm.getRawValue();
      this.userService.createUser(userRegistration).subscribe({
        next: () => {
          this.modal.success({
            nzTitle: 'Đăng ký thành công 🎉',
            nzContent: 'Tài khoản của bạn đã được tạo thành công.',
            nzOnOk: () => {
              this.registerForm.reset();
            },
          });
        },
        error: () => {
          this.modal.error({
            nzTitle: 'Đăng ký thất bại ❌',
            nzContent: 'Vui lòng thử lại sau.',
          });
        },
      });
    } else {
      Object.values(this.registerForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
