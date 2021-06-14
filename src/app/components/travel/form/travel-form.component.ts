import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, } from '@angular/core';
import { Time } from "@angular/common"
import { Route } from 'app/model/route.model';
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
 
  route: number;
  price: number;
  departure_date: Time;
  departure_time: string;
  arrival_date: Date;
  arrival_time: Time;
  available_seats: number

  departure_full: string;
  arrival_full:string;


  constructor(private routeService: RouteService, private travelService: TravelService) { }


  // castToDate(current_datetime: Date, time: Time){

  //   let formatted_date = current_datetime.getFullYear() + "-" + 
  //   (current_datetime.getMonth() + 1) + "-" + 
  //   current_datetime.getDate() + " " + 
  //   time.hours + ":" +
  //   time.minutes
  //  return formatted_date

  // }

  // calculateArrival(date: Date, time: Time, duration: Time){
  //     let dateTimeDeparture:
  //     let timeArrival =  date + time + duration; 
  // }

  ngOnInit() {

    if (!this.editedTravel) {
      this.editedTravel =
      {
        id: undefined,
        route: undefined, 
        departure_date: undefined,
        departure_time: undefined,
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
    // this.departure_full = this.castToDate(this.editedTravel.departure_date,this.editedTravel.departure_time)
    
    if (!this.editedTravel.id)
      this.travelService.save(
        {

          id: this.editedTravel.id,
          route: this.selectedRoute.id,
         
          departure_date: this.editedTravel.departure_date,
          departure_time: this.editedTravel.departure_time,
          
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
         
          departure_date: this.editedTravel.departure_date,
          departure_time: this.editedTravel.departure_time,
         
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


<<<<<<< Updated upstream
=======
  changeRoute(ruta){
    this.editedTravel.available_seats = ruta.seat_numbers;
    if (this.editedTravel.departure_date) {
      this.calculatedArrival()
     
    }
>>>>>>> Stashed changes
  }

}