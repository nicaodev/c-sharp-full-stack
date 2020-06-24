using AutoMapper;
using System.Linq;
using WebApi.Domain;
using WebApi.Domain.Identity;
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
             }).ReverseMap();

            CreateMap<Palestrante, PalestranteDto>()
                .ForMember(dest => dest.Eventos, opt =>
                {
                    opt.MapFrom(src => src.PalestrantesEventos.Select(x => x.Evento).ToList());
                }).ReverseMap();
            CreateMap<Lote, LoteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();


            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
        }
    }
}