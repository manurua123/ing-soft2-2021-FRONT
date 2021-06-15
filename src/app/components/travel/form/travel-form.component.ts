import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, Injectable} from '@angular/core';
import { Time } from "@angular/common"
import { Travel, TravelData } from 'app/model/travel.model';
import * as moment from 'moment';
import { RouteService } from 'app/service/route.service';
import { TravelService } from 'app/service/travel.service';
import { Route } from 'app/model/route.model';
import { ThemePalette } from '@angular/material/core';
import {DateAdapter, NativeDateAdapter,MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { NgxMatDateAdapter, NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgxMatMomentAdapter, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
declare var $: any;


@Component({
  selector: 'travel-form',
  templateUrl: './travel-form.component.html',
  styleUrls: ['./travel-form.component.css']
})

export class TravelFormComponent {
  @Output()
  closeFormEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  updateTableEvent = new EventEmitter<Travel>();

  @Input()
  editedTravel: Travel;

  @Input()
  isDetailed: boolean;

  @Input()
  selectedRoute: Route;

  @Input()
  routeDatasource: Route[];


  id: number;
 
  route: number;
  price: number;
  departure_date: Date;
  departure_time: Time;
  arrival_date: Date;
  arrival_time: Time;
  available_seats: number
  departure_full: string;
  arrival_full:string;

  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  displayedColumns: string[] = [ 'origin','departure_date','departure_time', 'destination','arrival_date','arrival_time', 'price', 'available_seats'];
  
  constructor(private routeService: RouteService, private travelService: TravelService) { 
    
  }

  ngOnInit() {
    console.log(this.editedTravel);
    console.log(this.isDetailed);
    
    if (!this.editedTravel) {
      this.editedTravel =
      {
        id: undefined,
        route: undefined, 
        departure_date: undefined,
        arrival_date: undefined,
        price: undefined,
        available_seats: undefined,
      }
    }

    this.routeService.getAllRoute().subscribe((listRoute: Route[]) => {
      this.routeDatasource = listRoute;
      this.selectedRoute = this.routeDatasource.filter(route => route.id == this.editedTravel.route)[0];
    });


  }

  close() {
    this.closeFormEvent.emit();
  }

  save() {
    this.editedTravel.route = this.selectedRoute.id;
   
    if (!this.editedTravel.id) 
      this.travelService.save(
        {

          id: this.editedTravel.id,
          route: this.selectedRoute.id,
          departure_date: moment(this.editedTravel.departure_date).format("DD-MM-YYYY HH:mm"),
          arrival_date:   moment(this.editedTravel.arrival_date).format("DD-MM-YYYY HH:mm"),
          price: this.editedTravel.price,
          available_seats: this.editedTravel.available_seats,
        }
      )
        .subscribe(travel => {
          $.notify({
            title: '<strong>Operanción exitosa.</strong>',
            message: 'Se ha guardado correctamente el viaje: <br/>' + this.selectedRoute.origin + ' a ' + this.selectedRoute.destination
          }, {
            type: 'success'
          });
          this.isDetailed = true;
        },
          errorResponse => {
            if (errorResponse.error.code == "travel_exists_error") {
              $.notify({
                title: '<strong>Operanción erronea.</strong>',
                message: errorResponse.error.message
              }, {
                type: 'danger'
              })
            }
          }
        )
    else
      this.travelService.update(
        {
          id: this.editedTravel.id,
          route: this.selectedRoute.id,
          departure_date: moment(this.editedTravel.departure_date).format("DD-MM-YYYY HH:mm"),
          arrival_date: moment(this.editedTravel.arrival_date).format("DD-MM-YYYY HH:mm"),
          price: this.editedTravel.price,
          available_seats: this.editedTravel.available_seats,
        })
        .subscribe(travel => {
          $.notify({
            title: '<strong>Operanción exitosa.</strong>',
            message: 'Se ha modifico correctamente el viaje : <br/>' + this.selectedRoute.origin + ' a ' + this.selectedRoute.destination
          }, {
            type: 'success'
          });
          this.isDetailed = true
        },
          errorResponse => {
            if (errorResponse.error.code == "travel_exists_error") {
              $.notify({
                title: '<strong>Operanción erronea.</strong>',
                message: errorResponse.error.message
              }, {
                type: 'danger'
              })
            }
            if (errorResponse.error.code == "travel_exists_in_ticket_error") {
              $.notify({
                title: '<strong>Operanción erronea.</strong>',
                message: errorResponse.error.message
              }, {
                type: 'danger'
              })
            }
          }
        )
  }

  calculatedArrival(){
  if (this.selectedRoute) {
    let myMoment: moment.Moment = moment(this.editedTravel.departure_date); 
     myMoment.add(this.selectedRoute.total_minute, 'minutes');
     this.editedTravel.arrival_date = myMoment.toDate();
  }
  }

  changeRoute(ruta){
    this.editedTravel.available_seats = ruta.seat_numbers;
    if (this.editedTravel.departure_date) {
      this.calculatedArrival()
    }
  }

}