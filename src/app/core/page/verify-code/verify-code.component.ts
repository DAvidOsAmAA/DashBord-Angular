import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthApiService } from '../../../../../projects/auth-api/src/public-api'; // عدله حسب المسار الفعلي
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent {
  verify_codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });

  constructor(
    private _AuthApiService: AuthApiService,
    private _Router: Router,
    private _MessageService: MessageService
  ) {}

  verify_code() {
    if (this.verify_codeForm.invalid) {
      this.verify_codeForm.markAllAsTouched();
      return;
    }

    const code = this.verify_codeForm.value;

    this._AuthApiService.VerifyCode(code).subscribe({
      next: (res) => {
        this._MessageService.add({
          severity: 'success',
          summary: 'Verified',
          detail: 'Code verified successfully. Please reset your password.',
        });
        this._Router.navigate(['/setpass']);
      },
      error: (err) => {
        console.error('Error verifying code:', err);
        this._MessageService.add({
          severity: 'error',
          summary: 'Invalid Code',
          detail: err.error?.message || 'Verification failed. Try again.',
        });
      }
    });
  }
}
