import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, } from '@angular/core';
import { Time } from "@angular/common"
import { Route } from 'app/model/Route.model';
import { Travel, TravelData } from 'app/model/travel.model';
import { BusService } from 'app/service/bus.service';
import { RouteService } from 'app/service/route.service';
import { TravelService } from 'app/service/travel.service';

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
  origin: string;
  destination: string;
  route: number;
  price: number;
  departure_date: Time;
  departure_time: string;
  arrival_date: Date;
  arrival_time: Time;
  available_seats: number


  constructor(private routeService: RouteService, private travelService: TravelService) { }


  actualizarOrigenDestino(route: Route) {
    this.editedTravel.origin = route.origin;
    this.editedTravel.destination = route.destination;

  }



  ngOnInit() {

    if (!this.editedTravel) {
      this.editedTravel =
      {
        id: undefined,
        route: undefined,
        origin: undefined,
        departure_date: undefined,
        departure_time: undefined,
        destination: undefined,
        arrival_date: undefined,
        arrival_time: undefined,
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
    this.editedTravel.origin = this.selectedRoute.origin;
    this.editedTravel.destination = this.selectedRoute.destination;
    if (!this.editedTravel.id)
      this.travelService.save(
        {
          id: this.editedTravel.id,
          route: this.selectedRoute.id,
          origin: this.selectedRoute.origin,
          departure_date: this.editedTravel.departure_date,
          departure_time: this.editedTravel.departure_time,
          destination: this.selectedRoute.destination,
          arrival_date: undefined,
          arrival_time: undefined,
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
          origin: this.selectedRoute.origin,
          departure_date: this.editedTravel.departure_date,
          departure_time: this.editedTravel.departure_time,
          destination: this.selectedRoute.destination,
          arrival_date: undefined,
          arrival_time: undefined,
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

}