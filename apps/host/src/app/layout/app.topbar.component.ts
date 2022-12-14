import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { getAuthState, LayoutService } from '@mfe/data';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { map } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
  public topMenus!: MenuItem[];
  public user$ = this.store
    .select(getAuthState)
    .pipe(map((state) => state.user));

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  @Input() showSidebarToggle?: boolean;

  constructor(
    private store: Store,
    private router: Router,
    public layoutService: LayoutService
  ) {}

  public ngOnInit(): void {
    this.topMenus = [
      {
        icon: 'pi pi-fw pi-home',
        label: 'Home',
        url: '/',
      },
      {
        icon: 'pi pi-fw pi-tag',
        label: 'Pages',
        url: '/pages',
      },
      {
        icon: 'pi pi-fw pi-book',
        label: 'Document',
        url: '/docs',
      },
      {
        label: 'Shop',
        icon: 'pi pi-fw pi-shopping-bag',
        url: '/shop',
      },
      {
        label: 'Login',
        icon: 'pi pi-fw pi-user',
        url: '/login',
      },
    ];
  }

  public goto(menu: MenuItem): void {
    if (menu.url) {
      this.router.navigateByUrl(menu.url);
    }
  }

  public gotoLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
