using System.ComponentModel.DataAnnotations;

namespace heladeria.Dtos.TipoHelado;

public class CrearActualizarTipoDTO
{
    [Required]
    [MinLength(2)]
    public string Tipo { get; set; } = string.Empty;
}