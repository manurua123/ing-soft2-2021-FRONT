
import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { Travel } from 'app/model/travel.model';
import { Ticket } from 'app/model/ticket.model';
import { UserTravelViewComponent } from '../userTravelView.component';
import { TravelService } from 'app/service/travel.service';
import { AuthorizationService } from 'app/service/authorization.service';


declare var $: any;
@Component({
  selector: 'table-list-userTravelView',
  templateUrl: './table-list-userTravelView.component.html',
  styleUrls: ['./table-list-userTravelView.component.css']
})
export class TableListUserTravelViewComponent implements OnInit {

  public length = 0;

  pageEvent: PageEvent;

  displayedColumns: string[] = ['departure_date','departure_time', 'arrival_date',  'arrival_time', 'origin', 'destination','type_bus' ,'ticket', 'state', 'delete',];
  dataSource: any;
  TravelSource: any
  userID: string;
  selectTravel: Travel;

  @Output() deleted = new EventEmitter<Ticket>();
  @Output() edited = new EventEmitter<Travel>();
  @Output() added = new EventEmitter<Travel>();
  @Output() detailed = new EventEmitter<Travel>();
  @Input() updateTableEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _modalService: NgbModal, private travelService: TravelService, private authorizationService: AuthorizationService) { }

  ngOnInit() {
    
    this.authorizationService.getUserLogged().subscribe(userAccount => {
      this.userID = userAccount.id
    });
    this.authorizationService.updateUserLogged();
    this.updateTableEvent.subscribe(result => this.updateTable());
    this.updateTable();
  }

  updateTable() {
  
    this.travelService.get_my_travels(this.userID).subscribe(
      responseBody => {
        this.dataSource = responseBody;
        console.log(this.dataSource)
        
        })
      
      

    }


  delete(ticket) {
    this.deleted.emit(ticket);
  }
}



