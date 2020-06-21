using System.Collections.Generic;

namespace WebApi_full_stack.Dtos
{
    public class PalestranteDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Curriculo { get; set; }
        public string ImagemURL { get; set; }
        public int Telefone { get; set; }
        public int Email { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }

        public List<EventoDto> Eventos { get; set; }
    }
}