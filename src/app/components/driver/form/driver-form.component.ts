import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { Driver } from 'app/model/driver.model';

import { DriverService } from 'app/service/driver.service';

declare var $: any;

@Component({
  selector: 'driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})

export class DriverFormComponent implements OnInit {

  @Output()
  closeFormEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  updateTableEvent = new EventEmitter<Driver>();

  @Input()
  editedDriver: Driver;

  @Input()
  isDetailed: boolean;


  firstName: string;
  lastName: string;
  email: string;
  phone: number;


  constructor(private driverService: DriverService) { }


  ngOnInit() {
    if (!this.editedDriver) {
      this.editedDriver =
      {
        id: undefined,
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        phone: undefined,
      }
    }
  }

  close() {
    this.closeFormEvent.emit();
  }

  save() {
    if (!this.editedDriver.id)
      this.driverService.save(
        {
          firstName: this.editedDriver.firstName,
          lastName: this.editedDriver.lastName,
          email: this.editedDriver.email,
          phone: this.editedDriver.phone,
        }
      )
        .subscribe(driver => {
          $.notify({
            title: '<strong>Operanción exitosa.</strong>',
            message: 'Se ha guardado correctamente el chofer ' + this.editedDriver.firstName + ', ' + this.editedDriver.lastName,
          }, {
            type: 'success'
          });
          this.isDetailed = true;
        },
          errorResponse => {
            if (errorResponse.error.code == "driver_exists_error") {
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
      this.driverService.update(
        {
          id: this.editedDriver.id,
          firstName: this.editedDriver.firstName,
          lastName: this.editedDriver.lastName,
          email: this.editedDriver.email,
          phone: this.editedDriver.phone,
        })
        .subscribe(driver => {
          $.notify({
            title: '<strong>Operanción exitosa.</strong>',
            message: 'Se ha guardado correctamente el chofer ' + this.editedDriver.firstName + ',' + this.editedDriver.lastName
          }, {
            type: 'success'
          });
          this.isDetailed = true
        },
          errorResponse => {
            if (errorResponse.error.code == "Driver_update_already_exists") {
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