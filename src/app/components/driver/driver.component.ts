import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { Driver } from 'app/model/driver.model';
import { DriverService } from 'app/service/driver.service';


declare var $: any;
@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent {
  closeResult = '';
  deleteDriver = '';
  @ViewChild('content') content: any;
  isEdited: boolean = false;
  isAdded: boolean = false;
  isDetailed: boolean = false;
  selectedDriver: Driver;

  updatedTableEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _modalService: NgbModal, private driverService: DriverService) { }

  open(content: any, driver: Driver) {
    this.deleteDriver = driver.firstName + ', ' + driver.lastName;
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.delete(driver);
    }, (reason) => {
      // Ver si se puede sacar esto
    });
  }

  delete(driver: Driver) {
    this.driverService.delete(driver).subscribe(response => {
      $.notify({
        title: '<strong>Operanción exitosa.</strong>',
        message: 'Se ha eliminado correctamente el conductor: ' + driver.firstName + ', ' + driver.lastName
      }, {
        type: 'success'
      });
      this.updatedTableEvent.emit()
    },
    errorResponse => {
      if (errorResponse.error.code == "driver_exists_in_bus_error") {
        $.notify({
          title: '<strong>Operanción erronea.</strong>',
          message: errorResponse.error.message
        }, {
          type: 'danger'
        })
      }
    }
    );
  }

  updateTableData(event) {
    this.updatedTableEvent.emit()
  }
  onEdited(driver: Driver) {
    this.isEdited = true;
    this.selectedDriver = driver;
  }

  onDeleted(driver: Driver) {
    this.open(this.content, driver);
  }

  onDetailed(driver: Driver) {
    this.selectedDriver = driver;
    this.isDetailed = true;
  }

  onClose(event: any) {
    this.isDetailed = false;
    this.isEdited = false;
    this.isAdded = false;
  }

  onAdded() {
    this.selectedDriver = null;
    this.isAdded = true;
  }
}
