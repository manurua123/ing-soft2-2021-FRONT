import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user.model';
import { USerService } from 'app/service/user.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms'
import { Router } from '@angular/router';
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
  
  profileFormGroup: FormGroup; /* = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
 });*/

  constructor(private userService: USerService, private router: Router) { }

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
              'month_year', new FormControl({ value: '' },Validators.compose([Validators.required,  Validators.minLength(2), Validators.maxLength(2)]))
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
    this.profileFormGroup.removeControl('month_year');
    this.profileFormGroup.removeControl('security_code');
  }
  this.profileFormGroup.updateValueAndValidity();
  }
  save(form: NgForm) {
    if (!form.valid) {
      return
    }
      
    console.log("garbando");
    if (this.getAge() < 18) {
      $.notify({
        title: '<strong>Operanción erronea.</strong>',
        message: 'No se puede registrar ya que es menor de 18 años.'
      }, {
        type: 'danger'
      })
      return
    }

    if (this.user.password != this.rpassword) {
      $.notify({
        title: '<strong>Atención</strong>',
        message: 'Las contraseñas difieren.'
      }, {
        type: 'warning'
      })
      return
    }

    if(!this.checkDate() && this.gold){
      $.notify({
        title: '<strong>Atención</strong>',
        message: 'Las tarjeta esta vencida.'
      }, {
        type: 'warning'
      })
      return
    }

    this.user.username = this.user.email;
    this.user.birth_date = new Date(this.user.birth_date).toISOString().slice(0, 10);
    this.userService.save(this.user)
      .subscribe(route => {

        $.notify({
          title: '<strong>Operanción exitosa.</strong>',
          message: 'El usuario ' + this.user.email + ' ha sido registrado correctamente'
        }, {
          type: 'success'
        });
        this.isEnabled = true;
        this.profileFormGroup.disable();
      },
        errorResponse => {
          if (errorResponse.error.code == "profile_exists_error") {
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
    var today = new Date();
    if ((this.user.year_exp = today.getFullYear()))
      if (this.user.month_exp < today.getMonth())
        return (true)
      else
        return(false)
    if ((this.user.year_exp > today.getFullYear()))
       return(true)
  }

  getAge() {
    var today = new Date();
    var birth_date = new Date(this.user.birth_date);
    var age = today.getFullYear() - birth_date.getFullYear();
    var m = today.getMonth() - birth_date.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth_date.getDate())) {
      age--;
    }
    return age;
  }
  cancel() {
    this.router.navigate([''])

  }

}
