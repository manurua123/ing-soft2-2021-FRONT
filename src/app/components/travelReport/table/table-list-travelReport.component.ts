import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { MatSort } from '@angular/material/sort';
import { Travel, TravelTicketData } from 'app/model/travel.model';
import { TravelService } from 'app/service/travel.service';
import * as XLSX from 'xlsx';
import { MatTableFilter } from 'mat-table-filter';



export class travelData {
    id: number;
    origin: string;
    destination: string;
    departure_date: string;
    departure_time: string;
    arrival_date: string;
    arrival_time: string;
    price: number;
    available_seats: number;
    delete: boolean;
    duration:string;
    state:string;
    type_bus:string;
    bus_id: string;
    ticket_sold:number;
    driver_name:string;
    route: number;
}

declare var $: any;
@Component({
  selector: 'table-list-travelReport',
  templateUrl: './table-list-travelReport.component.html',
  styleUrls: ['./table-list-travelReport.component.css']
})

export class TableListTravelReportComponent implements OnInit {

  public length = 0;




  dataSource: any;
  pageEvent: PageEvent;
 
  filterEntity: travelData;
  filterType: MatTableFilter;

  displayedColumns: string[] = [
    'id',
    'state',
    'departure_date',
    'arrival_date',
    'origin',
    'destination',
    'departure_time',
    'arrival_time',
    'duration',
    'price',
    'available_seats',
    'ticket_sold',
    'occupation',
    'ingresos',
    'bus_id',
    'type_bus',
    'driver_name',
  ];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private _modalService: NgbModal, private travelService: TravelService) {}

  ngOnInit() {
    this.filterEntity = {
        id :undefined,
        origin: undefined,
        destination: undefined,
        departure_date: undefined,
        departure_time: undefined,
        arrival_date: undefined,
        arrival_time: undefined,
        price: undefined,
        available_seats: undefined,
        duration:undefined,
        state:undefined,
        delete: undefined,
        type_bus:undefined,
        bus_id: undefined,
        ticket_sold:undefined,
        driver_name:undefined,
        route: undefined,
    
    };
    this.filterType = MatTableFilter.ANYWHERE;
    this.updateTable();

  }

  
  
  updateTable() {
    this.travelService.getTravel('http://localhost:8000/api/travel/').subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource<TravelTicketData>(responseBody.results)
        this.length = responseBody.count;
      }
    );
   
  }

  public getServerData(event?: PageEvent) {
    const url = 'http://localhost:8000/api/travel/?page=' + (event.pageIndex + 1);
    this.travelService.getTravel(url).subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource(responseBody.results)
        this.length = responseBody.count;
      }
    );
    return event;
  }
 

  limpiarFiltro(){
    this.filterEntity = {
      id :undefined,
      origin: undefined,
      destination: undefined,
      departure_date: undefined,
      departure_time: undefined,
      arrival_date: undefined,
      arrival_time: undefined,
      price: undefined,
      available_seats: undefined,
      duration:undefined,
      state:undefined,
      delete: undefined,
      type_bus:undefined,
      bus_id: undefined,
      ticket_sold:undefined,
      driver_name:undefined,
      route: undefined,
  }
}




//----------------------------------------------------------------------
@ViewChild(MatSort) sort: MatSort;
ngAfterViewInit() {
  this.dataSource.sort = this.sort;
}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
}
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  title = 'Excel';
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Viajes-Combi19.xlsx');
  }
  calcularPorcentaje(vendidos:number, totales:number){
    var valor = vendidos / totales *100
    return(this.trunc(valor,2))
  }
   trunc (x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
  }
}
