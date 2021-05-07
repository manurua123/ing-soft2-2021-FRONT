import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { Place } from 'app/model/place.model';
import { PlaceComponent } from '../place.component';
import { PlaceService } from 'app/service/place.service';

declare var $: any;
@Component({
  selector: 'table-list-place',
  templateUrl: './table-list-place.component.html',
  styleUrls: ['./table-list-place.component.css']
})
export class TableListPlaceComponent implements OnInit {

  public length = 0;

  pageEvent: PageEvent;

  displayedColumns: string[] = ['town', 'province', 'edit', 'delete', 'overview'];
  dataSource: any;

  @Output() deleted = new EventEmitter<Place>();
  @Output() edited = new EventEmitter<Place>();
  @Output() added = new EventEmitter<Place>();
  @Output() detailed = new EventEmitter<Place>();
  @Input() updateTableEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _modalService: NgbModal, private placeService: PlaceService) { }

  ngOnInit() {
    this.updateTableEvent.subscribe(result => this.updateTable());
    this.updateTable();
  }

  updateTable() {
    this.placeService.getPlace('http://localhost:8000/api/place/').subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource<Place>(responseBody.results)
        this.length = responseBody.count;
      }
    );
  }

  public getServerData(event?: PageEvent) {
    const url = 'http://localhost:8000/api/place/?page=' + (event.pageIndex + 1);
    this.placeService.getPlace(url).subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource<Place>(responseBody.results)
        this.length = responseBody.count;
      }
    );
    return event;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  edit(place: Place) {
    this.edited.emit(place)
  }

  detail(place: Place) {
    this.detailed.emit(place)
  }

  add() {
    this.added.emit();
  }

  delete(place) {
    this.deleted.emit(place);
  }
}
