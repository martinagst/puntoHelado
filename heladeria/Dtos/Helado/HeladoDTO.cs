
namespace heladeria.Dtos.Helado;

public class HeladoDTO
{
    public int Id { get; set; }
    public bool IsActivo { get; set; }
    public string Envase { get; set; } = string.Empty;
    public int CantBochas { get; set; }
    public double Precio { get; set; }
    public string? Salsa { get; set; }
    public List<string> Sabores { get; set; } = new();
}