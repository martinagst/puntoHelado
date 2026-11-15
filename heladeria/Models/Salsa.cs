using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace heladeria.Models;

public class Salsa
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public string Gusto { get; set; } = string.Empty;
    public bool IsActivo { get; set; }

}