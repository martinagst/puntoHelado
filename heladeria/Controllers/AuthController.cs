using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using heladeria.Dtos.Auth;
using heladeria.Dtos.Usuario;
using heladeria.Services;
using heladeria.Utils.Respuestas;
using heladeria.Enums;

namespace heladeria.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth;
    private readonly UsuariosService _usuarioService;

    public AuthController(IAuthService auth, UsuariosService usuarioService)
    {
        _auth = auth;
        _usuarioService = usuarioService;
    }

    [HttpPost("login")]
    [ProducesResponseType(typeof(Respuesta), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(Respuesta), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Respuesta>> Login([FromBody] LoginDTO dto)
    {
        try
        {
            var response = await _auth.Login(dto);
            RespuestaExito exito = new RespuestaExito(
            $"Bienvenido {dto.Usuario}!",
            HttpStatusCode.OK,
            response
        );
            return StatusCode((int)exito.CodigoEstado, exito.Res);
        }
        catch (RespuestaError error)
        {
            return StatusCode(
                (int)error.CodigoEstado,
                error.Res
            );
        }
        catch (Exception error)
        {
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                new Respuesta(error.Message)
            );
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult<Respuesta>> Register([FromBody] CrearUsuarioDTO dto)
    {
        try
        {
            var usuario = await _usuarioService.CrearUno(dto);
            RespuestaExito exito = new RespuestaExito(
                $"Usuario Creado!: {dto.NombreUsuario}",
                HttpStatusCode.Created,
                usuario
            );
            return StatusCode((int)exito.CodigoEstado, exito.Res);
        }
        catch (RespuestaError error)
        {
            return StatusCode(
                (int)error.CodigoEstado,
                error.Res
            );
        }
        catch (Exception error)
        {
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                new Respuesta(error.Message)
            );
        }
    }

    [HttpPut("roles/{usuarioId}")]
    [Authorize(Roles = ROL.ADMIN)]
    [ProducesResponseType(typeof(Respuesta), StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Respuesta>> ActualizarRoles(int usuarioId, [FromBody] ActualizarRolesDTO dto)
    {
        try
        {
            var usuario = await _usuarioService.ActualizarRolesById(usuarioId, dto);
            RespuestaExito exito = new RespuestaExito(
                "Rol actualizado!",
                HttpStatusCode.OK,
                usuario
            );
            return StatusCode((int)exito.CodigoEstado, exito.Res);
        }
        catch (RespuestaError error)
        {
            return StatusCode(
                (int)error.CodigoEstado,
                error.Res
            );
        }
        catch (Exception error)
        {
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                new Respuesta(error.Message)
            );
        }
    }
}