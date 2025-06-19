import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Login, LoginForm } from '../../shared/interfaces/Auth/login';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { localStorageKeys } from '../../shared/interfaces/localStorageKeys';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, Toast, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<LoginForm>;
  submitted: boolean = false;
  loading: boolean = false;
  subscription: Subscription[] = [];
  private _AuthApiService = inject(AuthService);
  private _MessageService = inject(MessageService);
  constructor(private router: Router) {}
  ngOnInit() {
    this.initLoginForm();
  }

  //#region init form
  initLoginForm(): void {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]),
    });
  }
  get loginControls() {
    return this.loginForm.controls;
  }

  //#region validation check
  validationChecker(): boolean {
    if (this.loginForm.invalid) {
      return false;
    }
    return true;
  }
  //#endregion

  //#region submit form
  onSubmit() {
    this.submitted = true;
    if (!this.validationChecker()) return;
    this.loading = true;
    let data: Login = {
      email: this.loginControls.email.value!,
      password: this.loginControls.password.value!,
    };
    let sub = this._AuthApiService.login(data).subscribe({
      next: (res: any) => {
        if (res.message === 'success') {
          localStorage.setItem(localStorageKeys.JWT, res.token);
          this.submitted = false;
          this.loading = false;
          this.router.navigate(['/overview']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.submitted = false;
        this._MessageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.error,
        });
      },
    });
    this.subscription.push(sub);
  }
  //#endregion
}
