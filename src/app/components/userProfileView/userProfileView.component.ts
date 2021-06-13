import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AuthorizationService } from 'app/service/authorization.service';

import { User } from 'app/model/user.model';
import { USerService } from 'app/service/user.service';


declare var $: any;
@Component({
  selector: 'app-userProfileView',
  templateUrl: './userProfileView.component.html',
  styleUrls: ['./userProfileView.component.css']
})
export class UserProfileViewComponent {
  closeResult = '';
  deleteUser = '';
  @ViewChild('content') content: any;
  isEdited: boolean = false;
  isAdded: boolean = false;
  isDetailed: boolean = false;
  selectedUser: User;
  username: string ;

  updatedTableEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _modalService: NgbModal, private userService: USerService,private authorizationService: AuthorizationService) { }

  ngOnInit() {
   
  
  }


  updateTableData(event) {
    this.updatedTableEvent.emit()
  }

  onEdited(user: User) {
    this.isEdited = true;
    this.selectedUser = user;
  }

}
