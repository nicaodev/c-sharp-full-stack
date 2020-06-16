import {RedeSocial  } from './RedeSocial';
import {Evento  } from './Evento';

export interface Palestrante {
  id: number;
  nome: string;
  curriculo: string;
  imagemURL: string;
  telefone: number;
  email: number;
  redesSociais: RedeSocial[];
  palestrantesEventos: Evento[];
}
