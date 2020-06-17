import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DateTimeFormatPipePipe } from './helpers/dateTimeFormatPipe.pipe';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { NavComponent } from './nav/nav.component';
import { EventoService } from './services/evento.service';


@NgModule({
   declarations: [
      AppComponent,
      EventosComponent,
      NavComponent,
      DateTimeFormatPipePipe // Pipes personalizado
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      HttpClientModule, // para requisições na webApi,
      FormsModule
   ],
   providers: [
     EventoService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
