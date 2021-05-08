import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { Place, PlaceData } from 'app/model/place.model';
import { PlaceService } from 'app/service/place.service';

declare var $: any;
@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent {
  closeResult = '';
  deletePlace = '';
  @ViewChild('content') content: any;
  isEdited: boolean = false;
  isAdded: boolean = false;
  isDetailed: boolean = false;
  selectedPlace: PlaceData;

  updatedTableEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _modalService: NgbModal, private placeService: PlaceService) { }

  open(content: any, place: PlaceData) {
    this.deletePlace = place.town + '-' + place.province;
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.delete(place);
    }, (reason) => {
      // Ver si se puede sacar esto
    });
  }

  delete( place: PlaceData) {
    this.placeService.delete(place).subscribe(response => {
      $.notify({
        title: '<strong>Operanción exitosa.</strong>',
        message: 'Se ha eliminado correctamente el destino ' + place.town + '-' + place.province,
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
  onEdited( place: PlaceData) {
    this.isEdited = true;
    this.selectedPlace = place;
  }

  onDeleted(place: PlaceData) {
    this.open(this.content, place);
  }

  onDetailed( place: PlaceData) {
    this.selectedPlace = place;
    this.isDetailed = true;
  }

  onClose(event: any) {
    this.isDetailed = false;
    this.isEdited = false;
    this.isAdded = false;
  }

  onAdded() {
    this.selectedPlace = null;
    this.isAdded = true;
  }
}
