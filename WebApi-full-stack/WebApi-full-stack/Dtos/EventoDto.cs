using System.Collections.Generic;

namespace WebApi_full_stack.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Data { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public int CargaHoraria { get; set; }
        public string ImagemURL { get; set; }

        public List<LoteDto> Lotes { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<PalestranteDto> Palestrantes { get; set; }
    }
}