import { Lote } from './Lote';
import { Palestrante } from './Palestrante';
import {RedeSocial  } from './RedeSocial';

export interface Evento {
   id: number;
   nome: string;
   cidade: string;
   bairro: string;
   data: Date;
   telefone: string;
   email: string;
   cargaHoraria: number;
   imagemURL: string;

   lotes: Lote[];
   redesSociais: RedeSocial[];
   palestrantesEventos: Palestrante[];

}
