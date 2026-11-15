using System.Net;
using heladeria.Dtos.Helado;
using heladeria.Models;
using heladeria.Repositories;
using heladeria.Utils.Respuestas;

namespace heladeria.Services;

public class HeladosService
{
    private readonly IRepository<Helado> _repo;
    private readonly TamaniosService _taService;
    private readonly SalsasService _saService;
    private readonly SaboresService _sbService;

    public static readonly string[] _incluir = ["Tamanio", "Salsa", "HeladoSabores.Sabor"];

    public HeladosService(IRepository<Helado> repo, TamaniosService taService, SalsasService saService, SaboresService sbService)
    {
        _repo = repo;
        _taService = taService;
        _saService = saService;
        _sbService = sbService;
    }

    public static HeladoDTO ADto(Helado h) => new HeladoDTO()
    {
        Id = h.Id,
        IsActivo = h.IsActivo,
        Envase = h.Tamanio.Envase,
        CantBochas = h.Tamanio.CantBochas,
        Precio = h.Tamanio.Precio,
        Salsa = h.Salsa?.Gusto,
        Sabores = h.HeladoSabores.Select(hs => hs.Sabor.Nombre).ToList(),
    };
    public async Task<List<HeladoDTO>> ObtenerTodos() => (await _repo.ObtenerTodos(includePaths: _incluir)).Select(ADto).ToList();

    public async Task<Helado> ObtenerUnoPorId(int id)
    {
        var he = await _repo.ObtenerUno((h) => h.Id == id, includePaths: _incluir);
        if (he == null)
        {
            throw new RespuestaError(
                $"El Helado con id = {id} no se encontro",
                HttpStatusCode.NotFound
            );
        }
        return he;
    }

    public async Task<Helado> CrearUno(CrearHeladoDTO dto)
    {
        Tamanio ta = await _taService.ObtenerPorEnvaseYBochas(dto.Envase, dto.CantBochas);
        Salsa? sa = dto.Salsa != null ? await _saService.ObtenerPorGusto(dto.Salsa) : null;
        List<Sabor> sabores = await _sbService.ObtenerPorNombres(dto.Sabores);

        var he = new Helado()
        {
            Tamanio = ta,
            Salsa = sa,
            HeladoSabores = dto.Sabores
                .Select(n => new HeladoSabor()
                {
                    Sabor = sabores.First(s => string.Equals(s.Nombre, n, StringComparison.OrdinalIgnoreCase))
                })
                .ToList(),
        };

        await _repo.CrearUno(he);
        return he;
    }

    public async Task<Helado> ActualizarUnoPorId(int id, ActualizarHeladoDTO dto)
    {
        Helado he = await ObtenerUnoPorId(id);
        if (dto.Envase != null || dto.CantBochas != null)
        {
            string envase = dto.Envase ?? he.Tamanio.Envase;
            int cantBochas = dto.CantBochas ?? he.Tamanio.CantBochas;
            he.Tamanio = await _taService.ObtenerPorEnvaseYBochas(envase, cantBochas);
        }
        if (dto.Salsa != null)
        {
            he.Salsa = await _saService.ObtenerPorGusto(dto.Salsa);
        }
        if (dto.IsActivo != null)
        {
            he.IsActivo = (bool)dto.IsActivo;
        }
        if (dto.Sabores != null)
        {
            var sabores = await _sbService.ObtenerPorNombres(dto.Sabores);
            he.HeladoSabores.Clear();
            foreach (var n in dto.Sabores)
            {
                he.HeladoSabores.Add(new HeladoSabor()
                {
                    Sabor = sabores.First(s => string.Equals(s.Nombre, n, StringComparison.OrdinalIgnoreCase))
                });
            }
        }

        await _repo.ActualizarUno(he);

        return he;
    }

    public async Task EliminarUnoPorId(int id)
    {
        Helado he = await ObtenerUnoPorId(id);
        await _repo.EliminarUno(he);
    }
}