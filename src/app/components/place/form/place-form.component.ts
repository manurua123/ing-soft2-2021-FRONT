import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';

import { Place, PlaceData } from 'app/model/place.model';
import { PlaceService } from 'app/service/place.service';


declare var $: any;

@Component({
  selector: 'place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.css']
})

export class PlaceFormComponent implements OnInit {

  @Output()
  closeFormEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  updateTableEvent = new EventEmitter<Place>();

  @Input()
  editedPlace: PlaceData;

  @Input()
  isDetailed: boolean;

  @Input() provincias = [
    "Buenos Aires",
    "Capital Federal",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán"];
  @Input() selectedProvince: string;

  town: string;
  province: string;

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.selectedProvince =""
    if(this.editedPlace)
      this.selectedProvince = this.editedPlace.province
    if (!this.editedPlace) {
      this.editedPlace =
      {
        id: undefined,
        town: undefined,
        province: undefined,
      }
    }
  }

  close() {
    this.closeFormEvent.emit();
  }

  save() {
    this.editedPlace.province = this.selectedProvince;

    if (!this.editedPlace.id)
      this.placeService.save(
        {
          town: this.editedPlace.town,
          province: this.editedPlace.province,
        }
      )
        .subscribe(place => {
          $.notify({
            title: '<strong>Operanción exitosa.</strong>',
            message: 'Se ha guardado correctamente el destino ' + this.editedPlace.town + '- ' + this.editedPlace.province,
          }, {
            type: 'success'
          });
          this.isDetailed = true;
        },
          errorResponse => {
            if (errorResponse.error.code == "place_exists_error") {
              $.notify({
                title: '<strong>Operanción erronea.</strong>',
                message: errorResponse.error.message
              }, {
                type: 'danger'
              })
            };
            if (errorResponse.error.code == "place_exists_in_route_error") {
              $.notify({
                title: '<strong>Operanción erronea.</strong>',
                message: errorResponse.error.message
              }, {
                type: 'danger'
              })
            }
          }
        )
    else
      this.placeService.update(
        {
          id: this.editedPlace.id,
          town: this.editedPlace.town,
          province: this.editedPlace.province,
        })
        .subscribe(place => {
          $.notify({
            title: '<strong>Operanción exitosa.</strong>',
            message: 'Se ha guardado correctamente el destino ' + this.editedPlace.town + '- ' + this.editedPlace.province,
          }, {
            type: 'success'
          });
          this.isDetailed = true
        },
          errorResponse => {
            if (errorResponse.error.code == "place_exists_error") {
              $.notify({
                title: '<strong>Operanción erronea.</strong>',
                message: errorResponse.error.message
              }, {
                type: 'danger'
              })
            }
            if (errorResponse.error.code == "place_exists_in_route_error") {
              $.notify({
                title: '<strong>Operanción erronea.</strong>',
                message: errorResponse.error.message
              }, {
                type: 'danger'
              })
            }
          }
        )


  }

}