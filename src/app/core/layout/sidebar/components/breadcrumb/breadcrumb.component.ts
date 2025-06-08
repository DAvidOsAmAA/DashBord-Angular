import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumb();
      });

    this.updateBreadcrumb();
  }

  private updateBreadcrumb() {
    const breadcrumbs: Breadcrumb[] = [];
    let currentRoute = this.activatedRoute.root;
    let url = '';
  
    const addBreadcrumb = (route: ActivatedRoute) => {
      const children = route.children;
  
      for (const child of children) {
        const routeSnapshot = child.snapshot;
        const routeURL = routeSnapshot.url.map(segment => segment.path).join('/');
        if (routeURL) {
          url += `/${routeURL}`;
        }
  
        if (routeSnapshot.data['breadcrumb']) {
          breadcrumbs.push({
            label: routeSnapshot.data['breadcrumb'],
            url: url,
          });
        }
  
        if (child.children.length > 0) {
          addBreadcrumb(child);
        }
      }
    };
  
    addBreadcrumb(currentRoute);
  
    // تأكد أن أول عنصر دائمًا هو Dashboard
    if (!breadcrumbs.find(b => b.label === 'Dashboard')) {
      breadcrumbs.unshift({
        label: 'Dashboard',
        url: '/overview',
      });
    }
  
    this.breadcrumbs = breadcrumbs;
  }
  
  
}
