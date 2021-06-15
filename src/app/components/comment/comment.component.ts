import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AuthorizationService } from 'app/service/authorization.service';

import { Comment } from 'app/model/comment.model';
import { CommentService } from 'app/service/comment.service';


declare var $: any;
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  closeResult = '';
  deleteComment = '';
  @ViewChild('content') content: any;
  isEdited: boolean = false;
  isAdded: boolean = false;
  isDetailed: boolean = false;
  selectedComment: Comment;
  userID: number = -10;

  updatedTableEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _modalService: NgbModal, private commentService: CommentService,private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.authorizationService.getUserLogged().subscribe(userAccount=> 
      {
      this.userID = userAccount.id
      });
    this.authorizationService.updateUserLogged();
  }

  open(content: any, comment: Comment) {
    this.deleteComment = comment.date + ', ' + comment.user;
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.delete(comment);
    }, (reason) => {
      // Ver si se puede sacar esto
    });
  }

  delete(comment: Comment) {
    this.commentService.delete(comment).subscribe(response => {
      $.notify({
        title: '<strong>Operanción exitosa.</strong>',
        message: 'Se ha eliminado correctamente el comentario ' 
      }, {
        type: 'success'
      });
      this.updatedTableEvent.emit()
    },
    errorResponse => {
      if (errorResponse.error.code == "comment_exists_in_bus_error") {
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
  onEdited(comment: Comment) {
    this.isEdited = true;
    this.selectedComment = comment;
  }

  onDeleted(comment: Comment) {
    this.open(this.content, comment);
  }

  onDetailed(comment: Comment) {
    this.selectedComment = comment;
    this.isDetailed = true;
  }

  onClose(event: any) {
    this.isDetailed = false;
    this.isEdited = false;
    this.isAdded = false;
  }

  onAdded() {
    this.selectedComment = null;
    this.isAdded = true;
  }
}
