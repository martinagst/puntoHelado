using heladeria.Dtos.Usuario;

namespace heladeria.Dtos.Auth;

public class LoginRespuestaDTO
{
    public string Token { get; set; } = string.Empty;
    public UsuarioDTO Usuario { get; set; } = null!;
}