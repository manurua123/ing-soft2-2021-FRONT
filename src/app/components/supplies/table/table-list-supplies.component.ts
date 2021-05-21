import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { Supplies } from 'app/model/supplies.model';
import { SuppliesComponent } from '../supplies.component';
import { SuppliesService } from 'app/service/supplies.service';

declare var $: any;
@Component({
  selector: 'table-list-supplies',
  templateUrl: './table-list-supplies.component.html',
  styleUrls: ['./table-list-supplies.component.css']
})
export class TableListSuppliesComponent implements OnInit {

  public length = 0;

  pageEvent: PageEvent;

  displayedColumns: string[] = ['description', 'price', 'edit', 'delete', 'overview'];
  dataSource: any;

  @Output() deleted = new EventEmitter<Supplies>();
  @Output() edited = new EventEmitter<Supplies>();
  @Output() added = new EventEmitter<Supplies>();
  @Output() detailed = new EventEmitter<Supplies>();
  @Input() updateTableEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _modalService: NgbModal, private suppliesService: SuppliesService) { }

  ngOnInit() {
    this.updateTableEvent.subscribe(result => this.updateTable());
    this.updateTable();
  }

  updateTable() {
    this.suppliesService.getSupplies('http://localhost:8000/api/supplies/').subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource<Supplies>(responseBody.results)
        this.length = responseBody.count;
      }
    );
  }

  public getServerData(event?: PageEvent) {
    const url = 'http://localhost:8000/api/supplies/?page=' + (event.pageIndex + 1);
    this.suppliesService.getSupplies(url).subscribe(
      responseBody => {
        this.dataSource = new MatTableDataSource<Supplies>(responseBody.results)
        this.length = responseBody.count;
      }
    );
    return event;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  edit(supplies: Supplies) {
    this.edited.emit(supplies)
  }

  detail(supplies: Supplies) {
    this.detailed.emit(supplies)
  }

  add() {
    this.added.emit();
  }

  delete(supplies) {
    this.deleted.emit(supplies);
  }
}
