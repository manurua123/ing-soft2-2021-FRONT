import { Ticket } from './../../model/ticket.model';
import { tick } from '@angular/core/testing';

import { AuthorizationService } from '../../service/authorization.service';
import { Component} from '@angular/core';
import { TravelService } from 'app/service/travel.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from 'app/service/ticket.service';
import { NgForm } from '@angular/forms';
declare var $: any;


@Component({
  selector: 'questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})

export class QuestionnaireComponent {
  fever: string;
  losstTaste: string;
  throatPain: string;
  lossSmell: string;
  difficultBreathe: string;
  temperature: number;
  ticketQuetionnaire: Ticket;
  isQuetionnaireActive = false;

  dataSource: any;
    displayedColumns: string[] = [ 'firstName','lastName','idCards', 'email','state', 'test'];
  

  
  
  constructor(private tickteService: TicketService, private route:ActivatedRoute) { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.tickteService.getTickets(this.route.snapshot.paramMap.get('id')).subscribe(tickets => 
         this.dataSource = tickets
          ,
          errorResponse => {
            if (errorResponse.error.code == "ticket_no_exists__error") {
              $.notify({
                title: '<strong>Viaje sin pasajeros.</strong>',
                message: errorResponse.error.message
              }, {
                type: 'warning'
              })
            };
            
          }
        );

  }
  
  showQuestionnaire(ticket: Ticket) {
    this.ticketQuetionnaire = ticket;
    this.isQuetionnaireActive= true;
  }
  save() {
    let totalPostivoResponse = 0;
    if (this.fever === 'true') {  
     totalPostivoResponse++;
    }
    if (this.lossSmell === 'true') {
      totalPostivoResponse++;
    }  
    if (this.difficultBreathe === 'true') {
      totalPostivoResponse++;
    }  
    if (this.losstTaste === 'true') {  
      totalPostivoResponse++;
    }  
    
    if (totalPostivoResponse > 1 || this.temperature > 37) {
      $.notify({
        title: '<strong>Test positivo.</strong>',
        message: 'Sr conductor el pasajero ha arrojado sintomas asociado a COVID-19. El mismo no podrá realizar el viaje y sera supendido.'
      }, {
        type: 'danger'
      })
    }
    
    this.tickteService.test_result(this.ticketQuetionnaire.id,totalPostivoResponse > 1 || this.temperature > 37 ?'Rechazado':'Aceptado').
    subscribe(result => {
      $.notify({
        title: '<strong>Guardado exitoso</strong>',
        message: 'El test se ha guardado exitosamente'
      }, {
        type: 'success'
      })
      this.ngOnInit();
      this.isQuetionnaireActive = false;
      
     }
      );
      
  }
  cancel() {
    this.isQuetionnaireActive = false;
  }
}