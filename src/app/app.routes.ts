import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Products Management',
    data: { breadcrumb: 'Products' },
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    loadComponent: () =>
      import('./pages/overview/overview.component').then(
        (m) => m.OverviewComponent
      ),
    data: { breadcrumb: 'Dashboard' },
  },

  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
    title: 'Show Category',
    data: { breadcrumb: 'Categories' },
  },
  {
    path: 'categories/add-category',
    loadComponent: () =>
      import('./pages/add-categories/add-categories.component').then(
        (m) => m.AddCategoriesComponent
      ),
    title: 'add Category',
    data: { breadcrumb: 'categories > add-category' },
  },
  {
    path: 'categories/edit-category/:id',
    loadComponent: () =>
      import('./pages/edit-category/edit-category.component').then(
        (m) => m.EditCategoryComponent
      ),
    title: 'edit Category',
    data: { breadcrumb: 'categories > edit-category' },
  },
  {
    path: 'occasions',
    loadComponent: () =>
      import('./pages/occasions/occasions.component').then(
        (m) => m.OccasionsComponent
      ),
    title: 'occasions',
    data: { breadcrumb: 'occasions' },
  },
    {
    path: 'occasions/edit-occasions/:id',
    loadComponent: () =>
      import('./pages/edit-occasions/edit-occasions.component').then(
        (m) => m.EditOccasionsComponent
      ),
    title: 'edit Occasions',
    data: { breadcrumb: 'occasions > edit-occasions' },
  },
  {
    path: 'occasions/add-occasion',
    loadComponent: () =>
      import('./pages/add-occassion/add-occassion.component').then(
        (m) => m.AddOccassionComponent
      ),
    title: 'add Occasions',
    data: { breadcrumb: 'occasions > add-occasions' },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/ui/error-page/error-page.component').then(
        (m) => m.ErrorPageComponent
      ),
  },
];
