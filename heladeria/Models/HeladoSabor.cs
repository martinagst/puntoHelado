using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace heladeria.Models;

public class HeladoSabor
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public int HeladoId { get; set; }
    public int SaborId { get; set; }
    public Sabor Sabor { get; set; } = null!;
}