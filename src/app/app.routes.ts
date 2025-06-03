import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'category/show',
        loadComponent: () =>
            import('../app/pages/categories/categories.component').then(
                (m) => m.CategoriesComponent
            ),
        title: 'Show Category',
    },
    {
        path: 'category/add',
        loadComponent: () =>
            import('../app/pages/add-categories/add-categories.component').then(
                (m) => m.AddCategoriesComponent
            ),
        title: 'Add Category',
    },
];
