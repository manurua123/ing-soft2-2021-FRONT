import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { Bus } from 'app/model/bus.model';
import { BusComponent } from '../bus.component';
import { BusService } from 'app/service/bus.service';

declare var $: any;
@Component({
  selector: 'table-list-bus',
  templateUrl: './table-list-bus.component.html',
  styleUrls: ['./table-list-bus.component.css']
})
export class TableListBusComponent implements OnInit {

  public length = 0;

  pageEvent: PageEvent;

  displayedColumns: string[] = ['identification', 'model', 'seatNumbers', 'type', 'edit', 'delete', 'overview'];
  dataSource: any;

  @Output() deleted = new EventEmitter<Bus>();
  @Output() edited = new EventEmitter<Bus>();
  @Output() added = new EventEmitter<Bus>();
  @Output() detailed = new EventEmitter<Bus>();
  @Input() updateTableEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _modalService: NgbModal, private busService: BusService) { }

  ngOnInit() {
    this.updateTableEvent.subscribe(result => this.updateTable());
    this.updateTable();
  }

  updateTable() {
    this.busService.getBus('http://localhost:8000/api/bus/').subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource<Bus>(responseBody.results)
        this.length = responseBody.count;
      }
    );
  }

  public getServerData(event?: PageEvent) {
    const url = 'http://localhost:8000/api/bus/?page=' + (event.pageIndex + 1);
    this.busService.getBus(url).subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource<Bus>(responseBody.results)
        this.length = responseBody.count;
      }
    );
    return event;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  edit(bus: Bus) {
    this.edited.emit(bus)
  }

  detail(bus: Bus) {
    this.detailed.emit(bus)
  }

  add() {
    this.added.emit();
  }

  delete(bus) {
    this.deleted.emit(bus);
  }
}
