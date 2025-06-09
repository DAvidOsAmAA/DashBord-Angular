import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth: AuthService = inject(AuthService);

  let currentUser =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjgzZjVjOGZhOGJjYTMwN2Y5YzdlOThmIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDg5ODI5NDB9.Rg2DOlr3RMsicxL5wIJ71352k3H-Z-_-VT5eh4xVHkI';

  if (currentUser) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser}`,
      },
    });
  }
  return next(req);
};
