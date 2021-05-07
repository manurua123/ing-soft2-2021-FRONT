import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { Driver } from 'app/model/driver.model';
import { DriverComponent } from '../driver.component';
import { DriverService } from 'app/service/driver.service';

declare var $: any;
@Component({
  selector: 'table-list-driver',
  templateUrl: './table-list-driver.component.html',
  styleUrls: ['./table-list-driver.component.css']
})
export class TableListDriverComponent implements OnInit {

  public length = 0;

  pageEvent: PageEvent;

  displayedColumns: string[] = ['fullName', 'email', 'phone', 'edit', 'delete', 'overview'];
  dataSource: any;

  @Output() deleted = new EventEmitter<Driver>();
  @Output() edited = new EventEmitter<Driver>();
  @Output() added = new EventEmitter<Driver>();
  @Output() detailed = new EventEmitter<Driver>();
  @Input() updateTableEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _modalService: NgbModal, private driverService: DriverService) { }

  ngOnInit() {
    this.updateTableEvent.subscribe(result => this.updateTable());
    this.updateTable();
  }

  updateTable() {
    this.driverService.getDriver('http://localhost:8000/api/driver/').subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource<Driver>(responseBody.results)
        this.length = responseBody.count;
      }
    );
  }

  public getServerData(event?: PageEvent) {
    const url = 'http://localhost:8000/api/driver/?page=' + (event.pageIndex + 1);
    this.driverService.getDriver(url).subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource<Driver>(responseBody.results)
        this.length = responseBody.count;
      }
    );
    return event;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  edit(driver: Driver) {
    this.edited.emit(driver)
  }

  detail(driver: Driver) {
    this.detailed.emit(driver)
  }

  add() {
    this.added.emit();
  }

  delete(driver) {
    this.deleted.emit(driver);
  }
}
