using System.ComponentModel.DataAnnotations;

namespace heladeria.Dtos.Helado;

public class ActualizarHeladoDTO
{
    [RegularExpression("^(Vasito|Cucurucho)$", ErrorMessage = "Envase: Vasito, Cucurucho")]
    public string? Envase { get; set; }

    [Range(1, 3, ErrorMessage = "De 1 a 3 bochas")]
    public int? CantBochas { get; set; }

    public string? Salsa { get; set; }

    public bool? IsActivo { get; set; }

    [MinLength(1, ErrorMessage = "Minimo un sabor")]
    public List<string>? Sabores { get; set; }
}
