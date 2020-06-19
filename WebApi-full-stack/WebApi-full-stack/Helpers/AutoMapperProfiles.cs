using AutoMapper;
using System.Linq;
using WebApi.Domain;
using WebApi_full_stack.Dtos;

namespace WebApi_full_stack.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Evento, EventoDto>() // Mapeando 'n' para 'n'.
                .ForMember(dest => dest.Palestrantes, opt =>
             {
                 opt.MapFrom(src => src.PalestrantesEventos.Select(x => x.Palestrante).ToList());
             });
            CreateMap<Palestrante, PalestranteDto>()
                .ForMember(dest => dest.Eventos, opt =>
                {
                    opt.MapFrom(src => src.PalestrantesEventos.Select(x => x.Evento).ToList());
                });
            CreateMap<Lote, LoteDto>();
            CreateMap<RedeSocial, RedeSocialDto>();
        }
    }
}