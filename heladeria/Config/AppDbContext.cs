using Microsoft.EntityFrameworkCore;
using heladeria.Models;

namespace heladeria.Config;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Helado> Helados { get; set; }
    public DbSet<Tamanio> Tamanios { get; set; }
    public DbSet<Salsa> Salsas { get; set; }
    public DbSet<TipoHelado> TiposHelado { get; set; }
    public DbSet<Sabor> Sabores { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Rol> Roles { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tamanio>().HasIndex(t => new { t.Envase, t.CantBochas }).IsUnique();
        modelBuilder.Entity<Salsa>().HasIndex(s => s.Gusto).IsUnique();
        modelBuilder.Entity<TipoHelado>().HasIndex(t => t.Tipo).IsUnique();
        modelBuilder.Entity<Sabor>().HasIndex(sb => sb.Nombre).IsUnique();
        modelBuilder.Entity<Usuario>().HasIndex(u => u.NombreUsuario).IsUnique();

        // Seed
        modelBuilder.Entity<Tamanio>().HasData(
            new Tamanio() { Id = 1, IsActivo = true, Envase = "Vasito", CantBochas = 1, Precio = 3000 },
            new Tamanio() { Id = 2, IsActivo = true, Envase = "Vasito", CantBochas = 2, Precio = 4000 },
            new Tamanio() { Id = 3, IsActivo = true, Envase = "Vasito", CantBochas = 3, Precio = 4500 },
            new Tamanio() { Id = 4, IsActivo = true, Envase = "Cucurucho", CantBochas = 1, Precio = 3500 },
            new Tamanio() { Id = 5, IsActivo = true, Envase = "Cucurucho", CantBochas = 2, Precio = 4500 },
            new Tamanio() { Id = 6, IsActivo = true, Envase = "Cucurucho", CantBochas = 3, Precio = 5000 }

        );

        modelBuilder.Entity<Salsa>().HasData(
            new Salsa() { Id = 1, IsActivo = true, Gusto = "Chocolate" },
            new Salsa() { Id = 2, IsActivo = true, Gusto = "Frutilla" },
            new Salsa() { Id = 3, IsActivo = false, Gusto = "Dulce de Leche" }

        );

        modelBuilder.Entity<TipoHelado>().HasData(
            new TipoHelado() { Id = 1, Tipo = "A la crema" },
            new TipoHelado() { Id = 2, Tipo = "Al agua" }
        );

        modelBuilder.Entity<Sabor>().HasData(
            new Sabor() { Id = 1, Nombre = "Chocolate", IsActivo = true, TipoHeladoId = 1 },
            new Sabor() { Id = 2, Nombre = "Vainilla", IsActivo = true, TipoHeladoId = 1 },
            new Sabor() { Id = 3, Nombre = "Limon a la crema", IsActivo = true, TipoHeladoId = 1 },
            new Sabor() { Id = 4, Nombre = "Dulce de Leche", IsActivo = true, TipoHeladoId = 1 },
            new Sabor() { Id = 5, Nombre = "Limon", IsActivo = true, TipoHeladoId = 2 },
            new Sabor() { Id = 6, Nombre = "Frutilla", IsActivo = true, TipoHeladoId = 2 },
            new Sabor() { Id = 7, Nombre = "Frutos Rojos", IsActivo = true, TipoHeladoId = 2 },
            new Sabor() { Id = 8, Nombre = "Naranja", IsActivo = true, TipoHeladoId = 2 }

        );

        // modelBuilder.Entity<Usuario>().HasData(
        //     new Usuario() { Id = 1, NombreUsuario = "Belu14", Clave = "141026" },
        //     new Usuario() { Id = 2, NombreUsuario = "Marti23", Clave = "231026" }
        // );

        modelBuilder.Entity<Rol>().HasData(
            new Rol() { Id = 1, Nombre = "Admin" },
            new Rol() { Id = 2, Nombre = "User" }
        );

        modelBuilder.Entity<Usuario>()
            .HasMany(p => p.Roles).WithMany()
            .UsingEntity<UsuarioRol>(
                l => l.HasOne<Rol>().WithMany().HasForeignKey(e => e.RolId),
                r => r.HasOne<Usuario>().WithMany().HasForeignKey(e => e.UsuarioId)
            );
    }




}
