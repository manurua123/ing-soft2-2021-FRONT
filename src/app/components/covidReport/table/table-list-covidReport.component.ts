import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { TicketService } from 'app/service/ticket.service';
import * as XLSX from 'xlsx';
import { TicketRejected } from 'app/model/ticket.model';
import * as moment from 'moment';





declare var $: any;
@Component({
  selector: 'table-list-travelReport',
  templateUrl: './table-list-covidReport.component.html',
  styleUrls: ['./table-list-covidReport.component.css']
})

export class TableListCovidReportComponent implements OnInit {

  public length = 0;
  dataSource: any;
  pageEvent: PageEvent;
  filtrado = false;
  displayedColumns: string[] = [
    'departure_date',
    'arrival_date',
    'origin',
    'destination',
    'departure_time',
    'arrival_time',
    'username',
    'fullName',
    'start_date_suspension',
    'end_date_suspension',
  ];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.ticketService.get_ticket_rejected('http://localhost:8000/api/ticket/get_ticket_rejected/').subscribe(
      responseBody => {
        this.dataSource = (responseBody),
        errorResponse => {
        if (errorResponse.error.code === "ticjets_no_exists_error") {
          $.notify({
            title: '<strong>No existen pasajeros riesgoso</strong>',
            message: errorResponse.error.message
          }, {
            type: 'warning'
          })
        };
      };
      })

  }

  updateTable() {
    this.ticketService.get_ticket_rejected('http://localhost:8000/api/ticket/get_ticket_rejected/').subscribe(
      responseBody => {
        this.dataSource = (responseBody),
        errorResponse => {
        if (errorResponse.error.code == "ticjets_no_exists_error") {
          $.notify({
            title: '<strong>No existen pasajeros riesgoso</strong>',
            message: errorResponse.error.message
          }, {
            type: 'warning'
          })
        };
      };
      })
    }
  
  

  end_date_suspension(date: string) {
    return moment(date).add(15, 'days').format('DD/MM/YYYY')
  }
  changeFormat(date: string) {
    return moment(date).format('DD/MM/YYYY')
  }

  filtrarDatos() {
    this.filtrado = true;
    var hoy = moment();
    var datos = [];
    for (let i of this.dataSource) {
      if ((moment(i['travel'].arrival_date).month() ) === (hoy.month()))

        datos.push(i)
    }
    this.dataSource = datos

  }
  eliminarFiltro() {
    this.filtrado = false;
    this.updateTable();
  }


  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  title = 'Excel';
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'PasajerosRiesgosos-Combi19.xlsx');
  }

}