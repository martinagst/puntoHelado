using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace heladeria.Models;

public class Usuario
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string NombreUsuario { get; set; } = string.Empty;
    public string Clave { get; set; } = string.Empty;
    public DateTime FechaAlta { get; set; }
    public List<Rol> Roles { get; set; } = null!;

}