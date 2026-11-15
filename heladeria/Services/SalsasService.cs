using System.Net;
using heladeria.Config;
using heladeria.Dtos.Salsa;
using heladeria.Models;
using heladeria.Repositories;
using heladeria.Utils.Respuestas;

namespace heladeria.Services;

public class SalsasService
{
    private readonly IRepository<Salsa> _repo;
    public SalsasService(IRepository<Salsa> repo)
    {
        _repo = repo;
    }

    public async Task<List<Salsa>> ObtenerTodos() => await _repo.ObtenerTodos();

    public async Task<Salsa> ObtenerUnoPorId(int id)
    {
        var sa = await _repo.ObtenerUno((h) => h.Id == id);
        if (sa == null)
        {
            throw new RespuestaError(
                $"La Salsa con id = {id} no se encontro",
                HttpStatusCode.NotFound
            );
        }
        return sa;
    }

    public async Task<Salsa> ObtenerPorGusto(string gusto)
    {
        var sa = await _repo.ObtenerUno((s) => s.Gusto == gusto);
        if (sa == null)
        {
            throw new RespuestaError(
                $"La Salsa '{gusto}' no se encontro",
                HttpStatusCode.NotFound
            );
        }
        return sa;
    }

    public async Task<Salsa> CrearUno(CrearSalsaDTO dto)
    {
        var sa = new Salsa()
        {
            Gusto = dto.Gusto,
            IsActivo = dto.IsActivo
        };

        await _repo.CrearUno(sa);
        return sa;
    }

    public async Task<Salsa> ActualizarUnoPorId(int id, ActualizarSalsaDTO dto)
    {
        Salsa sa = await ObtenerUnoPorId(id);
        if (dto.Gusto != null)
        {
            sa.Gusto = dto.Gusto;
        }
        if (dto.IsActivo != null)
        {
            sa.IsActivo = (bool)dto.IsActivo;
        }

        await _repo.ActualizarUno(sa);

        return sa;
    }

    public async Task EliminarUnoPorId(int id)
    {
        Salsa sa = await ObtenerUnoPorId(id);
        await _repo.EliminarUno(sa);
    }
}
