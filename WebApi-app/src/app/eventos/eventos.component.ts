import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  eventos: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getEventos();
  }

  getEventos() {
    this.http.get('https://localhost:44307/evento').subscribe(response => {
      this.eventos = response;
      console.log('1o response: ', response); // Visualizando o response no F12.
    },
      error => {
        console.log(error);
      });
  }
}
