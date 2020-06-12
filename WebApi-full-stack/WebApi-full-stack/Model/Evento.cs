using System;

namespace WebApi_full_stack.Model
{
    public class Evento
    {
        public int EventoId { get; set; }
        public string Nome { get; set; }
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Data { get; set; }
        public int CargaHoraria { get; set; }
        public string ImagemUrl { get; set; }
    }
}