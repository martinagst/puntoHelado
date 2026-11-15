using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace heladeria.Models;

public class Tamanio
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public bool IsActivo { get; set; }
    public string Envase { get; set; } = string.Empty;
    public int CantBochas { get; set; }
    public double Precio { get; set; }

}