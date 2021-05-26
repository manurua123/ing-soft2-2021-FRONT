import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Travel } from 'app/model/travel.model';
import { TravelService } from 'app/service/travel.service';
import { AuthorizationService } from 'app/service/authorization.service';

declare var $: any;
@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {
  closeResult = '';
  deleteTravel = '';
  @ViewChild('content') content: any;
  isEdited: boolean = false;
  isAdded: boolean = false;
  isDetailed: boolean = false;
  selectedTravel: Travel;
  userRole: string ='';

  updatedTableEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _modalService: NgbModal, private travelService: TravelService, private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.authorizationService.getUserLogged().subscribe(userAccount=> 
      {
      this.userRole = userAccount.rol
      console.log('Viajes');
      });
    this.authorizationService.updateUserLogged();
  }

  open(content: any, travel: Travel) {
    this.deleteTravel = travel.origin + '-' + travel.destination;
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.delete(travel);
    }, (reason) => {
      // Ver si se puede sacar esto
    });
  }

  delete(travel: Travel) {
    this.travelService.delete(travel).subscribe(response => {
      $.notify({
        title: '<strong>Operanción exitosa.</strong>',
        message: 'Se ha eliminado correctamente el viaje : <br/>' + travel.origin + '-' + travel.destination
      }, {
        type: 'success'
      });
      this.updatedTableEvent.emit()
    },
    errorResponse => {
      if (errorResponse.error.code == "travel_exists_in_ticket_error") {
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
  onEdited(travel: Travel) {
    this.isEdited = true;
    this.selectedTravel = travel;
  }

  onDeleted(travel: Travel) {
    this.open(this.content, travel);
  }

  onDetailed(travel: Travel) {
    this.selectedTravel = travel;
    this.isDetailed = true;
  }

  onClose(event: any) {
    this.isDetailed = false;
    this.isEdited = false;
    this.isAdded = false;
  }

  onAdded() {
    this.selectedTravel = null;
    this.isAdded = true;
  }
}
