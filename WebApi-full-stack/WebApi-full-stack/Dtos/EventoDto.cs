using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi_full_stack.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Tema deve ser preenchido.")]
        public string Nome { get; set; }

        public string Cidade { get; set; }
        public string Bairro { get; set; }
        public string Data { get; set; }

        [Phone]
        public string Telefone { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Range(1, 80, ErrorMessage = "No minímo 1h e no máximo 80h.")]
        public int CargaHoraria { get; set; }

        public string ImagemURL { get; set; }

        public List<LoteDto> Lotes { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<PalestranteDto> Palestrantes { get; set; }
    }
}