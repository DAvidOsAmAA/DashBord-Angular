import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthApiService } from '../../../../../projects/auth-api/src/public-api';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, ToastModule],
  providers: [MessageService], // ✅ أضف هذه السطر هنا
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss'],
})
export class ForgotPassComponent {
  emailNotFound = false;

  Forget_passForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // ✅ بدل 'null' بـ ''
  });

  constructor(
    private _AuthApiService: AuthApiService,
    private _Router: Router,
    private _MessageService: MessageService // ✅ Inject الخدمة هنا لو بتستخدم toast
  ) {}

  Forget_pass() {
    if (this.Forget_passForm.invalid) {
      this.Forget_passForm.markAllAsTouched();
      return;
    }

    const emailValue = this.Forget_passForm.controls['email'].value;
    if (!emailValue) return;

    this._AuthApiService.Forgetpass({ email: emailValue }).subscribe({
      next: () => {
        this.emailNotFound = false;

        // ✅ استخدم Toast لإظهار رسالة نجاح
        this._MessageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'A reset code was sent to your email.',
        });

        this._Router.navigate(['/verify-code']);
      },
      error: () => {
        this.emailNotFound = true;
        this._MessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Email not found or something went wrong.',
        });
      },
    });
  }
}
