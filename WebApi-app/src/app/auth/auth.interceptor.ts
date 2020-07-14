import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ok } from 'assert';
import { IfStmt } from '@angular/compiler';
import { tap } from 'rxjs/internal/operators/tap';

// V=Interceptar qualquer chamada http que saia do cliente para a API. E vai injetar a authorization.

@Injectable ({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') !== null) {
      const cloneReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      });
      return next.handle(cloneReq).pipe(
        tap(
          succ => { },
          err => {
            if (err.status === 401) {
              this.router.navigateByUrl('user/login');
            }
          }
          )
          );
        } else {
          return next.handle(req.clone());
        }
      }
    }
