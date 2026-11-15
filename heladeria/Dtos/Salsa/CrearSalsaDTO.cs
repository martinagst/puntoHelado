using System.ComponentModel.DataAnnotations;

namespace heladeria.Dtos.Salsa;

public class CrearSalsaDTO
{
    [Required(ErrorMessage = "Gusto requerido!")]
    [MinLength(2, ErrorMessage = "Minimo 2 para el gusto")]
    public string Gusto { get; set; } = string.Empty;

    [Required]
    public bool IsActivo { get; set; }
}