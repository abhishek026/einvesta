import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  menuOpen = false; // Controls `bar1` and `bar2`
  showBar1 = true; // Controls `bar3`
  showBar2 = false;
  showBar3 = false;
  showBreadCrumb = false
  menuItems = [
    {
      name: 'Strategy Builder',
      path: '/strategy-builder',
      tooltip: 'Strategy-Builder',
      icon: 'fa fa-building',
      active: false,
    },
    {
      name: 'Template List',
      path: '/order-history',
      tooltip: 'Template',
      icon: 'fa fa-building',
      active: false,
    }
    // {
    //   name: 'Strategy',
    //   tooltip: 'Strategy',
    //   icon: 'fa fa-table',
    //   path: '/strategy',
    //   active: false,
    //   submenu: ['Program No 1', 'Program No 2', 'Program No 3', 'Program No 4'],
    // }
  ];
  breadcrumb: string = 'Stratergy Builder'
  constructor(private themeService: ThemeService,
    private auth: AuthService,
    private router: Router) { }
  setTheme(theme: 'light' | 'dark' | 'auto') {
    this.themeService.setTheme(theme);
  }

  ngOnInit(): void {
    this.toggleMenu();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.showBar3 = true;
      this.showBar1 = false;
      this.showBreadCrumb = true // Show `bar3` when `menuOpen` is true
    } else {
      this.showBar3 = false;
      this.showBreadCrumb = true;
      this.showBar1 = true; // Hide `bar3` when `menuOpen` is false
    }
    this.toggleSidebar.emit();
  }

  toggleMenuItem(item: any): void {
    item.active=!item.active;
    this.menuItems = this.menuItems.map((item1) => {
      if (item.name != item1.name) {
        return {
          ...item1,
          active: false,
        };
      }else{
        return {
          ...item1
      }
    }
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}