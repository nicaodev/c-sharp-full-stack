using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Domain;

namespace WebApi.Repository
{
    public class Repository : IRepository
    {
        private readonly DataContext _context;
        public Repository(DataContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking; // same .AsNoTracking()
        }
        // GERAIS
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
        // EVENTOS
        public async Task<Evento[]> GetAllEventoAsync(bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos.Include(c => c.Lotes).Include(c => c.RedesSociais);

            if (includePalestrantes)
                query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(p => p.Palestrante);

            query = query.AsNoTracking().OrderBy(x => x.Data);

            return await query.ToArrayAsync();
        }
        public async Task<Evento[]> GetAllEventoAsyncNome(string tema, bool includePalestrantes)
        {
            IQueryable<Evento> query = _context.Eventos.Include(c => c.Lotes).Include(c => c.RedesSociais);

            if (includePalestrantes)
                query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(p => p.Palestrante);

            query = query.AsNoTracking().OrderByDescending(x => x.Data).Where(x => x.Nome.ToLower().Contains(tema.ToLower()));

            return await query.ToArrayAsync();
        }
        public async Task<Evento> GetAllEventoAsyncId(int id, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos.Include(c => c.Lotes).Include(c => c.RedesSociais);

            if (includePalestrantes)
                query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(p => p.Palestrante);

            query = query.AsNoTracking().OrderByDescending(x => x.Data).Where(x => x.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        // PALESTRANTES
        public async Task<Palestrante[]> GetAllPalestranteAsyncNome(string nome, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes.Include(c => c.RedesSociais);

            if (includeEventos)
                query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(p => p.Evento);

            query = query.AsNoTracking().Where(p => p.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }
        public async Task<Palestrante> GetAllPalestranteAsyncId(int PalestranteId, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes.Include(c => c.RedesSociais);

            if (includeEventos)
                query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(p => p.Evento);

            query = query.OrderBy(x => x.Nome).Where(p => p.Id == PalestranteId);

            return await query.FirstOrDefaultAsync();
        }
    }
}
