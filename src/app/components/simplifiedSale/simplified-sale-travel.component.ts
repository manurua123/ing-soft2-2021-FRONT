import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NextTravelData } from './../../model/travel.model';
import { AuthorizationService } from './../../service/authorization.service';
import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { TravelService } from 'app/service/travel.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TicketService } from 'app/service/ticket.service';


declare var $: any;


@Component({
  selector: 'simplified-sale-travel',
  templateUrl: './simplified-sale-travel.component.html',
  styleUrls: ['./simplified-sale-travel.component.css']
})

export class SimplifiedSaleComponent implements OnInit, OnDestroy{
  @ViewChild('contentSale') contentSale: any;
  
  destroy$: Subject<any> = new Subject();
  public email: string;
  public dataSource: any;
   
  public currentTravel: NextTravelData;
  displayedColumns: string[] = [ 'origin','departure_date','departure_time', 'destination','arrival_date','arrival_time', 'bus', 'ticket_sold', 'travel_price' , 'state'];
  
  
  constructor(private travelService: TravelService, private ticketService: TicketService, private authorizationService: AuthorizationService, private route: Router, private _modalService: NgbModal,) { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.authorizationService.getUserLogged().pipe(takeUntil(this.destroy$)).subscribe(userAccount => {
      this.travelService.nextTravel(userAccount.id).pipe(takeUntil(this.destroy$)).subscribe((nextTravelList: NextTravelData[]) =>{
        this.dataSource = [nextTravelList[0]];
        this.currentTravel = nextTravelList[0];
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
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
 }
 
 save() {
  
  this._modalService.open(this.contentSale, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.ticketService.simplifiedSale(this.email, this.currentTravel.id).subscribe(response => {
    this.email = '';
    $.notify({
      title: '<strong>Venta exitosa.</strong>',
      message: 'Se ha realizado la venta exitosamente.'
    }, {
      type: 'success'
    });
      }, (reason) => {
    // Ver si se puede sacar esto
  });
  this.ngOnInit()});
 }

}