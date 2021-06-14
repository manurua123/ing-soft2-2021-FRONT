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
declare var $: any;


@Component({
  selector: 'travel-search-form',
  templateUrl: './travel-search.component.html',
  styleUrls: ['./travel-search.component.css']
})

export class TravelSearchComponent {

  placeDatasource:Place[];
  selectedOrigen: Place;
  selectedDestination: Place;
  selectedDeparture: Date;
  dataSource: any;
  displayedColumns: string[] = [ 'origin','departure_date','departure_time', 'destination','arrival_date','arrival_time', 'price', 'available_seats', 'type'];
  searchFormGroup: FormGroup;
  
  
  constructor(private placeService: PlaceService, private travelService: TravelService, private _formBuilder: FormBuilder) { 

    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {

    this.searchFormGroup = this._formBuilder.group({
      departureDate: ['', [Validators.required]],
      selectedOrigen: ['', [Validators.required]],
      selectedDestination: ['', [Validators.required]],
    });
    
    this.placeService.getAllPlace().subscribe((listPlace: Place[]) => {
      this.placeDatasource = listPlace;
    });

  }

  resetForm() {
    this.searchFormGroup.reset();
    this.dataSource.data = [];
  }

  showTravel(){
      this.travelService.getAvailableTravel(this.selectedOrigen.id, this.selectedDestination.id, moment(this.selectedDeparture).format("YYYY-MM-DD")).subscribe(
       result => {
         this.dataSource = new MatTableDataSource<TravelTicketData>(result)
       },
           errorResponse => {
             if (errorResponse.error.code == "travel_no_exists__error") {
               $.notify({
                 title: '<strong>Antención.</strong>',
                 message: errorResponse.error.message
               }, {
                 type: 'warning'
               })
             }
           }
     );
   }
}