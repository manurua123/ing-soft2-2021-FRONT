import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Travel } from 'app/model/travel.model';
import { Ticket } from 'app/model/ticket.model';
import { TravelService } from 'app/service/travel.service';
import { AuthorizationService } from 'app/service/authorization.service';

declare var $: any;
@Component({
  selector: 'app-userTravelView',
  templateUrl: './userTravelView.component.html',
  styleUrls: ['./userTravelView.component.css']
})
export class UserTravelViewComponent implements OnInit {
  closeResult = '';
  deleteTicket = 0;
  @ViewChild('content') content: any;
  isEdited: boolean = false;
  isAdded: boolean = false;
  isDetailed: boolean = false;
  selectedTravel: Travel;
  userRole: string ='';
  userId : number;

  updatedTableEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _modalService: NgbModal, private travelService: TravelService, private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.authorizationService.getUserLogged().subscribe(userAccount=> 
      {
      this.userId = userAccount.id
      });
    this.authorizationService.updateUserLogged();
  }

  open(content: any, ticket: Ticket) {
   
    this.deleteTicket = ticket.id;
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
   this.delete(ticket);
    }, (reason) => {
   
      });
   }
   onDeleted(ticket: Ticket) {
  
    this.open(this.content, ticket);
  }

  delete(ticket: Ticket) {
   
    this.travelService.returnTicket(ticket).subscribe(response => {
      $.notify({
        title: '<strong>Operanción exitosa.</strong>',
        message: response.message
      }, {
        delay:30000,
        type: 'success'
        
      });
      this.updatedTableEvent.emit()
    },
    errorResponse => {
      if (errorResponse.error.code == "ticket_return__error") {
        $.notify({
          title: '<strong>Operanción exitosa</strong>',
          message: errorResponse.error.message
        }, {
          type: 'danger'
        })
      }
      if (errorResponse.error.code == "ticket_no_exists__error") {
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



}
