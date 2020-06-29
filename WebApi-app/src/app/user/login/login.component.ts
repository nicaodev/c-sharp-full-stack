import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = 'Login';
  model: any = {};

  constructor(
    private toaster: ToastrService,
    private authService: AuthService,
    private router: Router) {
    }

    ngOnInit() {
      if (localStorage.getItem('token') != null) {
        this.router.navigate(['/dashboard']);
      }
    }


    login() {
      this.authService.login(this.model).subscribe(
        () => {
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.toaster.error('Erro ao logar!');
        }
      );
    }

  }
