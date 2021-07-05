import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NextTravelData } from '../../model/travel.model';
import { AuthorizationService } from '../../service/authorization.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TravelService } from 'app/service/travel.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare var $: any;


@Component({
  selector: 'pending-travel',
  templateUrl: './pending-travel.component.html',
  styleUrls: ['./pending-travel.component.css']
})

export class PendingTravelComponent implements OnInit, OnDestroy{

  dataSource: any;
  displayedColumns: string[] = [ 'origin','departure_date','departure_time', 'destination','arrival_date','arrival_time', 'bus', 'cancel'];
  destroy$: Subject<any> = new Subject();
  @ViewChild('contentCancel') contentCancel: any;
  
  constructor(private travelService: TravelService, private _modalService: NgbModal) { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.dataSource = [];
    this.travelService.get_all_travel_pending().pipe(takeUntil(this.destroy$)).subscribe((completedTravelList: NextTravelData[]) =>
        
        this.dataSource = completedTravelList
      ,
      errorResponse => {
        if (errorResponse.error.code == "travel_no_exists_pending_error") {
          $.notify({
            title: '<strong>Sin viajes pendientes.</strong>',
            message: errorResponse.error.message
          }, {
            type: 'warning'
          })
        };
      })
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
 }

 cancelTravel(travel: NextTravelData) {
  this._modalService.open(this.contentCancel, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.travelService.cancel(travel.id).subscribe(response => {
    $.notify({
      title: '<strong>Viaje cancelado exitosamente.</strong>',
      message: 'El viaje se cancelo con éxito.'
    }, {
      type: 'success'
    });
  }, (reason) => {
    // Ver si se puede sacar esto
  });
  this.ngOnInit();  
});

}

}