import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorAlertComponent } from '../../shared/components/ui/error-alert/error-alert.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/i-category';
import { ViewImgComponent } from '../view-img/view-img.component';

@Component({
  selector: 'app-edit-category',
  imports: [
    ErrorAlertComponent,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    ViewImgComponent
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss',
})
export class EditCategoryComponent {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _categoriesService = inject(CategoriesService);

  category: ICategory | null = null;
  ngOnInit(): void {
    let id: string | null = '';
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        id = params.get('id');
      },
    });

    this._categoriesService.getCategory(id!).subscribe({
      next: (res) => {
        this.category = res.category;
        this.editCatgory.patchValue({
          name: this.category?.name,
        });
      },
    });
  }

  editCatgory = new FormGroup({
    name: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
  });


  editData(){
    this._categoriesService.editCategory(this.category!._id!,this.editCatgory.value).subscribe(
      {
        next:(res)=>{
          console.log(res);
        }
      }
    );
  }
  showPopup = false;
openPopup() {
  this.showPopup = true;
}
}
