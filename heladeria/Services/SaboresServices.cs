using System.Net;
using Microsoft.EntityFrameworkCore;
using heladeria.Config;
using heladeria.Dtos.Helado;
using heladeria.Models;
using heladeria.Utils.Respuestas;
using heladeria.Dtos.Sabor;
using heladeria.Repositories;

namespace heladeria.Services;

public class SaboresService
{
    private readonly IRepository<Sabor> _repo;
    private readonly TiposHeladoService _tpService;
    public SaboresService(IRepository<Sabor> repo, TiposHeladoService tpService)
    {
        _repo = repo;
        _tpService = tpService;
    }

    public async Task<List<SaborDTO>> ObtenerTodos()
    {
        var lista = await _repo.ObtenerTodos();
        var listaDTO = lista.Select((h) => new SaborDTO()
        {
            Id = h.Id,
            Nombre = h.Nombre,
            IsActivo = h.IsActivo,
            TipoHeladoId = h.TipoHeladoId,
        }).ToList();
        return listaDTO;
    }

    public async Task<Sabor> ObtenerUnoPorId(int id)
    {
        var sb = await _repo.ObtenerUno((p) => p.Id == id, includes: [p => p.TipoHelado]);
        if (sb == null)
        {
            throw new RespuestaError(
                $"El Sabor con id = {id} no se encontro",
                HttpStatusCode.NotFound
            );
        }
        return sb;
    }

    public async Task<Sabor> CrearUno(CrearSaborDTO dto)
    {
        TipoHelado tp = await _tpService.ObtenerUnoPorId(dto.TipoHeladoId);
        var sb = new Sabor()
        {
            Nombre = dto.Nombre,
            IsActivo = dto.IsActivo,
            TipoHelado = tp
        };

        await _repo.CrearUno(sb);
        return sb;
    }

    public async Task<Sabor> ActualizarUnoPorId(int id, ActualizarSaborDTO dto)
    {
        Sabor sb = await ObtenerUnoPorId(id);
        if (dto.Nombre != null)
        {
            sb.Nombre = dto.Nombre;
        }
        if (dto.IsActivo != null)
        {
            sb.IsActivo = (bool)dto.IsActivo;
        }
        if (dto.TipoHeladoId != null)
        {
            TipoHelado tp = await _tpService.ObtenerUnoPorId((int)dto.TipoHeladoId);
            sb.TipoHelado = tp;
        }

        await _repo.ActualizarUno(sb);

        return sb;
    }

    public async Task EliminarUnoPorId(int id)
    {
        Sabor sb = await ObtenerUnoPorId(id);
        await _repo.EliminarUno(sb);
    }

    // public List<Sabor> ObtenerPorIds(List<int> Ids)
    // {
    //     if (Ids == null || Ids.Count == 0)
    //     {
    //         throw new RespuestaError(
    //            "La lista esta vacia",
    //            HttpStatusCode.BadRequest
    //        );
    //     }
    //     var sbs = _db.Sabores
    //         .Include(s => s.TipoHelado)
    //         .Where(p => Ids.Contains(p.Id))
    //         .ToList();
    //     if (sbs.Count != Ids.Distinct().Count())
    //     {
    //         throw new RespuestaError(
    //             "Alguno de los sabores no se encontro",
    //             HttpStatusCode.NotFound
    //         );
    //     }
    //     return sbs;
    // }

    //ObtenerPorIds()
    public async Task<List<Sabor>> ObtenerPorNombres(List<string> nombres)
    {
        if (nombres == null || nombres.Count == 0)
        {
            throw new RespuestaError(
               "La lista esta vacia",
               HttpStatusCode.BadRequest
           );
        }
        var distintos = nombres.Distinct(StringComparer.OrdinalIgnoreCase).ToList();
        var sbs = await _repo.ObtenerTodos(
            (s) => distintos.Contains(s.Nombre),
            includes: [s => s.TipoHelado]
        );
        if (sbs.Count != distintos.Count)
        {
            throw new RespuestaError(
                "Alguno de los sabores no se encontro",
                HttpStatusCode.NotFound
            );
        }
        return sbs;
    }
}