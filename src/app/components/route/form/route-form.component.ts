import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { Bus } from 'app/model/bus.model';
import { Place } from 'app/model/place.model';
import { Route } from 'app/model/route.model';
import { BusService } from 'app/service/bus.service';
import { PlaceService } from 'app/service/place.service';
import { RouteService } from 'app/service/route.service';

declare var $: any;

@Component({
  selector: 'route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.css']
})

export class RouteFormComponent implements OnInit {

  @Output()
  closeFormEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  updateTableEvent = new EventEmitter<Route>();

  @Input()
  editedRoute: Route;

  @Input()
  isDetailed: boolean;

  @Input()
  selectedOrigen: Place;

  @Input()
  selectedDestination: Place;

  @Input()
  selectedBus: Bus;

  @Input() originDatasource: Place[];
  @Input() destinationDatasource: Place[];
  @Input() busDatasource: Bus[];


  distance: number;
  duration: number;

  constructor(private placeService: PlaceService, private busService: BusService, private routeService: RouteService) { }

  ngOnInit() {
    this.busService.getAllBus().subscribe((busList: Bus[]) => {
      this.busDatasource = busList;
      this.selectedBus = this.busDatasource.filter(bus => bus.id == this.editedRoute.bus_id)[0];
    });
    this.placeService.getAllPlace().subscribe((listPlace: Place[]) => {
      this.originDatasource = listPlace;
      this.destinationDatasource = listPlace;
      this.selectedOrigen = this.originDatasource.filter(place => place.id == this.editedRoute.origin_id)[0];
      this.selectedDestination = this.destinationDatasource.filter(place => place.id == this.editedRoute.destination_id)[0];
    });

    if (!this.editedRoute) {
      this.editedRoute =
      {
        id: undefined,
        origin: undefined,
        origin_id: undefined,
        destination: undefined,
        destination_id: undefined,
        bus: undefined,
        bus_id: undefined,
        duration: undefined,
        distance: undefined
      }
    }
  }

  close() {
    this.closeFormEvent.emit();
  }

  save() {
    this.editedRoute.bus_id = this.selectedBus.id;
    this.editedRoute.origin_id = this.selectedOrigen.id;
    this.editedRoute.destination_id = this.selectedDestination.id;
    if (!this.editedRoute.id)
      this.routeService.save(
        {
          origin: this.selectedOrigen.id,
          destination: this.selectedDestination.id,
          bus: this.selectedBus.id,
          duration: this.editedRoute.duration,
          distance: this.editedRoute.distance
        }
      )
        .subscribe(route => {
          $.notify({
            title: '<strong>Operanción exitosa.</strong>',
            message: 'Se ha guardado correctamente la ruta: <br/>'+ this.selectedOrigen.place + ' a ' + this.selectedDestination.place
          }, {
            type: 'success'
          });
          this.isDetailed = true;
        },
          errorResponse => {
            if (errorResponse.error.code == "route_exists_error") {
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
      this.routeService.update(
        {
          id: this.editedRoute.id,
          origin: this.selectedOrigen.id,
          destination: this.selectedDestination.id,
          bus: this.selectedBus.id,
          duration: this.editedRoute.duration,
          distance: this.editedRoute.distance
        })
        .subscribe(route => {
          $.notify({
            title: '<strong>Operanción exitosa.</strong>',
            message: 'Se ha modifico correctamente la ruta: <br/>'+ this.selectedOrigen.place + ' a ' + this.selectedDestination.place
          }, {
            type: 'success'
          });
          this.isDetailed = true
        },
          errorResponse => {
            if (errorResponse.error.code == "route_exists_error") {
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