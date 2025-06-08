import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-add-categories',
  imports: [MessageModule,InputTextModule,ButtonModule,ReactiveFormsModule],
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.scss'
})
export class AddCategoriesComponent {
addCatgory = new FormGroup({
  name : new FormControl(null),
  image: new FormControl(null)
})

sendData(){
  console.log(this.addCatgory)}
}
