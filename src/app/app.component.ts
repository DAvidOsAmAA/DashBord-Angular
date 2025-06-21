import { Component, OnInit, PLATFORM_ID, Inject, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { BreadcrumbComponent } from './core/layout/sidebar/components/breadcrumb/breadcrumb.component';
import { TopBarComponent } from './core/layout/top-bar/top-bar.component';
import { MobileNavComponent } from './core/layout/mobile-nav/mobile-nav.component';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    BreadcrumbComponent,
    TopBarComponent,
    MobileNavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isMobileView = false;
  public _AuthApiService = inject(AuthService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      window.addEventListener('resize', () => this.checkScreenSize());
    }
  }

  private checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = window.innerWidth <= 768;
    }
  }

  someMethod() {
    if (isPlatformBrowser(this.platformId)) {
      // Safe to use localStorage here
      localStorage.setItem('key', 'value');
    }
  }

}
