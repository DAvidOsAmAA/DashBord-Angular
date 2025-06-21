import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { ErrorAlertComponent } from '../../shared/components/ui/error-alert/error-alert.component';
import { CategoriesService } from '../../core/services/categories/categories.service';
@Component({
  selector: 'app-add-categories',
  imports: [
    MessageModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ErrorAlertComponent,
  ],
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.scss',
})


export class AddCategoriesComponent {
 private readonly _addCat=inject(CategoriesService)

  addCatgory = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    image: new FormControl(null, Validators.required),
  });

  sendData() {
    if (this.addCatgory.valid) {
      console.log(this.addCatgory);
      this._addCat.addCatgory(this.addCatgory.value).subscribe({
        next:(res)=>{
          console.log(res)
        }
      })
    }
  }
}
