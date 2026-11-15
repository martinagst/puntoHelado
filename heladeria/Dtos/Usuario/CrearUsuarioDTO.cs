using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace heladeria.Dtos.Usuario;

public class CrearUsuarioDTO
{
    [Required]
    [MinLength(2)]
    public string NombreUsuario { get; set; } = string.Empty;

    [Required]
    [MinLength(4)]
    public string Clave { get; set; } = string.Empty;
}