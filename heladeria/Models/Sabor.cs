using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace heladeria.Models;

public class Sabor
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public bool IsActivo { get; set; }

    [ForeignKey(nameof(TipoHelado))]
    public int TipoHeladoId { get; set; }
    public TipoHelado TipoHelado { get; set; } = null!;
}