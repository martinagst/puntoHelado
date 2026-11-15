namespace heladeria.Dtos.Sabor;

public class SaborDTO
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public bool IsActivo { get; set; }
    public int TipoHeladoId { get; set; }
}