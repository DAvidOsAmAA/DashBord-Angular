import { ActivatedRoute } from '@angular/router';
import { OccasionsService } from './../../core/services/occasions/occasions.service';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Ioccasions } from '../../shared/interfaces/i-occasions';
import { CommonModule } from '@angular/common';
import { ErrorAlertComponent } from '../../shared/components/ui/error-alert/error-alert.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ViewImgComponent } from '../view-img/view-img.component';

@Component({
  selector: 'app-edit-occasions',
  standalone: true,
  imports: [
    CommonModule,
    ErrorAlertComponent,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    ViewImgComponent,
  ],
  templateUrl: './edit-occasions.component.html',
  styleUrl: './edit-occasions.component.scss',
})
export class EditOccasionsComponent implements OnInit {
  private readonly occasionsService = inject(OccasionsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
showPopup: boolean = false;
  occasion: Ioccasions | null = null;

  editOccasionsForm = new FormGroup({
    name: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.getOccasion(id);
        }
      },
    });
  }

  getOccasion(id: string): void {
    this.occasionsService.getOccasion(id).subscribe({
      next: (res) => {
        this.occasion = res.occasion;
        this.editOccasionsForm.patchValue({
          name: this.occasion?.name,
        });
      },
      error: (err) => {
        console.error('Error fetching occasion:', err);
      },
    });
  }

  editOccasions(): void {
    if (this.occasion && this.editOccasionsForm.valid) {
      this.occasionsService
        .editOccasions(this.occasion._id, this.editOccasionsForm.value)
        .subscribe({
          next: (res) => {
            console.log('Occasion updated successfully', res);
          },
          error: (err) => {
            console.error('Error updating occasion:', err);
          },
        });
    }
  }
  openPopup(): void {
  this.showPopup = true;
}
}
