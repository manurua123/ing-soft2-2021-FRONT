import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbModule, NgbDate, NgbActiveModal, NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Route } from 'app/model/route.model';
import { RouteService } from 'app/service/route.service';
import { AuthorizationService } from 'app/service/authorization.service';

declare var $: any;
@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {
  closeResult = '';
  deleteRoute = '';
  @ViewChild('content') content: any;
  isEdited: boolean = false;
  isAdded: boolean = false;
  isDetailed: boolean = false;
  selectedRoute: Route;
  userRole: string;

  updatedTableEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _modalService: NgbModal, private routeService: RouteService, private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.authorizationService.getUserLogged().subscribe(userAccount =>
      this.userRole = userAccount.rol)
  }

  open(content: any, route: Route) {
    this.deleteRoute = route.origin + '-' + route.destination;
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.delete(route);
    }, (reason) => {
      // Ver si se puede sacar esto
    });
  }

  delete(route: Route) {
    this.routeService.delete(route).subscribe(response => {
      $.notify({
        title: '<strong>Operanción exitosa.</strong>',
        message: 'Se ha eliminado correctamente la ruta ' + route.origin + '- ' + route.destination
      }, {
        type: 'success'
      });
      this.updatedTableEvent.emit()
    }
    );

  }

  updateTableData(event) {
    this.updatedTableEvent.emit()
  }
  onEdited(route: Route) {
    this.isEdited = true;
    this.selectedRoute = route;
  }

  onDeleted(route: Route) {
    this.open(this.content, route);
  }

  onDetailed(route: Route) {
    this.selectedRoute = route;
    this.isDetailed = true;
  }

  onClose(event: any) {
    this.isDetailed = false;
    this.isEdited = false;
    this.isAdded = false;
  }

  onAdded() {
    this.selectedRoute = null;
    this.isAdded = true;
  }
}
