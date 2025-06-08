import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from 'primeng/button';
import { SidebarComponent } from './sidebar.component';
import { Router } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule, ButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo', () => {
    const logoElement = fixture.nativeElement.querySelector('.logo img');
    expect(logoElement).toBeTruthy();
    expect(logoElement.getAttribute('src')).toBe('/icon/Logo.png');
    expect(logoElement.getAttribute('alt')).toBe('Rose Logo');
  });

  it('should render preview website button', () => {
    const previewButton = fixture.nativeElement.querySelector('.preview-btn');
    expect(previewButton).toBeTruthy();
    expect(previewButton.textContent).toContain('Preview Website');
  });

  it('should render all navigation items', () => {
    const navItems = fixture.nativeElement.querySelectorAll('.nav-item');
    expect(navItems.length).toBe(4);

    const expectedRoutes = [
      {
        path: '/overview',
        text: 'Overview',
        icon: '/icon/layout-dashboard.png',
      },
      {
        path: '/category/show',
        text: 'Categories',
        icon: '/icon/clipboard-list.png',
      },
      {
        path: '/occasions',
        text: 'Occasions',
        icon: '/icon/calendar-heart.png',
      },
      { path: '/products', text: 'Products', icon: '/icon/package.png' },
    ];

    navItems.forEach((item: HTMLElement, index: number) => {
      expect(item.getAttribute('routerLink')).toBe(expectedRoutes[index].path);
      expect(item.textContent?.trim()).toContain(expectedRoutes[index].text);
      const icon = item.querySelector('img');
      expect(icon?.getAttribute('src')).toBe(expectedRoutes[index].icon);
    });
  });

  it('should render user profile section', () => {
    const userProfile = fixture.nativeElement.querySelector('.user-profile');
    expect(userProfile).toBeTruthy();

    const avatar = userProfile.querySelector('.user-avatar');
    expect(avatar).toBeTruthy();
    expect(avatar.getAttribute('src')).toBe('/icon/Avatar.png');

    const userName = userProfile.querySelector('.user-name');
    expect(userName.textContent).toBe('Firstname Lastname');

    const userEmail = userProfile.querySelector('.user-email');
    expect(userEmail.textContent).toBe('user-email@example.com');

    const settingsButton = userProfile.querySelector('.settings-btn');
    expect(settingsButton).toBeTruthy();
    expect(settingsButton.querySelector('i.fas.fa-ellipsis-v')).toBeTruthy();
  });

  it('should open preview website in new tab', () => {
    spyOn(window, 'open');
    component.previewWebsite();
    expect(window.open).toHaveBeenCalledWith('/', '_blank');
  });

  it('should apply active class to current route', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const navItems = fixture.nativeElement.querySelectorAll('.nav-item');

    // Simulate click on Categories nav item
    navItems[1].click();
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/category/show']);
  });

  it('should have correct styles for active navigation item', () => {
    const activeNavItem =
      fixture.nativeElement.querySelector('.nav-item.active');
    const styles = window.getComputedStyle(activeNavItem);

    expect(styles.backgroundColor).toBe('rgb(255, 240, 248)'); // #FFF0F8
    expect(styles.color).toBe('rgb(248, 43, 169)'); // #F82BA9
  });
});
