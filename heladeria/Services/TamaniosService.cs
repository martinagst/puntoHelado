using System.Net;
using heladeria.Config;
using heladeria.Dtos.Tamanio;
using heladeria.Models;
using heladeria.Repositories;
using heladeria.Utils.Respuestas;

namespace heladeria.Services;

public class TamaniosService
{
    private readonly IRepository<Tamanio> _repo;
    public TamaniosService(IRepository<Tamanio> repo)
    {
        _repo = repo;
    }

    public async Task<List<Tamanio>> ObtenerTodos() => await _repo.ObtenerTodos();

    public async Task<Tamanio> ObtenerUnoPorId(int id)
    {
        var ta = await _repo.ObtenerUno((h) => h.Id == id);
        if (ta == null)
        {
            throw new RespuestaError(
                $"Tamanio con id = {id} no se encontro",
                HttpStatusCode.NotFound
            );
        }
        return ta;
    }
    public async Task<Tamanio> ObtenerPorEnvaseYBochas(string envase, int cantBochas)
    {
        var ta = await _repo.ObtenerUno((h) => h.Envase == envase && h.CantBochas == cantBochas);
        if (ta == null)
        {
            throw new RespuestaError(
                $"No existe el tamanio {envase} con bochas = {cantBochas}",
                HttpStatusCode.NotFound
            );
        }
        return ta;
    }

    //  POR EL MOMENTO NO SE CREA OTRO TIPO DE TAMANIO
    // public Tamanio CrearUno(CrearTamanioDTO dto)
    // {
    //     var ta = new Tamanio()
    //     {
    //         Envase = dto.Envase,
    //         CantBochas = dto.CantBochas,
    //         Precio = dto.Precio,
    //         IsActivo = dto.IsActivo
    //     };

    //     _db.Tamanios.Add(ta);
    //     _db.SaveChanges();
    //     return ta;
    // }

    public async Task<Tamanio> ActualizarUnoPorId(int id, ActualizarTamanioDTO dto)
    {
        Tamanio ta = await ObtenerUnoPorId(id);
        if (dto.Envase != null)
        {
            ta.Envase = dto.Envase;
        }
        if (dto.CantBochas != null)
        {
            ta.CantBochas = (int)dto.CantBochas;
        }
        if (dto.Precio != null)
        {
            ta.Precio = (double)dto.Precio;
        }
        if (dto.IsActivo != null)
        {
            ta.IsActivo = (bool)dto.IsActivo;
        }

        await _repo.ActualizarUno(ta);

        return ta;
    }

    public async Task EliminarUnoPorId(int id)
    {
        Tamanio ta = await ObtenerUnoPorId(id);
        await _repo.EliminarUno(ta);
    }
}
