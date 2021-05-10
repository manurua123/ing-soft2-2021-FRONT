import { Component, Input, OnInit } from '@angular/core';
import { AuthorizationService } from 'app/service/authorization.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roles?: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/users', title: 'Usuarios',  icon:'person', class: '' , roles:'ADMIN'},
    { path: '/travels', title: 'Viajes',  icon:'content_paste', class: '', roles:'ADMIN' },
    { path: '/routes', title: 'Rutas',  icon:'map', class: '' , roles:'ADMIN'},
    { path: '/places', title: 'Destinos',  icon:'room', class: '', roles:'ADMIN' },
    { path: '/drivers', title: 'Conductores',  icon:'badge', class: '', roles:'ADMIN' },
    { path: '/bus', title: 'Vehiculos',  icon:'airport_shuttle', class: '', roles:'ADMIN' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  userRole: string;
  constructor( private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.authorizationService.getUserLogged().subscribe(userAccount=> 
      this.userRole = userAccount.rol)
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}



