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
  isUnsubscribed: boolean = false;
  

  selectedUser: User;
  username: string ;

  updatedTableEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _modalService: NgbModal, private userService: USerService,private authorizationService: AuthorizationService) { }

  ngOnInit() {
  }

  deletelUser='';
  open(content: any, user: User) {
    this.deletelUser = this.username ;
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.unsubscribe(user);
    }, (reason) => {
      // Ver si se puede sacar esto
    });
  }
  onUnsubscribed(user: User) {
    this.open(this.content, user);
  }

  unsubscribe(user: User) {
    console.log(user)
    this.userService.unsubscribe(user)
      $.notify({
        title: '<strong>Operanción exitosa.</strong>',
        message: 'Se a desuscribto del Plan GOLD  ',
      }, {
        type: 'success'
      });
    }
}
