import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';

import { Supplies, SuppliesData } from 'app/model/supplies.model';
import { SuppliesService } from 'app/service/supplies.service';


declare var $: any;

@Component({
  selector: 'supplies-form',
  templateUrl: './supplies-form.component.html',
  styleUrls: ['./supplies-form.component.css']
})

export class SuppliesFormComponent implements OnInit {

  @Output()
  closeFormEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  updateTableEvent = new EventEmitter<Supplies>();

  @Input()
  editedSupplies: SuppliesData;

  @Input()
  isDetailed: boolean;


  description: string;
  price: number;

  constructor(private suppliesService: SuppliesService) { }

  ngOnInit() {
    
    if (!this.editedSupplies) {
      this.editedSupplies =
      {
        id: undefined,
        description: undefined,
        price: undefined,
      }
    }
  }

  close() {
    this.closeFormEvent.emit();
  }

  save() {
   
    if (!this.editedSupplies.id)
      this.suppliesService.save(
        {
          description: this.editedSupplies.description,
          price: this.editedSupplies.price,
        }
      )
        .subscribe(supplies => {
          $.notify({
            title: '<strong>Operanción exitosa.</strong>',
            message: 'Se ha guardado correctamente el insumo <br/>' + this.editedSupplies.description,
          }, {
            type: 'success'
          });
          this.isDetailed = true;
        },
          errorResponse => {
            if (errorResponse.error.code == "supplies_exists_error") {
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
      this.suppliesService.update(
        {
          id: this.editedSupplies.id,
          description: this.editedSupplies.description,
          price: this.editedSupplies.price,
        })
        .subscribe(supplies => {
          $.notify({
            title: '<strong>Operanción exitosa.</strong>',
            message: 'Se ha modifico correctamente el insumo <br/>' + this.editedSupplies.description ,
          }, {
            type: 'success'
          });
          this.isDetailed = true
        },
          errorResponse => {
            if (errorResponse.error.code == "supplies_exists_error") {
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