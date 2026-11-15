using System.ComponentModel.DataAnnotations;

namespace heladeria.Dtos.Tamanio;

//CrearActualizarTamanioDTO.cs
public class ActualizarTamanioDTO
{
    [RegularExpression("(?i)^(Vasito|Cucurucho)$", ErrorMessage = "Envase: Vasito o Cucurucho")]
    public string? Envase { get; set; }

    [Range(1, 3, ErrorMessage = "De 1 a 3 bochas")]
    public int? CantBochas { get; set; }

    [Range(1, double.MaxValue, ErrorMessage = "Precio positivo")]
    public double? Precio { get; set; }

    public bool? IsActivo { get; set; }
}
