import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private toaster: ToastrService,
    private router: Router,
    private authService: AuthService ) { }

    ngOnInit() {
    }

    logado() {
     return this.authService.logado();
    }

    entrar() {
      this.router.navigate(['/user/login']);
    }

    showMenu(){
      return this.router.url !== '/user/login';
    }

    logout() {
      localStorage.removeItem('token');
      this.toaster.show('Log Out');
      this.router.navigate(['/user/login']);
    }

    userLogado() {
      return sessionStorage.getItem('username');
    }

  }
