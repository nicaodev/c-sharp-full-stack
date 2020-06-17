import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  eventosFiltrados: Evento[];
  eventos: Evento[];
  modalRef: BsModalRef;

  _filtroLista = '';

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService
    ) {}

    get filtroLista(): string {
      return this._filtroLista;
    }
    set filtroLista(value: string) {
      this._filtroLista = value;
      this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
    }
    openModal(template: TemplateRef<any>){
      this.modalRef = this.modalService.show(template);
    }

    ngOnInit() { // executa antes do HTML estar pronto.
      this.getEventos();
    }

    filtrarEventos(filtrarPor: string): Evento[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.eventos.filter(
        evento => evento.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
        );
      }

      getEventos() {
        this.eventoService.getEvento().subscribe(
          (_eventos: Evento[]) => {
            this.eventos = _eventos;
            this.eventosFiltrados = this.eventos;
            console.log('1o response: ', _eventos); // Visualizando o response no F12.
          },
          error => {
            console.log(error);
          });
        }
      }
