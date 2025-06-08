import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
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
    path: '**',
    loadComponent: () =>
      import('./shared/components/ui/error-page/error-page.component').then(
        (m) => m.ErrorPageComponent
      ),
  },
];
