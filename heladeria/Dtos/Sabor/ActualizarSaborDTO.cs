using System.ComponentModel.DataAnnotations;

namespace heladeria.Dtos.Sabor;

public class ActualizarSaborDTO
{
    [MinLength(2, ErrorMessage = "Minimo 2 para el nombre")]
    public string? Nombre { get; set; }

    public bool? IsActivo { get; set; }

    [MinLength(1, ErrorMessage = "Un tipo de helado")]
    public int? TipoHeladoId { get; set; }

}