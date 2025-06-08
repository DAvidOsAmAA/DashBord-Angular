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
    pathMatch: 'full'
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
    children: [
      {
        path: 'add',
        loadComponent: () =>
          import('./pages/add-categories/add-categories.component').then(
            (m) => m.AddCategoriesComponent
          ),
        title: 'Add Category',
        data: { breadcrumb: 'Add Categories' },
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/components/ui/error-page/error-page.component').then(
        (m) => m.ErrorPageComponent
      ),
  },
];
