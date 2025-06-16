import { FormControl } from '@angular/forms';

export interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
export interface Login {
  email: string;
  password: string;
}
