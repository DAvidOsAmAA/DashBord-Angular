import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OccasionsService } from '../../core/services/occasions/occasions.service';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ErrorAlertComponent } from '../../shared/components/ui/error-alert/error-alert.component';

@Component({
  selector: 'app-add-occassion',
  imports: [    MessageModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ErrorAlertComponent,],
  templateUrl: './add-occassion.component.html',
  styleUrl: './add-occassion.component.scss'
})
export class AddOccassionComponent {
 private readonly _addOccasionsSrvice=inject(OccasionsService)

  addOccssion = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    image: new FormControl(null, Validators.required),
  });

  sendData() {
    if (this.addOccssion.valid) {
      this._addOccasionsSrvice.addOcasions(this.addOccssion.value).subscribe({
        next:(res)=>{
          console.log(res)
        }
      })
    }
  }
}
