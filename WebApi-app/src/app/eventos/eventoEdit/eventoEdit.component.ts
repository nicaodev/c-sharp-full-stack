import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { Evento } from 'src/app/models/Evento';
import { ActivatedRoute } from '@angular/router';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventoEdit',
  templateUrl: './eventoEdit.component.html',
  styleUrls: ['./eventoEdit.component.css']
})
export class EventoEditComponent implements OnInit {
  titulo = 'Editar Evento';
  registerForm: FormGroup;
  evento: Evento = new Evento();

  constructor(
    private eventoService: EventoService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private router: ActivatedRoute
    ) {
      this.localeService.use('pt-br');
    }

    ngOnInit() {
      this.validation();
      this.carregarEvento();
    }
    get getLotes(): FormArray {
      return <FormArray>this.registerForm.get('lotes');
    }
    get getRedesSociais(): FormArray {
      return <FormArray>this.registerForm.get('redesSociais');
    }

    carregarEvento() {
      const idEvento = +this.router.snapshot.paramMap.get('id'); // '+' converte para number
      this.eventoService.getEventoId(idEvento).subscribe(
        (evento: Evento) => {
          this.evento = Object.assign({}, evento);
          this.registerForm.patchValue(this.evento);

          // Carregando Lotes e RedesSociais
          this.evento.lotes.forEach(lote => {
            this.getLotes.push(this.criaLote(lote));
          });

          this.evento.redesSociais.forEach(rede => {
            this.getRedesSociais.push(this.criaRedeSocial(rede));
          });
        }
        );

      }

      validation() {
        this.registerForm = this.fb.group({
          id: [],
          nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
          cidade: ['', [Validators.required]],
          data: ['', [Validators.required]],
          bairro: ['', [Validators.required]],
          cargaHoraria: ['', [Validators.required]],
          telefone: ['', [Validators.required]],
          email: ['', [Validators.email, Validators.required]],

          lotes: this.fb.array([]),
          redesSociais: this.fb.array([])
        });
      }

      criaLote( lote: any): FormGroup {
        return  this.fb.group({
          id: [lote.id],
          nome: [lote.nome, Validators.required],
          quantidade: [lote.quantidade, Validators.required],
          preco: [lote.preco, Validators.required],
          dataInicio: [lote.dataInicio ],
          dataFim: [lote.dataFim ]
        });
      }

      criaRedeSocial(rede: any): FormGroup {
        return this.fb.group({
          id: [rede.id],
          nome: [rede.nome, Validators.required],
          url: [rede.url, Validators.required]
        });
      }

      addLote() {
        this.getLotes.push(this.criaLote({id: 0}));
      }

      addRedeSocial() {
        this.getRedesSociais.push(this.criaRedeSocial({id: 0}));
      }

      removeRedeSocial( id: number) {
        this.getRedesSociais.removeAt(id);
      }
      removeLote(id: number) {
        this.getLotes.removeAt(id);
      }


      salvarEvento() {
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
        this.eventoService.putEvento(this.evento).subscribe(
          () => {
            this.toastr.success('Editado com sucesso!');
          }, error => {
            this.toastr.error(`Erro ao tentar Editar: ${error} `);
          }
          );
        }
      }
