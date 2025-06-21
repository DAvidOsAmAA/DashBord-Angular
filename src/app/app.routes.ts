import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
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
    path: '**',
    loadComponent: () =>
      import('./shared/components/ui/error-page/error-page.component').then(
        (m) => m.ErrorPageComponent
      ),
  },
];
