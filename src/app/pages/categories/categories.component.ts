import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/i-category';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { RouterLink } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-categories',
  imports: [InputIconModule, FormsModule,InputTextModule,TableModule, PaginatorModule,RouterLink,RouterLink],
  templateUrl: './categories.component.html',
  
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
loading: boolean = true;
  allCategories: ICategory[] = [];
  searchQuery: string = '';
filteredCategories: ICategory[] = [];

  getCategoriesData(): void {
    this.loading = true;
    this.categoriesService.getAllGategories().subscribe({
      next: (res) => {
        this.loading = false;
        console.log(res.categories);
        this.allCategories = res.categories;
        this.filteredCategories = [...this.allCategories];
      },
      error: (err) => {
        this.loading = false;
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


filterCategories(): void {
  if (!this.searchQuery.trim()) {
    this.filteredCategories = [...this.allCategories];
    return;
  }

  const query = this.searchQuery.toLowerCase().trim();
  this.filteredCategories = this.allCategories.filter(category =>
    category.name.toLowerCase().includes(query) ||
    category.productsCount?.toString().includes(query)
  );
}

}
