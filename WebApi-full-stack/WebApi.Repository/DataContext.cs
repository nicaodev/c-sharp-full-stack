using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApi.Domain;
using WebApi.Domain.Identity;

namespace WebApi.Repository
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>,
                                                UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>,
                                                IdentityUserToken<int>> // Criará estas tabelas.
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<PalestranteEvento> PalestranteEventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<RedeSocial> RedeSociais { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserRole>(userRole =>
            {
                // Relacionamento da tabela UserRole por meio dos campos abaixo.
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                //Relacionamento n-n tabela UserRoles -> Role. E após Role -> UserRoles
                userRole.HasOne(ur => ur.Role)
                               .WithMany(r => r.UserRoles)
                                .HasForeignKey(ur => ur.RoleId)
                                .IsRequired();

                userRole.HasOne(ur => ur.User)
                                .WithMany(r => r.UserRoles)
                                .HasForeignKey(ur => ur.UserId)
                                .IsRequired();
            });
            modelBuilder.Entity<PalestranteEvento>().HasKey(PE => new { PE.EventoId, PE.PalestranteId });
        }
    }
}