using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Domain
{
    public class Lote
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        [Column(TypeName = "decimal(8,2)")]
        public decimal Preco { get; set; }

        public DateTime? DataInicio { get; set; }
        public DateTime? DataFim { get; set; }
        public int Quantidade { get; set; }
        public int EventoId { get; set; }

        public Evento Evento { get; }
    }
}