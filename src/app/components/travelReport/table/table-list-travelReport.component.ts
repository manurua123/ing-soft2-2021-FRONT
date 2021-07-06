
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { MatSort } from '@angular/material/sort';
import { TravelService } from 'app/service/travel.service';
import * as XLSX from 'xlsx';
import { FormGroup, FormControl } from '@angular/forms';
import { DriverService } from 'app/service/driver.service';
import { Driver } from 'app/model/driver.model';
import { Place } from 'app/model/place.model';
import { PlaceService } from 'app/service/place.service';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var $: any;


@Component({
  selector: 'table-list-travelReport',
  templateUrl: './table-list-travelReport.component.html',
  styleUrls: ['./table-list-travelReport.component.css']
})

export class TableListTravelReportComponent implements OnInit {
  @Input() selectedDriver: Driver;
  @Input() selectedOrigen: Place;
  @Input() selectedDestination: Place;
  @Input() originDatasource: Place[];
  @Input() destinationDatasource: Place[];
  @Input() driverDatasource: Driver[];


  public length = 0;
  dataSource: any;
  pageEvent: PageEvent;

  displayedColumns: string[] = [
    'driver_name',
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
    'bus_id',
    'type_bus',

  ];
  departure_range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  arrival_range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  filterDriver = false;
  filterOrigine = false;
  filterDestination = false;
  filterDepartureDate = false;
  filterArrivalDate = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private placeService: PlaceService, private driverService: DriverService, private _modalService: NgbModal, private travelService: TravelService) { }

  ngOnInit() {

    this.updateTable();
    this.driverService.getAllDriver().subscribe((driverList: Driver[]) => {
      this.driverDatasource = driverList;

    });
    this.placeService.getAllPlace().subscribe((listPlace: Place[]) => {
      this.originDatasource = listPlace;
      this.destinationDatasource = listPlace;
    });

    this.filterDriver = false;
    this.filterOrigine = false;
    this.filterDestination = false;
    this.filterDepartureDate = false;
    this.filterArrivalDate = false;
    this.selectedDriver = undefined;
    this.selectedOrigen = undefined;
    this.selectedDestination= undefined;

  }

  updateTable() {
    this.travelService.getTravel('http://localhost:8000/api/travel/').subscribe(
      responseBody => {
        this.dataSource = (responseBody.results)
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



  fechaToString(unaFecha) {
    return (moment(unaFecha._d).format("YYYY-MM-DD"))
  }

  filtrarDatos() {
    debugger;
    if (this.selectedDriver) {
      this.dataSource = this.dataSource.filter(e => e.driver_name === (this.selectedDriver.lastName + ", " + this.selectedDriver.firstName))
      this.filterDriver = true;
    }
    if (this.selectedOrigen) {
      this.dataSource = this.dataSource.filter(e => e.origin === this.selectedOrigen.place);
      this.filterOrigine = true;
    }
    if (this.selectedDestination) {
      this.dataSource = this.dataSource.filter(e => e.origin === this.selectedDestination.place);
      this.filterDestination = true;
    }
    if (this.departure_range.value.start && this.departure_range.value.end) {
      this.dataSource = this.dataSource.filter(e =>
        moment(e.departure_date).isSameOrAfter(moment(this.departure_range.value.start))
        && moment(e.departure_date).isSameOrBefore(moment(this.departure_range.value.end)))
      this.filterDepartureDate = true;
    }
    if (this.arrival_range.value.start && this.arrival_range.value.end) {
      this.dataSource = this.dataSource.filter(e =>
        moment(e.arrival_date).isSameOrAfter(moment(this.arrival_range.value.start))
        && moment(e.arrival_date).isSameOrBefore(moment(this.arrival_range.value.end)))
      this.filterArrivalDate = true;
    }
  }

  limpiarFiltro() {
    this.arrival_range.reset();
    this.departure_range.reset()
    this.ngOnInit()

  }



  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  title = 'Excel';
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Viajes-Combi19.xlsx');
  }
  calcularPorcentaje(vendidos: number, totales: number) {
    var valor = vendidos / totales * 100
    return (this.trunc(valor, 2))
  }
  trunc(x, posiciones = 0) {
    var s = x.toString()
    var l = s.length
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
  }
}
