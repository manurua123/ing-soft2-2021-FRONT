import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { Bus } from 'app/model/bus.model';
import { BusService } from 'app/service/bus.service';

declare var $: any;
@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent {
  closeResult = '';
  deleteBus = '';
  @ViewChild('content') content: any;
  isEdited: boolean = false;
  isAdded: boolean = false;
  isDetailed: boolean = false;
  selectedBus: Bus;

  updatedTableEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _modalService: NgbModal, private busService: BusService) { }

  open(content: any, bus: Bus) {
    this.deleteBus = bus.identification;
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.delete(bus);
    }, (reason) => {
      // Ver si se puede sacar esto
    });
  }

  delete(bus: Bus) {
    this.busService.delete(bus).subscribe(response => {
      $.notify({
        title: '<strong>Operanción exitosa.</strong>',
        message: 'Se ha eliminado correctamente el vehiculo' + bus.identification
      }, {
        type: 'success'
      });
      this.updatedTableEvent.emit()
    }
    );

  }

  updateTableData(event) {
    this.updatedTableEvent.emit()
  }
  onEdited(bus: Bus) {
    this.isEdited = true;
    this.selectedBus = bus;
  }

  onDeleted(bus: Bus) {
    this.open(this.content, bus);
  }

  onDetailed(bus: Bus) {
    this.selectedBus = bus;
    this.isDetailed = true;
  }

  onClose(event: any) {
    this.isDetailed = false;
    this.isEdited = false;
    this.isAdded = false;
  }

  onAdded() {
    this.selectedBus = null;
    this.isAdded = true;
  }
}