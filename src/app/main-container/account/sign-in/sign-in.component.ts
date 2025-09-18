import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UserLogin } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-sign-in',
  providers: [NzModalService],
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  passwordVisible: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private modal: NzModalService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.signInForm.valid) {
      this.loading = true;
      const userLogin: UserLogin = this.signInForm.value;
      this.authService.login(userLogin).subscribe({
        next: (res) => {
          this.loading = false;
          this.authService.setSignIn(res);
          this.router.navigate(['database/view']);
        },
        error: (err) => {
          this.loading = false;
          console.log('Login error:', err);
          this.modal.error({
            nzTitle: 'Login Failed ❌',
            nzContent: err.error.message || 'An error occurred during login.',
          });
        },
      });
    } else {
      Object.values(this.signInForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
