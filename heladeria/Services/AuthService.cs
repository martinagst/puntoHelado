using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using heladeria.Dtos.Auth;
using heladeria.Dtos.Usuario;
using heladeria.Models;
using heladeria.Utils.Respuestas;

namespace heladeria.Services;

public interface IAuthService
{
    public Task<LoginRespuestaDTO> Login(LoginDTO login);
}

public class AuthService : IAuthService
{
    private readonly string _secret;

    private readonly UsuariosService _usuarioService;
    private readonly IEncoderService _encoder;
    public AuthService(IConfiguration config, UsuariosService usuarioService, IEncoderService encoder)
    {
        string secret = config.GetSection("JWT:Secret").Value ?? string.Empty;
        _secret = secret;
        _usuarioService = usuarioService;
        _encoder = encoder;
    }

    public async Task<LoginRespuestaDTO> Login(LoginDTO login)
    {
        Usuario usuario;
        try
        {
            usuario = await _usuarioService.ObtenerUnoPorNombreUsuario(login.Usuario);
        }
        catch
        {
            throw new RespuestaError("Credenciales invalidas", HttpStatusCode.BadRequest);
        }

        bool IsVerified = _encoder.Verify(login.Clave, usuario.Clave);

        if (!IsVerified)
        {
            throw new RespuestaError("Credenciales invalidas", HttpStatusCode.BadRequest);
        }

        string token = GenerarJwtToken(usuario);
        UsuarioDTO dto = new UsuarioDTO()
        {
            Id = usuario.Id,
            NombreUsuario = usuario.NombreUsuario,
            FechaAlta = usuario.FechaAlta,
            Roles = usuario.Roles
        };

        return new LoginRespuestaDTO()
        {
            Token = token,
            Usuario = dto
        };
    }

    private string GenerarJwtToken(Usuario usuario)
    {
        var claims = new ClaimsIdentity();

        claims.AddClaim(new Claim("Id", usuario.Id.ToString()));
        claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, usuario.NombreUsuario));

        if (usuario.Roles.Count > 0)
        {
            foreach (var rol in usuario.Roles)
            {
                claims.AddClaim(new Claim(ClaimTypes.Role, rol.Nombre));
            }
        }

        byte[] bytes = Encoding.UTF8.GetBytes(_secret);
        SymmetricSecurityKey key = new SymmetricSecurityKey(bytes);

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = claims,
            Expires = DateTime.UtcNow.AddMinutes(8),
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);
        string token = tokenHandler.WriteToken(tokenConfig);
        return token;
    }
}