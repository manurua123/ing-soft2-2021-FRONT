import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { User } from 'app/model/user.model';

import { USerService } from 'app/service/user.service';
import { AuthorizationService } from 'app/service/authorization.service';
declare var $: any;
import { DialogoConfirmacionComponent } from "../dialogo-confirmacion/dialogo-confirmacion.component";
import { MatDialog } from "@angular/material/dialog";
import {NavbarComponent} from "../../navbar/navbar.component"

@Component({
  selector: 'user-form',
  templateUrl: './userProfileView-form.component.html',
  styleUrls: ['./userProfileView-form.component.css']
})

export class UserProfileViewFormComponent implements OnInit {

  @Output()
  closeFormEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  updateTableEvent = new EventEmitter<User>();

  @Input()
  editedUser: User;

  @Input()
  isDetailed: boolean;

  @Output() unsubscribed = new EventEmitter<User>();

  constructor(private userService: USerService, private authorizationService: AuthorizationService, public dialogo: MatDialog) { }


  ngOnInit() {
    //evita un error en el HTML que no reconcer una cosa y no se que mierda
    this.editedUser = {
      username: undefined,
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      idCards: undefined,
      birth_date: undefined,
      phone: undefined,
      gold: undefined,
      month_exp: undefined,
      year_exp: undefined,
      security_code: undefined,
      card_holder: undefined,
      card_number: undefined,
      user_id: undefined,
    }
    this.isDetailed = false;
    this.authorizationService.getUserLogged().subscribe(userAccount => {
      if (userAccount.username != '') {
        this.userService.view_profile(userAccount.username).subscribe(u => {

          this.editedUser = {
            user_id: u.user_id,
            id: u.id,
            username: u['user'].username,
            firstname: u['user'].first_name,
            lastname: u['user'].last_name,
            email: u['user'].email,
            idCards: u.idCards,
            birth_date: u.birth_date,
            phone: u.phone,
            gold: u.gold,
            month_exp: u.month_exp,
            year_exp: u.year_exp,
            security_code: u.security_code,
            card_holder: u.card_holder,
            card_number: u.card_number,

          }
        }
        )
      }
    });
    this.authorizationService.updateUserLogged();
  }


  update() {
    if (this.getAge() < 18) {
      $.notify({
        title: '<strong>Operanción erronea.</strong>',
        message: 'No se puede registrar ya que es menor de 18 años.'
      }, {
        type: 'danger'
      })
      return
    }
    if (!this.checkDate() && this.editedUser.gold) {
      $.notify({
        title: '<strong>Atención</strong>',
        message: 'Las tarjeta esta vencida.'
      }, {
        type: 'warning'
      })
      return
    }


    //this.isDetailed = true;
    this.userService.update(
      {
        user_id: this.editedUser.user_id,
        id: this.editedUser.id,
        username: this.editedUser.username,
        firstname: this.editedUser.firstname,
        lastname: this.editedUser.lastname,
        email: this.editedUser.email,
        idCards: this.editedUser.idCards,
        birth_date: this.editedUser.birth_date,
        phone: this.editedUser.phone,
        card_holder: this.editedUser.card_holder,
        card_number: this.editedUser.card_number,
        month_exp: this.editedUser.month_exp,
        year_exp: this.editedUser.year_exp,
        security_code: this.editedUser.security_code,
      }
    ).subscribe(profile => {
      $.notify({
        title: '<strong>Operanción exitosa.</strong>',
        message: 'Usuario Actualizado',
      }, {
        type: 'success'
      });
      this.isDetailed = true
    },
      errorResponse => {
        {
          $.notify({
            title: '<strong>Operanción erronea.</strong>',
            message: "Error inesperado, contacte con el administrador"
          }, {
            type: 'danger'
          })
        }
      })
  }

  close() {
    this.closeFormEvent.emit();
  }

  checkDate() {
    const year_card_value: number = this.editedUser.year_exp;
    const current_year: number = 2021;
    const month_card_value: number = this.editedUser.month_exp;
    const current_month: number = 6;
    return year_card_value >= current_year && month_card_value >= current_month
  }

  getAge() {
    var today = new Date();
    var birth_date_to_calc = new Date(this.editedUser.birth_date);
    var age = today.getFullYear() - birth_date_to_calc.getFullYear();
    var m = today.getMonth() - birth_date_to_calc.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth_date_to_calc.getDate())) {
      age--;
    }
    return age;
  }

  unsubscribe() {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: '¿Esta seguro que desea cancelar su suscripcion GOLD?'
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.editedUser.gold = false;
          this.isDetailed = true;
          this.userService.unsubscribe(this.editedUser.user_id).subscribe(response => {
            $.notify({
              title: '<strong>Operanción exitosa.</strong>',
              message: 'Se ha eliminado correctamente el insumo ',
            }, {
              type: 'success'
            });

          });
          this.authorizationService.saveUserData( this.editedUser.username, 'CLIENT',this.editedUser.id, false,false);
          this.authorizationService.updateUserLogged();
        }
      })
     
  }
}

