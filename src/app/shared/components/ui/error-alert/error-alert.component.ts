import { Component, Input } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'error-alert',
  imports: [MessageModule,InputTextModule,ButtonModule,ReactiveFormsModule],
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.scss'
})
export class ErrorAlertComponent {

  @Input() FormName!: FormGroup;
  @Input() controlName!: string;
  @Input() errorMsg!: string;
  @Input() error!: string;

}
