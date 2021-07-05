import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NextTravelData } from './../../model/travel.model';
import { AuthorizationService } from './../../service/authorization.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, Injectable, ViewChild, OnDestroy} from '@angular/core';
import { TravelService } from 'app/service/travel.service';
import { Route, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'console';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


declare var $: any;


@Component({
  selector: 'next-travel',
  templateUrl: './next-travel.component.html',
  styleUrls: ['./next-travel.component.css']
})

export class NextTravelComponent implements OnInit, OnDestroy{
  @ViewChild('contentFinish') contentFinish: any;
  @ViewChild('content') content: any;
  @ViewChild('contentCancel') contentCancel: any;
  destroy$: Subject<any> = new Subject();

  dataSourceFirts: any;
  dataSourceNext: any;
  
  firstTravel: NextTravelData;
  displayedColumns: string[] = [ 'origin','departure_date','departure_time', 'destination','arrival_date','arrival_time', 'bus', 'ticket_sold',  'state','viewPassenger'];
  displayedNextsColumns: string[] = [ 'origin','departure_date','departure_time', 'destination','arrival_date','arrival_time', 'bus', 'ticket_sold',  'state', 'cancel'];
  subscription: Observable<any>;
  
  
  constructor(private travelService: TravelService, private authorizationService: AuthorizationService, private route: Router, private _modalService: NgbModal,) { 
    this.dataSourceFirts = new MatTableDataSource();
  }

  ngOnInit() {
    this.authorizationService.getUserLogged().pipe(takeUntil(this.destroy$)).subscribe(userAccount => {
      this.travelService.nextTravel(userAccount.id).pipe(takeUntil(this.destroy$)).subscribe((nextTravelList: NextTravelData[]) =>{
        this.dataSourceFirts = [nextTravelList[0]]
        this.firstTravel = nextTravelList[0];
        this.dataSourceNext =  nextTravelList.filter(travel => travel.id !== this.firstTravel.id)
      },
       error => {
        if (error.error.code == "travel_no_exists_today_error") {
          $.notify({
            title: '<strong>Sin próximos viajes.</strong>',
            message: error.error.message
          }, {
            type: 'warning'
          })
        };
        
      }
      
      )});
    this.authorizationService.updateUserLogged();
  }
  
  cancelTravel(){
    this._modalService.open(this.contentCancel, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.travelService.cancel(this.firstTravel.id).subscribe(response => {
      $.notify({
        title: '<strong>Viaje cancelado exitosamente.</strong>',
        message: 'El viaje se cancelo con éxito.'
      }, {
        type: 'success'
      });
      this.authorizationService.updateUserLogged();
    }, (reason) => {
      // Ver si se puede sacar esto
    });
    });
  
  }

  initTravel() {
    this._modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.travelService.init(this.firstTravel.id).subscribe(response => {
        $.notify({
          title: '<strong>Viaje iniciado exitosamente.</strong>',
          message: 'El viaje se inició con éxito'
        }, {
          type: 'success'
        });
        this.authorizationService.updateUserLogged();
      }, (reason) => {
        // Ver si se puede sacar esto
      });
      });
    
  }

  finishTravel() {
    
    this._modalService.open(this.contentFinish, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.travelService.finish(this.firstTravel.id).subscribe(response => {
      $.notify({
        title: '<strong>Viaje finalizado exitosamente.</strong>',
        message: 'El viaje se finalizo con éxito'
      }, {
        type: 'success'
      });
      this.authorizationService.updateUserLogged();
    }, (reason) => {
      // Ver si se puede sacar esto
    });
    });
  }

  viewPassenger(travel: NextTravelData) {
    this.route.navigate(['questionnaire']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
 }
 

}