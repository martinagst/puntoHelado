using System.ComponentModel.DataAnnotations;

namespace heladeria.Dtos.Salsa;

public class ActualizarSalsaDTO
{
    [MinLength(2, ErrorMessage = "Minimo 2 para el gusto")]
    public string? Gusto { get; set; }

    public bool? IsActivo { get; set; }
}