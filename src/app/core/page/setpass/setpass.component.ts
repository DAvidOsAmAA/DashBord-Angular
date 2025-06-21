import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthApiService } from '../../../../../projects/auth-api/src/public-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setpass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './setpass.component.html',
  styleUrls: ['./setpass.component.scss']
})
export class SetpassComponent {
  errorMessage: string | null = null;
  isLoading: boolean = false;

  resetpassForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ])
  });

  constructor(
    private _AuthApiService: AuthApiService,
    private _Router: Router,
    private _MessageService: MessageService
  ) {}

  Resetpass() {
    this.errorMessage = null;

    if (this.resetpassForm.invalid) {
      this.resetpassForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this._AuthApiService.resetpass(this.resetpassForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this._MessageService.add({
          severity: 'success',
          summary: 'Password Reset',
          detail: 'Your password has been reset successfully.'
        });
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          err.error?.message || 'Password reset failed. Please try again.';
        this._MessageService.add({
          severity: 'error',
          summary: 'Error',
        });
        this.resetpassForm.get('newPassword')?.reset();
      }
    });
  }
}
