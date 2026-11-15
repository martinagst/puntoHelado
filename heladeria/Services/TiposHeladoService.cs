using System.Net;
using heladeria.Config;
using heladeria.Dtos.TipoHelado;
using heladeria.Models;
using heladeria.Repositories;
using heladeria.Utils.Respuestas;

namespace heladeria.Services;

public class TiposHeladoService
{
    private readonly IRepository<TipoHelado> _repo;
    public TiposHeladoService(IRepository<TipoHelado> repo)
    {
        _repo = repo;
    }

    public async Task<List<TipoHelado>> ObtenerTodos() => await _repo.ObtenerTodos();


    public async Task<TipoHelado> ObtenerUnoPorId(int id)
    {
        var tp = await _repo.ObtenerUno((h) => h.Id == id);
        if (tp == null)
        {
            throw new RespuestaError(
                $"El Tipo de helado con id = {id} no se encontro",
                HttpStatusCode.NotFound
            );
        }
        return tp;
    }

    // public TipoHelado CrearUno(CrearActualizarTipoDTO dto)
    // {
    //     var tp = new TipoHelado()
    //     {
    //         Tipo = dto.Tipo,
    //     };

    //     _db.TiposHelado.Add(tp);
    //     _db.SaveChanges();
    //     return tp;
    // }

    public async Task<TipoHelado> ActualizarUnoPorId(int id, CrearActualizarTipoDTO dto)
    {
        TipoHelado tp = await ObtenerUnoPorId(id);
        if (dto.Tipo != null)
        {
            tp.Tipo = dto.Tipo;
        }

        await _repo.ActualizarUno(tp);

        return tp;
    }

    public async Task EliminarUnoPorId(int id)
    {
        TipoHelado tp = await ObtenerUnoPorId(id);
        await _repo.EliminarUno(tp);
    }
}
