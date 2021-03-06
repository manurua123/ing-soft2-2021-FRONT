import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user.model';
import { USerService } from 'app/service/user.service';
import { FormGroup, FormControl, Validators, NgForm, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
declare var $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  public gold: boolean = false;
  public user: User;
  public rpassword: string;
  isEnabled: boolean = false;
  
  profileFormGroup: FormGroup; 

  constructor(private userService: USerService, private router: Router, private dateAdapter: DateAdapter<Date>) {
    
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
   }
  
  ngOnInit() {
    this.user = new User();
    this.profileFormGroup = new FormGroup({
      firstName: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.maxLength(30)])),
      lastName: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.maxLength(30)])),
      idCards: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.maxLength(8)])),
      birth_date: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      email: new FormControl({ value: '' }, Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ])),
      phone: new FormControl({ value: '' }, Validators.compose([Validators.required,  Validators.maxLength(20) ])),
      password: new FormControl({ value: '' }, Validators.compose([Validators.required,  Validators.minLength(6), Validators.maxLength(20) ])),
      rpassword: new FormControl({ value: '' }, Validators.compose([Validators.required,  Validators.minLength(6), Validators.maxLength(20) ]))
    }, {updateOn: 'submit'});
  }

  isGold(value) {
    this.gold = !this.gold;
    if (this.gold) {
      this.profileFormGroup.addControl(
        'card_holder', new FormControl({ value: '' },Validators.compose([Validators.required,  Validators.minLength(4), Validators.maxLength(20)]))
        );
      this.profileFormGroup.addControl(
          'card_number', new FormControl({ value: '' },Validators.compose([Validators.required,  Validators.minLength(16), Validators.maxLength(160)]))
        );
      this.profileFormGroup.addControl(
            'month_exp', new FormControl({ value: '' },Validators.compose([Validators.required,  Validators.minLength(2), Validators.maxLength(2)]))
        );
      this.profileFormGroup.addControl(
              'year_exp', new FormControl({ value: '' },Validators.compose([Validators.required,  Validators.minLength(2), Validators.maxLength(2)]))
        );
    
      this.profileFormGroup.addControl(
          'security_code', new FormControl({ value: '' },Validators.compose([Validators.required,  Validators.minLength(3), Validators.maxLength(3)]))
    );
    }
  else
  {
    this.profileFormGroup.removeControl('card_holder');
    this.profileFormGroup.removeControl('card_number');
    this.profileFormGroup.removeControl('month_exp');
    this.profileFormGroup.removeControl('month_exp');
    this.profileFormGroup.removeControl('security_code');
  }
  this.profileFormGroup.updateValueAndValidity();
  }
  save(form: NgForm) {
   
    if (!form.valid) {
      return
    }
    if (this.getAge() < 18) {
      $.notify({
        title: '<strong>Operanci??n erronea.</strong>',
        message: 'No se puede registrar ya que es menor de 18 a??os.'
      }, {
        type: 'danger'
      })
      return
    }

    if (this.user.password != this.rpassword) {
      $.notify({
        title: '<strong>Atenci??n</strong>',
        message: 'Las contrase??as difieren.'
      }, {
        type: 'warning'
      })
      return
    }

    if(!this.checkDate() && this.gold){
      $.notify({
        title: '<strong>Atenci??n</strong>',
        message: 'Las tarjeta esta vencida.'
      }, {
        type: 'warning'
      })
      return
    }

    this.user.username = this.user.email;
    const temporary_birth_date = this.user.birth_date;
    this.user.birth_date = new Date(this.user.birth_date).toISOString().slice(0, 10);
    this.userService.save(this.user)
      .subscribe(route => {
        $.notify({
          title: '<strong>Operanci??n exitosa.</strong>',
          message: 'El usuario ' + this.user.email + ' ha sido registrado correctamente'
        }, {
          type: 'success'
        });
        this.isEnabled = true;
        this.profileFormGroup.disable();
      },
        errorResponse => {
          this.user.birth_date = temporary_birth_date;
          if (errorResponse.error.code == "profile_exists_error") {
            $.notify({
              title: '<strong>Operanci??n erronea.</strong>',
              message: errorResponse.error.message
            }, {
              type: 'danger'
            })
          }
        }
      )
  }

  checkDate() {
    const year_card_value: number = this.user.year_exp;
    const current_year: number  = 2021;
    const month_card_value: number =  this.user.month_exp;
    const current_month: number  = 5;
    return year_card_value >=  current_year && month_card_value >= current_month
  }

  getAge() {
    var today = new Date();
    var birth_date_to_calc = new Date(this.user.birth_date);
    var age = today.getFullYear() - birth_date_to_calc.getFullYear();
    var m = today.getMonth() - birth_date_to_calc.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth_date_to_calc.getDate())) {
      age--;
    }
    return age;
  }
  cancel() {
    this.router.navigate([''])
  }
}
