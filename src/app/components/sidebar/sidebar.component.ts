import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/users', title: 'Usuarios',  icon:'person', class: '' },
    { path: '/travels', title: 'Viajes',  icon:'content_paste', class: '' },
    { path: '/routes', title: 'Administración de Rutas',  icon:'map', class: '' },
    { path: '/places', title: 'Destinos',  icon:'place', class: '' },
    { path: '/drivers', title: 'Conductores',  icon:'assignment_ind ', class: '' },
    { path: '/bus', title: 'Vehiculos',  icon:'airport_shuttle', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
