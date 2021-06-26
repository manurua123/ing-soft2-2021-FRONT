import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { Comment } from 'app/model/comment.model';
import { CommentComponent } from '../comment.component';
import { CommentService } from 'app/service/comment.service';
import { USerService } from 'app/service/user.service';


import { AuthorizationService } from 'app/service/authorization.service';
declare var $: any;
@Component({
  selector: 'table-list-comment',
  templateUrl: './table-list-comment.component.html',
  styleUrls: ['./table-list-comment.component.css']
})
export class TableListCommentComponent implements OnInit {

  public length = 0;

  pageEvent: PageEvent;

  displayedColumns: string[] = ['comment'];
  dataSource: any;

  @Output() deleted = new EventEmitter<Comment>();
  @Output() edited = new EventEmitter<Comment>();
  @Output() added = new EventEmitter<Comment>();
  @Output() detailed = new EventEmitter<Comment>();
  @Input() updateTableEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  //enviar comentarios

  editedComent: Comment;
  userID: number;
  userRol: string;
  comentText: string;
  user_first_name: string;
  user_last_name: string;

  constructor(private _modalService: NgbModal, private userService: USerService,private commentService: CommentService, private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.updateTableEvent.subscribe(result => this.updateTable());
    this.updateTable();
    this.authorizationService.getUserLogged().subscribe(userAccount => {
        this.userID = userAccount.id,
        this.userRol = userAccount.rol
        this.userService.view_profile(userAccount.username).subscribe(u=>{
          this.user_last_name = u['user'].last_name;
          this.user_first_name = u['user'].first_name;
        })
    });


    this.authorizationService.updateUserLogged();
    if (!this.editedComent) {
      this.editedComent =
      {
        id: undefined,
        text: '',
        user: -1,
        date: undefined,
        user_first_name: undefined,
        user_last_name:undefined,
      }
    }
  }
  updateTable() {
    this.commentService.getAllComment().subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource<Comment>(responseBody)
      }
    );
  }

  
  edit(comment: Comment) {
    this.editedComent.id = comment.id
    this.editedComent.text = comment.text
    this.editedComent.user = comment.user

  }

  detail(comment: Comment) {
    this.detailed.emit(comment)
  }

  save() {
    console.log(this.user_first_name,this.user_last_name,)
    this.commentService.save(
      {
        text: this.editedComent.text,
        user: this.userID,
        user_first_name: this.user_first_name,
        user_last_name: this.user_last_name,
      }
    )
      .subscribe(driver => {
        $.notify({
          title: '<strong>Operanción exitosa.</strong>',
          message: '¡Gracias por dejarnos tu comentario! ',
        }, {
          type: 'success'
        });
        this.editedComent.text=""
        this.ngOnInit()
      },
        errorResponse => {
          if (errorResponse.error.code == "not_ticket_error") {
            $.notify({
              title: '<strong>Operanción erronea.</strong>',
              message: errorResponse.error.message
            }, {
              type: 'danger'
            })
          };
          this.editedComent.text=""
        })
  }




  update() {
   
    this.commentService.update(
      {
        id: this.editedComent.id,
        text: this.editedComent.text,
        user: this.userID,
        user_first_name: this.user_first_name,
        user_last_name: this.user_last_name,
        
      }
    )
      .subscribe(driver => {
        $.notify({
          title: '<strong>Operanción exitosa.</strong>',
          message: '¡Gracias por dejarnos tu comentario! ',
        }, {
          type: 'success'
        });
        this.editedComent.text=""
        this.ngOnInit()
      },
        errorResponse => {
          if (errorResponse.error.code == "not_ticket_error") {
            $.notify({
              title: '<strong>Operanción erronea.</strong>',
              message: errorResponse.error.message
            }, {
              type: 'danger'
            })
          };
          this.editedComent.text=""
        })
  }

  add() {
  
    //CREAR NUEVO
    if (!this.editedComent.id)
      this.save()
    else {
      this.update()
    }
    this.updateTable(); 
  }

  delete(comment) {
    this.deleted.emit(comment);
  }
}
