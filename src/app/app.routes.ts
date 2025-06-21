import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { ProductsComponent } from './pages/manage-product/products/products.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    title: 'Products Management',
    data: { breadcrumb: 'Products' },
   
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',

    redirectTo: '/products',

  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'verify-code',
    loadComponent: () =>
      import('./core/page/verify-code/verify-code.component').then((c) => c.VerifyCodeComponent),
  },
  {
    path: 'forgot-pass',
    loadComponent: () =>
      import('./core/page/forgot-pass/forgot-pass.component').then((c) => c.ForgotPassComponent),
  },
  {
    path: 'setpass',
    loadComponent: () =>
      import('./core/page/setpass/setpass.component').then((c) => c.SetpassComponent),

    pathMatch: 'full',
  },

  {
    path: 'add-product',
    loadComponent: () =>
      import('./pages/manage-product/add-product/add-product.component').then(
        (m) => m.AddProductComponent
      ),
  },

  {
    path: 'update-product/:id',
    loadComponent: () =>
      import('./pages/manage-product/update-product/update-product.component').then(
        (m) => m.UpdateProductComponent
      ),
  },
  {
    path: 'overview',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/overview/overview.component').then(
        (m) => m.OverviewComponent
      ),
    data: { breadcrumb: 'Dashboard' },
  },

  {
    path: 'categories',
    canActivate: [AuthGuard],
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
