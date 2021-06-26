import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Travel } from 'app/model/travel.model';
import { TravelService } from 'app/service/travel.service';
import { AuthorizationService } from 'app/service/authorization.service';

declare var $: any;
@Component({
  selector: 'app-travelReport',
  templateUrl: './travelReport.component.html',
  styleUrls: ['./travelReport.component.css']
})
export class TravelReportComponent implements OnInit {
  closeResult = '';
  deleteTravel = 0;
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
      });
    this.authorizationService.updateUserLogged();
  }

  

  

  updateTableData(event) {
    this.updatedTableEvent.emit()
  }
  onEdited(travel: Travel) {
    this.isEdited = true;
    this.selectedTravel = travel;
  }

 
}
