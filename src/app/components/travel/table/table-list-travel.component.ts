import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { Travel } from 'app/model/travel.model';
import { TravelComponent } from '../travel.component';
import { TravelService } from 'app/service/travel.service';

declare var $: any;
@Component({
  selector: 'table-list-travel',
  templateUrl: './table-list-travel.component.html',
  styleUrls: ['./table-list-travel.component.css']
})
export class TableListTravelComponent implements OnInit {

  public length = 0;

  pageEvent: PageEvent;

  displayedColumns: string[] = [ 'departure_date', 'arrival_date','origin', 'destination','departure_time', 'arrival_time', 'price', 'available_seats', 'edit', 'delete', 'overview'];
  dataSource: any;

  @Output() deleted = new EventEmitter<Travel>();
  @Output() edited = new EventEmitter<Travel>();
  @Output() added = new EventEmitter<Travel>();
  @Output() detailed = new EventEmitter<Travel>();
  @Input() updateTableEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _modalService: NgbModal, private travelService: TravelService) { }

  ngOnInit() {
    this.updateTableEvent.subscribe(result => this.updateTable());
    this.updateTable();
  }

  updateTable() {
    this.travelService.getTravel('http://localhost:8000/api/travel/').subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource<Travel>(responseBody.results)
        this.length = responseBody.count;
      }
    );
  }

  public getServerData(event?: PageEvent) {
    const url = 'http://localhost:8000/api/travel/?page=' + (event.pageIndex + 1);
    this.travelService.getTravel(url).subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource<Travel>(responseBody.results)
        this.length = responseBody.count;
      }
    );
    return event;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  edit(travel: Travel) {
    this.edited.emit(travel)
  }

  detail(travel: Travel) {
    this.detailed.emit(travel)
  }

  add() {
    this.added.emit();
  }

  delete(travel) {
    this.deleted.emit(travel);
  }
}
