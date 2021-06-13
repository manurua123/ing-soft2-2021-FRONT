import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, Injectable, ViewChild} from '@angular/core';
import { Time } from "@angular/common"
import { Travel, TravelData, TravelTicketData } from 'app/model/travel.model';
import * as moment from 'moment';
import { RouteService } from 'app/service/route.service';
import { TravelService } from 'app/service/travel.service';
import { Route } from 'app/model/route.model';
import { ThemePalette } from '@angular/material/core';
import {DateAdapter, NativeDateAdapter,MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgxMatDateAdapter, NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { NgxMatMomentAdapter, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { Place } from 'app/model/place.model';
import { PlaceService } from 'app/service/place.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthorizationService } from 'app/service/authorization.service';
import { Router } from '@angular/router';
declare var $: any;


@Component({
  selector: 'user-profile-change-password',
  templateUrl: './user-profile-change-password.component.html',
  styleUrls: ['./user-profile-change-password.component.css']
})

export class UserProfileChangePasswordComponent {

  chagePasswordFormGroup: FormGroup;
  userId: number;
  
  constructor(private placeService: PlaceService, private travelService: TravelService, private _formBuilder: FormBuilder, private authorizationService: AuthorizationService, private router: Router) { 
  }

  ngOnInit() {
    this.authorizationService.getUserLogged().subscribe(user => { 
      
      this.userId = user.id
     } 
  );

this.authorizationService.updateUserLogged();

    this.chagePasswordFormGroup = this._formBuilder.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      retryNewPassword: ['', [Validators.required]],
    });
  }

  save() {
    
    if (this.chagePasswordFormGroup.controls['password'].value === 'incorrecta') {
        $.notify({
          title: '<strong>Contraseña incorrecta.</strong>',
          message: 'La contraseña actual es incorrecta'
        }, {
          type: 'danger'
        })
        return; 
    }
   
    if (this.chagePasswordFormGroup.controls['newPassword'].value != this.chagePasswordFormGroup.controls['retryNewPassword'].value) {
      $.notify({
        title: '<strong>Contraseña incorrecta.</strong>',
        message: 'La nueva contraseña no coincide'
      }, {
        type: 'danger'
      })
      return;
    }

    this.authorizationService.changePassword(this.userId, this.chagePasswordFormGroup.controls['newPassword'].value)
    .subscribe (response => 
      $.notify({
        title: '<strong>Operanción exitosa.</strong>',
        message: response.message + '. Deberá volver a iniciar sesión'
      }, {
        type: 'success'
      }));
      this.authorizationService.saveUserData('','','',false);
      this.authorizationService.updateUserLogged();
      this.router.navigate(['']);  
  }

}