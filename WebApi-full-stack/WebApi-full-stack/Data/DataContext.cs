using Microsoft.EntityFrameworkCore;
using WebApi_full_stack.Model;

namespace WebApi_full_stack.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Evento> Eventos { get; set; }
    }
}