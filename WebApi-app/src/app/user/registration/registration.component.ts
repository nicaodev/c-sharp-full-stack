import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(
    private fb: FormBuilder,
    private toaster: ToastrService,
    private authService: AuthService,
    private router: Router) {
    }

    ngOnInit() {
      this.validation();
    }

    validation() {
      this.registerForm = this.fb.group({
        fullName : ['', Validators.required],
        email : ['', [Validators.required, Validators.email]],
        userName : ['', Validators.required],

        passwords : this.fb.group({ // agrupando validacao conforme esta no HTML dentro de passwords
          password : ['', [Validators.required, Validators.minLength(4)]],
          confirmPassword : ['', Validators.required],
        }, {validator: this.compararSenhas})
      });
    }

    compararSenhas( fb: FormGroup) {
      const confimSenhaCtrl = fb.get('confirmPassword');

      if (confimSenhaCtrl.errors == null || 'mismatch' in confimSenhaCtrl.errors) {
        if (fb.get('password').value !== confimSenhaCtrl.value) {
          confimSenhaCtrl.setErrors({mismatch: true});
        } else {
          confimSenhaCtrl.setErrors(null);
        }
      }
    }

    cadastrarUsuario() {
      if (this.registerForm.valid){
        this.user = Object.assign({password: this.registerForm.get('passwords.password').value},
        this.registerForm.value);

        this.authService.register(this.user).subscribe(
          ( ) => {
            this.router.navigate(['/user/login']);
            this.toaster.success('Cadastrado realizado');
          },

          error => {
            const erro = error.error;
            erro.array.forEach(element => {
              switch (element.code) {
                case 'DuplicateUserName':
                  this.toaster.error('Cadastro duplicado!');
                  break;
                default:
                  this.toaster.error(`Erro no cadastro! CODE: ${element.code}`);
                  break;
              }
            });
          }
          );
        }

      }

    }
