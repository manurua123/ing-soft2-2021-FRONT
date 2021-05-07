import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { Route } from 'app/model/route.model';
import { RouteComponent } from '../route.component';
import { RouteService } from 'app/service/route.service';

declare var $: any;
@Component({
  selector: 'table-list-route',
  templateUrl: './table-list-route.component.html',
  styleUrls: ['./table-list-route.component.css']
})
export class TableListRouteComponent implements OnInit {

  public length = 0;

  pageEvent: PageEvent;

  displayedColumns: string[] = ['origin', 'destination', 'vehicle', 'duration', 'distance', 'edit', 'delete', 'overview'];
  dataSource: any;

  @Output() deleted = new EventEmitter<Route>();
  @Output() edited = new EventEmitter<Route>();
  @Output() added = new EventEmitter<Route>();
  @Output() detailed = new EventEmitter<Route>();
  @Input() updateTableEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _modalService: NgbModal, private routeService: RouteService) { }

  ngOnInit() {
    this.updateTableEvent.subscribe(result => this.updateTable());
    this.updateTable();
  }

  updateTable() {
    this.routeService.getRoute('http://localhost:8000/api/route/').subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource<Route>(responseBody.results)
        this.length = responseBody.count;
      }
    );
  }

  public getServerData(event?: PageEvent) {
    const url = 'http://localhost:8000/api/route/?page=' + (event.pageIndex + 1);
    this.routeService.getRoute(url).subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource<Route>(responseBody.results)
        this.length = responseBody.count;
      }
    );
    return event;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  edit(route: Route) {
    this.edited.emit(route)
  }

  detail(route: Route) {
    this.detailed.emit(route)
  }

  add() {
    this.added.emit();
  }

  delete(route) {
    this.deleted.emit(route);
  }
}
