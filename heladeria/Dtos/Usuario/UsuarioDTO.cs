using heladeria.Models;

namespace heladeria.Dtos.Usuario;

public class UsuarioDTO
{
    public int Id { get; set; }
    public string NombreUsuario { get; set; } = string.Empty;
    public DateTime FechaAlta { get; set; }
    public List<Rol> Roles { get; set; } = null!;
}