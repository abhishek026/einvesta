import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  menuOpen = false;
  isProfileVisible = false;
  isNotificationVisible = false;
  contentWrapperMid = false;
  
  constructor() { }

  menuItems = [
    { name: 'Dashboard', tooltip: 'Dashboard', icon: 'fa fa-dashboard', active: false },
    { name: 'People', tooltip: 'People', icon: 'fa fa-users', active: false },
    {
      name: 'Programs',
      tooltip: 'Programs',
      icon: 'fa fa-table',
      active: false,
      submenu: ['Program No 1', 'Program No 2', 'Program No 3', 'Program No 4'],
    },
    { name: 'Companies', tooltip: 'Companies', icon: 'fa fa-building', active: false },
    { name: 'Documents', tooltip: 'Documents', icon: 'fa fa-file', active: false },
    { name: 'MailBox', tooltip: 'MailBox', icon: 'fa fa-envelope', active: false },
    { name: 'Reports', tooltip: 'Reports', icon: 'fa fa-th', active: false },
    { name: 'Settings', tooltip: 'Settings', icon: 'fa fa-gear', active: false },
  ];
  

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
  toggleMenuItem(item: any): void {
    item.active = !item.active;
  }
  ngOnInit(): void {
  }

}
