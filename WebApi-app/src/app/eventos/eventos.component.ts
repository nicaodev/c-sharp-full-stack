import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import {BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { template } from '@angular/core/src/render3';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  eventosFiltrados: Evento[];
  eventos: Evento[];
  evento: Evento;
  registerForm: FormGroup;
  modoSalvar = 'post';
  bodyDeletarEvento = '';

  _filtroLista = '';

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService
    ) {
      this.localeService.use('pt-br');
    }

    get filtroLista(): string {
      return this._filtroLista;
    }
    set filtroLista(value: string) {
      this._filtroLista = value;
      this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
    }
    openModal(template: any) {
      this.registerForm.reset();
      template.show();
    }

    novoEvento (template: any) {
      this.modoSalvar = 'post';
      this.openModal(template);
    }

    editarEvento (evento: Evento, template: any) {
      this.modoSalvar = 'put';
      this.openModal(template);
      this.evento = evento;
      this.registerForm.patchValue(evento);
    }

    excluirEvento(evento: Evento, template: any) {
      this.openModal(template);
      this.evento = evento;
      this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.nome}`;
    }

    confirmeDelete(template: any) {
      this.eventoService.deleteEvento(this.evento.id).subscribe(
        () => {
            template.hide();
            this.getEventos();
          }, error => {
            console.log(error);
          }
      );
    }





    ngOnInit() { // executa antes do HTML estar pronto.
      this.validation();
      this.getEventos();
    }

    salvarAlteracao(template: any) {
      if (this.registerForm.valid){
        if (this.modoSalvar === 'post')
        {
          this.evento = Object.assign({}, this.registerForm.value);
          this.eventoService.postEvento(this.evento).subscribe(
            (novoEvento: Event) => {
              console.log(novoEvento);
              template.hide();
              this.getEventos();
            }, error => {
              console.log(error );
            }
            );
          } else {
            this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
            console.log('antes de atalizar', this.evento);
            this.eventoService.putEvento(this.evento).subscribe(
              () => {
                template.hide();
                this.getEventos();
              }, error => {
                console.log(error );
              }
              );
            }
          }
        }

        validation() {
          this.registerForm = this.fb.group({
            nome: ['', [Validators.minLength(4), Validators.maxLength(50), Validators.required]],
            cidade: ['', [Validators.required]],
            data: ['', [Validators.required]],
            bairro: ['', [Validators.required]],
            cargaHoraria: ['', [Validators.required]],
            telefone: ['', [Validators.required]],
            email: ['', [Validators.email, Validators.required]],
          });
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
