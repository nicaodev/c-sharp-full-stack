using System.Collections.Generic;

namespace WebApi.Domain
{
    public class Palestrante
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Curriculo { get; set; }
        public string ImagemURL { get; set; }
        public int Telefone { get; set; }
        public int Email { get; set; }
        public List<RedeSocial> RedesSociais { get; set; }

        public List<PalestranteEvento> PalestrantesEventos { get; set; }
    }
}