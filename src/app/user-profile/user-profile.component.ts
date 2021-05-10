import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user.model';
import { USerService } from 'app/service/user.service';
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
  constructor(private userService: USerService) { }

  ngOnInit() {
    this.user = new User();
  }

  isGold(value) {
    this.gold = !this.gold;
  }
  save() {
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

  checkFormulario(form, formGold) {
    if (!this.gold) {
      if (form.form.invalid) {
        return (true)
      }
      return (false)
    }
    else {
      if (form.form.invalid || formGold.from.invalid) {
        return (true)
      }
      else 
        return (false)

    }
  }
}
