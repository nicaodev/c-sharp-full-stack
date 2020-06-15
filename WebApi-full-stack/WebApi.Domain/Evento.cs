using System;
using System.Collections.Generic;
using System.Text;

namespace WebApi.Domain
{
    public class Evento
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public DateTime Data { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public int CargaHoraria { get; set; }
        public string ImagemURL { get; set; }

        public List<Lote> Lotes { get; set; }
        public List<RedeSocial> RedesSociais { get; set; }
        public List<PalestranteEvento> PalestrantesEventos { get; set; }
    }
}
