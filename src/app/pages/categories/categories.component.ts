import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/i-category';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
private readonly categoriesService = inject(CategoriesService)

allCategoories:ICategory[]  =[];


getCategoriesData():void{
    this.categoriesService.getAllGategories().subscribe({
      next:(res)=>{
        console.log(res.categories)
        this.allCategoories = res.categories
      },
      error:(err)=>{
        console.log(err)
      }
    })
}

  ngOnInit(): void {
this.getCategoriesData()
  }
}
