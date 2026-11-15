using System.ComponentModel.DataAnnotations;

namespace heladeria.Dtos.Sabor;

public class CrearSaborDTO
{
    [Required(ErrorMessage = "Nombre requerido!")]
    [MinLength(2, ErrorMessage = "Minimo 2 para el nombre")]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    public bool IsActivo { get; set; }

    [Required]
    public int TipoHeladoId { get; set; }
}