import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/i-category';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
@Component({
  selector: 'app-categories',
  imports: [ToolbarModule ,ButtonModule,SplitButtonModule,InputTextModule,IconFieldModule,InputIconModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  allCategoories: ICategory[] = [];

  getCategoriesData(): void {
    this.categoriesService.getAllGategories().subscribe({
      next: (res) => {
        console.log(res.categories);
        this.allCategoories = res.categories;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getCategoriesData();
  }

removeItem(id:string):void{
  this.categoriesService.removeCategory(id).subscribe(
    {
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    }
  )
}
}
