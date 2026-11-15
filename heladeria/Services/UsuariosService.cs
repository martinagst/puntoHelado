using System.Net;
using heladeria.Config;
using heladeria.Dtos.Usuario;
using heladeria.Enums;
using heladeria.Models;
using heladeria.Repositories;
using heladeria.Utils.Respuestas;

namespace heladeria.Services;

public class UsuariosService
{
    private readonly IRepository<Usuario> _repo;
    private readonly RolesService _rolesService;
    private readonly IEncoderService _encoder;
    public UsuariosService(IRepository<Usuario> repo, RolesService rolesService, IEncoderService encoder)
    {
        _repo = repo;
        _rolesService = rolesService;
        _encoder = encoder;
    }

    public async Task<List<UsuarioDTO>> ObtenerTodos()
    {
        var lista = await _repo.ObtenerTodos();
        var usuariosDTO = lista.Select(u => new UsuarioDTO()
        {
            Id = u.Id,
            NombreUsuario = u.NombreUsuario,
            FechaAlta = u.FechaAlta,
            Roles = u.Roles
        }).ToList();
        return usuariosDTO;
    }

    public async Task<Usuario> ObtenerUnoPorId(int id)
    {
        var u = await _repo.ObtenerUno((u) => u.Id == id, includes: [u => u.Roles]);
        if (u == null)
        {
            throw new RespuestaError(
                $"El Usuario con id = {id} no se encontro",
                HttpStatusCode.NotFound
            );
        }
        return u;
    }

    public async Task<Usuario> ObtenerUnoPorNombreUsuario(string nombreUsuario)
    {
        var u = await _repo.ObtenerUno((p) => p.NombreUsuario == nombreUsuario, includes: [u => u.Roles]);
        if (u == null)
        {
            throw new RespuestaError(
                "El Usuario no se encontro",
                HttpStatusCode.NotFound
            );
        }
        return u;
    }

    public async Task<Usuario> CrearUno(CrearUsuarioDTO dto)
    {
        var u = await _repo.ObtenerUno(u => u.NombreUsuario == dto.NombreUsuario);

        if (u != null)
        {
            throw new RespuestaError(
                "El Nombre de Usuario no esta disponible",
                HttpStatusCode.BadRequest
            );
        }

        var rol = await _rolesService.ObtenerUnoPorNombre(ROL.USER);
        Usuario usuario = new Usuario()
        {
            NombreUsuario = dto.NombreUsuario,
            Clave = _encoder.Encode(dto.Clave),
            Roles = new List<Rol>() { rol }
        };

        await _repo.CrearUno(usuario);
        return usuario;
    }

    public async Task<Usuario> ActualizarRolesById(int id, ActualizarRolesDTO dto)
    {
        Usuario usuario = await ObtenerUnoPorId(id);
        var roles = await _rolesService.ObtenerPorIds(dto.RolesIds);
        usuario.Roles = roles;
        var updated = await _repo.ActualizarUno(usuario);
        return updated;
    }
}