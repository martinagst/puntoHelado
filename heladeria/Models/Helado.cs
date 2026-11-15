using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace heladeria.Models;

public class Helado
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public bool IsActivo { get; set; } = true;
    [ForeignKey(nameof(Tamanio))]
    public int TamanioId { get; set; }
    public Tamanio Tamanio { get; set; } = null!;

    [ForeignKey(nameof(Salsa))]
    public int? SalsaId { get; set; }
    public Salsa? Salsa { get; set; }

    public List<HeladoSabor> HeladoSabores { get; set; } = new();

}