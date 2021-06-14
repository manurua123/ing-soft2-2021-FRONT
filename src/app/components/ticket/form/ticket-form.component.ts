
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { Place } from 'app/model/place.model';
import { Supplies } from 'app/model/supplies.model';
import { TravelTicketData } from 'app/model/travel.model';
import { PlaceService } from 'app/service/place.service';
import { SuppliesService } from 'app/service/supplies.service';
import { TravelService } from 'app/service/travel.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common'
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthorizationService } from 'app/service/authorization.service';
import { TicketService } from 'app/service/ticket.service';
import { quantity } from 'chartist';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

export interface PayResume {
  concept: string;
  total_value: number,
  total: number,
  type: string

}

export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    let result = date.toDateString();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    //see that displayformat get all the values indicate in MY_FORMATS.display
    switch (displayFormat) {
      case 'DD/MM/YYYY':
        // Return the format as per your requirement
        result = moment(date).format("DD-MM-YYYY");
        break;
      default:
      case 'MMM YYYY':
        // Return the format as per your requirement
        result = `${month}-${year}`;
        break;
    }
    return result;
  }
  parse(value: string): any {
    let parts = value.split('/');
    if (parts.length == 3)
      return new Date(+parts[2], (+parts[1]) - 1, +parts[0])

  }


}

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


/**
 * @title Stepper with editable steps
 */
