import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NextTravelData } from '../../model/travel.model';
import { AuthorizationService } from '../../service/authorization.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TravelService } from 'app/service/travel.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare var $: any;


@Component({
  selector: 'completed-travel',
  templateUrl: './completed-travel.component.html',
  styleUrls: ['./completed-travel.component.css']
})

export class CompletedTravelComponent implements OnInit, OnDestroy{

  dataSource: any;
  displayedColumns: string[] = [ 'origin','departure_date','departure_time', 'destination','arrival_date','arrival_time', 'bus'];
  destroy$: Subject<any> = new Subject();
  
  
  constructor(private travelService: TravelService, private authorizationService: AuthorizationService, private route: Router, private _modalService: NgbModal,) { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.authorizationService.getUserLogged().pipe(takeUntil(this.destroy$)).subscribe(userAccount => {
      this.travelService.completedTravel(userAccount.id).pipe(takeUntil(this.destroy$)).subscribe((completedTravelList: NextTravelData[]) =>
        
        this.dataSource = completedTravelList
      ,
      errorResponse => {
        if (errorResponse.error.code == "travel_no_exists_error") {
          $.notify({
            title: '<strong>Sin viajes realizados.</strong>',
            message: errorResponse.error.message
          }, {
            type: 'warning'
          })
        };
      }
      )}
    );
    this.authorizationService.updateUserLogged();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
 }
}