import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();


  menuOpen = false;
  isProfileVisible = false;
  isNotificationVisible = false;
  contentWrapperMid = false;

  constructor() { }

  menuItems = [
    {
      name: 'Strategy',
      tooltip: 'Programs',
      icon: 'fa fa-table',
      active: false,
      submenu: ['Program No 1', 'Program No 2', 'Program No 3', 'Program No 4'],
    },
    { name: 'Order History', tooltip: 'Companies', icon: 'fa fa-building', active: false },

  ];


  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.toggleSidebar.emit();

  }
  toggleMenuItem(item: any): void {
    item.active = !item.active;
  }
  ngOnInit(): void {
  }

}