@Component({
  selector: 'ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    CurrencyPipe
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class TicketFormComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') private myStepper: MatStepper;
  selectedOrigen: Place;
  selectedDestination: Place;
  selectedDeparture: Date;
  placeDatasource: Place[];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourFormGroup: FormGroup;
  fiveFormGroup: FormGroup;
  sixFormGroup: FormGroup;
  isEditable = false;
  dataSource: any;
  detailToPayDataSource: any;
  suppliesDataSource: any;
  isSelectedAmenities = false;
  total_to_pay: number;
  length: number
  secondStep = false;
  isGold: boolean;
  userId: number;

  checked = false;
  selectedTravel: TravelTicketData;
  expandedElement: PayResume | null;
  displayedColumns: string[] = ['select', 'origin', 'departure_date', 'departure_time', 'destination', 'arrival_date', 'arrival_time', 'price', 'available_seats'];
  displayedColumnsSupplies: string[] = ['description', 'price', 'amount'];
  displayedColumnsDetailToPay: string[] = ['detail', 'concept', 'total'];
  constructor(private cdr: ChangeDetectorRef, private _formBuilder: FormBuilder, private placeService: PlaceService,
    private travelService: TravelService, private suppliesService: SuppliesService, private cp: CurrencyPipe,
    private authorizationService: AuthorizationService, private ticketService: TicketService, private router: Router) {


  }

  ngOnInit() {

    this.authorizationService.getUserLogged().subscribe(user => {
      this.isGold = user.gold === '1';
      this.userId = user.id
    }
    );

    this.authorizationService.updateUserLogged();
    this.firstFormGroup = this._formBuilder.group({
      departureDate: ['', [Validators.required]],
      selectedOrigen: ['', [Validators.required]],
      selectedDestination: ['', [Validators.required]],
    });

    this.placeService.getAllPlace().subscribe((listPlace: Place[]) => {
      this.placeDatasource = listPlace;
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });

    this.thirdFormGroup = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      idCards: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });

    this.fourFormGroup = this._formBuilder.group({
      supplies: this._formBuilder.array([])
    });

    this.fiveFormGroup = this._formBuilder.group({
      departure_date: [''],
      departure_time: [''],
      arrival_date: [''],
      arrival_time: ['']

    });

    this.sixFormGroup = this._formBuilder.group({
      card_holder: ['', [Validators.required]],
      card_number: ['', [Validators.required]],
      month_exp: ['', [Validators.required]],
      year_exp: ['', [Validators.required]],
      code_secure: ['', [Validators.required]]
    });

  }

  ngAfterViewInit(): void {
    if (this.userId == 19) {
      $.notify({
        title: '<strong>Antención.</strong>',
        message: 'Sr pasajero. Ud no puede realizar la compra de un pasaje debido que un test realizado con anterioridad ha dado positivo y aún no se ha cumplido el tiempo de aislamiento'
      }, {
        type: 'warning'
      })
      this.router.navigate(['']);
    }
  }

  showTravel() {

    this.travelService.getAvailableTravel(this.selectedOrigen.id, this.selectedDestination.id, moment(this.selectedDeparture).format("YYYY-MM-DD")).subscribe(
      result => {
        if (!this.selectedTravel) {
          this.dataSource = new MatTableDataSource<TravelTicketData>(result)
        }
        if (this.selectedTravel && result.filter(travel => travel.id == this.selectedTravel.id).length == 0) {
          this.dataSource = new MatTableDataSource<TravelTicketData>(result)
        }
      },
      errorResponse => {
        if (errorResponse.error.code == "travel_no_exists__error") {
          $.notify({
            title: '<strong>Antención.</strong>',
            message: errorResponse.error.message
          }, {
            type: 'warning'
          })
          this.myStepper.previous()
        }
      }
    );

  }
  setSelectedTravel(travel: TravelTicketData) {
    this.checked = !this.checked;
    if (this.checked) {
      this.selectedTravel = travel;
    } else {
      this.selectedTravel = undefined;
    }
  }

  goToAmenities() {
    if (this.fourFormGroup.value.supplies.filter(supplie => supplie.amount != null && supplie.amount != '').length == 0)
      this.getAllAsFormArray().subscribe(supplies => {
        this.fourFormGroup.setControl('supplies', supplies);
      });
  }

  getAllAsFormArray(): Observable<FormArray> {
    return this.suppliesService.getAllSupplies().pipe(map((supplies: Supplies[]) => {
      const fgs = supplies.map(supplie => {
        supplie.price = this.cp.transform(supplie.price);
        return Supplies.asFormGroup(supplie)
      });
      return new FormArray(fgs);

    }
    ))
  }

  get supplies(): FormArray {
    return this.fourFormGroup.get('supplies') as FormArray;
  }

  goToDetailToPay() {
    
    debugger;
    const result = this.fourFormGroup.value.supplies.filter(supplie => supplie.amount != null && supplie.amount != '');
    this.detailToPayDataSource = [
      {
        concept: this.selectedTravel.origin + '/' + this.selectedTravel.destination,
        total_value: this.selectedTravel.price,
        total: this.cp.transform(this.selectedTravel.price),
        type: 'ticket'
      }
    ];
    console.log("aca esta el coso");
    debugger;
    if (result.length > 0) {
      let total: number = result.map(supplie => Number(supplie.price.replace('$', '')) * supplie.amount).reduce(
        function (a, b) {
          return a + b;
        });

      this.detailToPayDataSource.push(
        {
          concept: '',
          total_value: total,
          total: this.cp.transform(total),
          type: 'snack'
        }
      )
    }
    let discount = this.isGold ? '- ' + this.cp.transform((this.getTotalCost() * 0.10).toFixed(2)) : '0'
    let total_to_pay = this.isGold ? Number((this.getTotalCost() * 0.10 * -1).toFixed(2)) : 0;
    this.detailToPayDataSource.push(
      {
        concept: '',
        total_value: total_to_pay,
        total: discount,
        type: 'discount'
      });



  }

  toggleRow(element) {
    this.expandedElement = element;
  }
  getTotalCost() {

    if (this.detailToPayDataSource) {
      return this.detailToPayDataSource.map(t => t.total_value).reduce((acc, value) => acc + value, 0);
    }
  }

  pay() {
    switch (this.sixFormGroup.controls['card_number'].value) {

      case 5536680330960099:
        console.log('Tarjeta inexistente')
        $.notify({
          title: '<strong>Tarjeta rechazada</strong>',
          message: 'La tarjeta ingresada es invalida .'
        }, {
          type: 'warning'
        })
        return;
      case 5536680330960100:
        console.log('Falta de fondos')
        $.notify({
          title: '<strong>Tarjeta rechazada</strong>',
          message: 'La tarjeta ingresada no tiene fondos.'
        }, {
          type: 'warning'
        })
        return;
      case 5536680330960101:
        console.log('Titular fallido')
        $.notify({
          title: '<strong>Tarjeta rechazada</strong>',
          message: 'El titular de la tarjeta es incorrecto'
        }, {
          type: 'warning'
        })
        return;
      case 5536680330960102:
        console.log('Código de seguridad fallido')
        $.notify({
          title: '<strong>Tarjeta rechazada</strong>',
          message: 'Codigo de seguridad invalido'
        }, {
          type: 'warning'
        })
        return;

      case 5536680330960103:

        console.log('No se pudo establecer comunicacion con el servidor externo')
        $.notify({
          title: '<strong>Problemas de servidor</strong>',
          message: 'Error con el servidor, pruebe mas tarde.'
        }, {
          type: 'warning'
        })
        return;





    }
    if (!this.isGold && !this.checkDate()) {
      $.notify({
        title: '<strong>Tarjeta rechazada</strong>',
        message: 'Las tarjeta ingresada esta vencida.'
      }, {
        type: 'warning'
      })
      return
    }
 
    const supplies = this.fourFormGroup.value.supplies.filter(supplie => supplie.amount != null && supplie.amount != '').map(supplie =>
      ({ id: supplie.idSupplie, quantity: Number(supplie.amount), price: Number(supplie.price.replace('$', '')) })
    );

    const ticket = {
      amount_paid: this.getTotalCost(),
      idCards: this.thirdFormGroup.controls['idCards'].value,
      birth_date: moment(this.thirdFormGroup.controls['birth_date'].value).format("YYYY-MM-DD"),
      phone: this.thirdFormGroup.controls['phone'].value,
      firstName: this.thirdFormGroup.controls['firstName'].value,
      lastName: this.thirdFormGroup.controls['lastName'].value,
      email: this.thirdFormGroup.controls['email'].value,
      travel: this.selectedTravel.id,
      user: this.userId,
      suppliesId: supplies

    }

    this.ticketService.save(ticket)
      .subscribe(travel => {
        $.notify({
          title: '<strong>Operanción exitosa.</strong>',
          message: 'Se ha registrado la compra del pasaje correctamente correctamente el viaje'
        }, {
          type: 'success'
        });
        this.router.navigate([''])
      },
        errorResponse => {
          if (errorResponse.error.code == "not_seats_error") {
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
  checkDate() {
    const year_card_value: number = this.sixFormGroup.controls['year_exp'].value;
    const current_year: number = 2021;
    const month_card_value: number = this.sixFormGroup.controls['month_exp'].value;
    const current_month: number = 6;
    return year_card_value >= current_year && month_card_value >= current_month

  }


}