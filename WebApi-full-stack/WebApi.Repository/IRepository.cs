using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebApi.Domain;

namespace WebApi.Repository
{
    public interface IRepository
    {
        // Geral
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        //Eventos
        Task<Evento[]> GetAllEventoAsyncNome(string tema, bool includePalestrantes);
        Task<Evento[]> GetAllEventoAsync(bool includePalestrantes);
        Task<Evento> GetAllEventoAsyncId(int id, bool includePalestrantes);

        //Palestrantes
        Task<Palestrante[]> GetAllPalestranteAsyncNome(string nome, bool includeEventos);
        Task<Palestrante> GetAllPalestranteAsyncId(int PalestranteId, bool includeEventos);
    }
}
