using heladeria.Models;
using heladeria.Repositories;
using heladeria.Utils.Respuestas;
using System.Net;

namespace heladeria.Services;

public class RolesService
{
    private readonly IRepository<Rol> _repo;
    public RolesService(IRepository<Rol> repo)
    {
        _repo = repo;
    }

    public async Task<List<Rol>> ObtenerTodos() => await _repo.ObtenerTodos();

    public async Task<Rol> ObtenerUnoPorNombre(string nombre)
    {
        var rol = await _repo.ObtenerUno((r) => r.Nombre == nombre);
        if (rol == null)
        {
            throw new RespuestaError(
                "El Rol no se encontro",
                HttpStatusCode.NotFound
            );
        }
        return rol;
    }

    public async Task<List<Rol>> ObtenerPorIds(List<int> Ids)
    {
        if (Ids == null || Ids.Count == 0)
        {
            throw new RespuestaError(
                "La lista esta vacia",
                HttpStatusCode.BadRequest
            );
        }

        var roles = await _repo.ObtenerTodos(p => Ids.Contains(p.Id));
        return roles;
    }
}