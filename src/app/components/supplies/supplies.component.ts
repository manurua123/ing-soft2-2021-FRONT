import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AuthorizationService } from 'app/service/authorization.service';

import { Supplies, SuppliesData } from 'app/model/supplies.model';
import { SuppliesService } from 'app/service/supplies.service';

declare var $: any;
@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent {
  closeResult = '';
  deleteSupplies = '';
  @ViewChild('content') content: any;
  isEdited: boolean = false;
  isAdded: boolean = false;
  isDetailed: boolean = false;
  selectedSupplies: SuppliesData;
 public userRole: string;

  updatedTableEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _modalService: NgbModal, private suppliesService: SuppliesService, private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.authorizationService.getUserLogged().subscribe(userAccount=> 
      {
      this.userRole = userAccount.rol
      });
    this.authorizationService.updateUserLogged();
  }

  open(content: any, supplies: SuppliesData) {
    this.deleteSupplies = supplies.description ;
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.delete(supplies);
    }, (reason) => {
     
    });
  }

  delete(supplies: SuppliesData) {
    this.suppliesService.delete(supplies).subscribe(response => {
      $.notify({
        title: '<strong>Operanción exitosa.</strong>',
        message: 'Se ha eliminado correctamente el insumo ' + supplies.description,
      }, {
        type: 'success'
      });
      this.updatedTableEvent.emit()
    });
  }

  updateTableData(event) {
    this.updatedTableEvent.emit()
  }
  onEdited(supplies: SuppliesData) {
    this.isEdited = true;
    this.selectedSupplies = supplies;
  }

  onDeleted(supplies: SuppliesData) {
    this.open(this.content, supplies);
  }

  onDetailed(supplies: SuppliesData) {
    this.selectedSupplies = supplies;
    this.isDetailed = true;
  }

  onClose(event: any) {
    this.isDetailed = false;
    this.isEdited = false;
    this.isAdded = false;
  }

  onAdded() {
    this.selectedSupplies = null;
    this.isAdded = true;
  }
}
