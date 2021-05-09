import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { Bus } from 'app/model/bus.model';
import { Driver } from 'app/model/driver.model';
import { DriverService } from 'app/service/driver.service';
import { BusService } from 'app/service/bus.service';

declare var $: any;

@Component({
  selector: 'bus-form',
  templateUrl: './bus-form.component.html',
  styleUrls: ['./bus-form.component.css']
})

export class BusFormComponent implements OnInit {

  @Output()
  closeFormEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  updateTableEvent = new EventEmitter<Bus>();

  @Input()
  editedBus: Bus;

  @Input()
  isDetailed: boolean;

  @Input()
  selectedDriver: Driver;

  @Input()
  selectedBus: Bus;


  @Input() driverDatasource: Driver[];

  @Input() typeBus: string[];
  @Input() selectedType: string;
  
  identification: string;
  model: string;
  licencePlate: string;
  seatNumber: number;
  type: string;

  constructor(private driverService: DriverService, private busService: BusService) { }

  ngOnInit() {
    if (!this.editedBus) {
      this.editedBus =
      {
        id: undefined,
        driver: undefined,
        driver_id: undefined,
        identification: undefined,
        model: undefined,
        licencePlate: undefined,
        seatNumbers: undefined,
        type: undefined,
      }
    }
    this.typeBus= ["C", "SC"];
    this.selectedType = this.editedBus.type;
    this.driverService.getAllDriver().subscribe((driverList: Driver[]) => {
      this.driverDatasource = driverList;
      this.selectedDriver = this.driverDatasource.filter(driver => driver.id == this.editedBus.driver_id)[0];
    });


  }

  close() {
    this.closeFormEvent.emit();
  }

  save() {
    // debugger;
    this.editedBus.driver_id = this.selectedDriver.id;
    if (!this.editedBus.id)
      this.busService.save(
        {
          driver: this.selectedDriver.id,
          identification: this.editedBus.identification,
          model: this.editedBus.model,
          licencePlate: this.editedBus.licencePlate,
          seatNumbers: this.editedBus.seatNumbers,
          type: this.selectedType
        }
      )
        .subscribe(bus => {
          $.notify({
            title: '<strong>Operanción exitosa.</strong>',
            message: 'Se ha guardado correctamente el vehiculo ' + this.editedBus.identification,
          }, {
            type: 'success'
          });
          this.isDetailed = true;
        },
          errorResponse => {
            if (errorResponse.error.code == "bus_exists_error") {
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
      this.busService.update(
        {
          id: this.editedBus.id,
          driver: this.selectedDriver.id,
          identification: this.editedBus.identification,
          model: this.editedBus.model,
          licencePlate: this.editedBus.licencePlate,
          seatNumbers: this.editedBus.seatNumbers,
          type: this.editedBus.type
        })
        .subscribe(bus => {
          $.notify({
            title: '<strong>Operanción exitosa.</strong>',
            message: 'Se ha guardado correctamente el vehiculo ' + this.editedBus.identification,
          }, {
            type: 'success'
          });
          this.isDetailed = true
        },
          errorResponse => {
            if (errorResponse.error.code == "bus_exists_in_route_error") {
              $.notify({
                title: '<strong>Operanción erronea.</strong>',
                message: errorResponse.error.message
              }, {
                type: 'danger'
              })
            }
            if (errorResponse.error.code == "driver_exists_in_bus_error") {
              $.notify({
                title: '<strong>Operanción erronea.</strong>',
                message: errorResponse.error.message
              }, {
                type: 'danger'
              })
            }
          },
          
        )
  }
}