using System.ComponentModel.DataAnnotations;

namespace heladeria.Dtos.Auth;

public class LoginDTO
{
    [Required]
    public string Usuario { get; set; } = string.Empty;

    [Required]
    [MinLength(4)]
    public string Clave { get; set; } = string.Empty;
}