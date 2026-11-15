using System.ComponentModel.DataAnnotations;

namespace heladeria.Dtos.Helado;

public class CrearHeladoDTO
{
    [Required(ErrorMessage = "Envase requerido!")]
    public string Envase { get; set; } = string.Empty;

    [Required(ErrorMessage = "Cantidad de bochas requeridas!")]
    [Range(1, 3, ErrorMessage = "De 1 a 3 bochas")]
    public int CantBochas { get; set; }
    public string? Salsa { get; set; }

    [Required(ErrorMessage = "Se requiere un sabor como minimo")]
    [MinLength(1, ErrorMessage = "Minimo un sabor")]
    public List<string> Sabores { get; set; } = new();
}
