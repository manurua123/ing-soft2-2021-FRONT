import { Component, Input, OnInit } from '@angular/core';
import { AuthorizationService } from 'app/service/authorization.service';
import {MatMenuModule} from '@angular/material/menu'; 

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roles?: string;
    visible ?: boolean;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/#', title: 'Usuarios',  icon:'person', class: '' , roles:'ADMIN'},
    // { path: '/#', title: 'Viajes',  icon:'content_paste', class: '', roles:'ADMIN' },
  
    
    { path: '/comments', title: 'Comentarios',  icon:'comment', class: '' , roles:'ADMIN', visible: true},
    { path: '/travels', title: 'Viajes',  icon:'travel_explore', class: '' , roles:'ADMIN', visible: true},
    { path: '/routes', title: 'Rutas',  icon:'map', class: '' , roles:'ADMIN', visible: true},
    { path: '/places', title: 'Lugares',  icon:'room', class: '', roles:'ADMIN' },
    { path: '/drivers', title: 'Conductores',  icon:'badge', class: '', roles:'ADMIN', visible: true },
    { path: '/bus', title: 'Vehículos',  icon:'airport_shuttle', class: '', roles:'ADMIN', visible: true },
    { path: '/supplies', title: 'Insumos',  icon:'local_dining', class: '', roles:'ADMIN', visible: true },
    { path: '/questionnaire', title: '',  icon:'', class: '', roles:'', visible: false },
    
    { path: '/nextTravels', title: 'Próximos viajes',  icon:'local_dining', class: '', roles:'DRIVER', visible: true },
    { path: '/completedTravels', title: 'Viajes realizados',  icon:'local_dining', class: '', roles:'DRIVER', visible: true },
    
    { path: '/pendingTravels', title: 'Viajes pendientes',  icon:'local_dining', class: '', roles:'ADMIN', visible: true },
    { path: '/simplifiedSale', title: 'Venta simplificada',  icon:'local_dining', class: '', roles:'DRIVER', visible: true },


    { path: '/searchTravels', title: 'Busquedas de viajes',  icon:'travel_explore', class: '' , roles:'CLIENT', visible: true},
    { path: '/ticket', title: 'Comprar Pasaje',  icon:'shopping_cart', class: '' , roles:'CLIENT', visible: true},
    { path: '/my-travels', title: 'Mis Viajes',  icon:'luggage', class: '' , roles:'CLIENT', visible: true},
    
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



