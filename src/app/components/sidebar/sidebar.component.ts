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
    // { path: '/#', title: 'Usuarios',  icon:'person', class: '' , roles:'ADMIN'},
    // { path: '/#', title: 'Viajes',  icon:'content_paste', class: '', roles:'ADMIN' },
  
    { path: '/my-travels', title: 'Mis Viajes',  icon:'luggage', class: '' , roles:'CLIENT'},
    { path: '/comments', title: 'Comentarios',  icon:'comment', class: '' , roles:'ADMIN'},
    { path: '/searchTravels', title: 'Busquedas de viajes',  icon:'travel_explore', class: '' , roles:'CLIENT'},
    { path: '/travels', title: 'Viajes',  icon:'travel_explore', class: '' , roles:'ADMIN'},
    { path: '/routes', title: 'Rutas',  icon:'map', class: '' , roles:'ADMIN'},
    { path: '/places', title: 'Lugares',  icon:'room', class: '', roles:'ADMIN' },
    { path: '/drivers', title: 'Conductores',  icon:'badge', class: '', roles:'ADMIN' },
    { path: '/bus', title: 'Vehículos',  icon:'airport_shuttle', class: '', roles:'ADMIN' },
    { path: '/supplies', title: 'Insumos',  icon:'local_dining', class: '', roles:'ADMIN' },
    { path: '/ticket', title: 'Comprar Pasaje',  icon:'travel_explore', class: '' , roles:'CLIENT'},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  userRole: string ='';
  constructor( private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.authorizationService.getUserLogged().subscribe(userAccount=> 
      {
      this.userRole = userAccount.rol;
      console.log(this.userRole);
      });
    this.authorizationService.updateUserLogged();
    
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}



