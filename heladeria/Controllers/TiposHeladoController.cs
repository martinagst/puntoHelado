using System.Net;
using Microsoft.AspNetCore.Mvc;
using heladeria.Dtos.TipoHelado;
using heladeria.Models;
using heladeria.Services;
using heladeria.Utils.Respuestas;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using heladeria.Enums;

namespace heladeria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public class TiposHeladoController : ControllerBase
    {
        private readonly TiposHeladoService _service;
        public TiposHeladoController(TiposHeladoService service)
        {
            _service = service;
        }

        [HttpGet]
        [AllowAnonymous]
        [ProducesResponseType(typeof(Respuesta), StatusCodes.Status200OK)]
        public async Task<ActionResult<Respuesta>> ObtenerTodos()
        {
            try
            {
                var todos = await _service.ObtenerTodos();
                RespuestaExito exito = new RespuestaExito(
                    "Listado obtenido!",
                    HttpStatusCode.OK,
                    todos
                );

                return StatusCode((int)exito.CodigoEstado, exito.Res);
            }
            catch (Exception error)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new Respuesta(error.Message)
                );
            }
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(Respuesta), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Respuesta), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Respuesta>> ObtenerUnoPorId(int id)
        {
            try
            {
                var tp = await _service.ObtenerUnoPorId(id);
                RespuestaExito exito = new RespuestaExito(
                    "Id encontrado!",
                    HttpStatusCode.OK,
                    tp
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

        //POR EL MOMENTO NO SE CREAN TIPOS DE HELADO
        // [HttpPost]
        // [ProducesResponseType(typeof(Respuesta), StatusCodes.Status201Created)]
        // public ActionResult<Respuesta> CrearUnTipoHelado([FromBody] CrearActualizarTipoDTO crearDto)
        // {
        //     try
        //     {
        //         var tipoHelado = _service.CrearUno(crearDto);
        //         RespuestaExito exito = new RespuestaExito(
        //             "Creado correctamente!",
        //             HttpStatusCode.Created,
        //             tipoHelado
        //         );

        //         return StatusCode((int)exito.CodigoEstado, exito.Res);
        //     }
        //     catch (Exception error)
        //     {
        //         return StatusCode(
        //             StatusCodes.Status500InternalServerError,
        //             new Respuesta(error.Message)
        //         );
        //     }
        // }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Respuesta), StatusCodes.Status200OK)]
        [Authorize(Roles = $"{ROL.ADMIN}")]
        public async Task<ActionResult<Respuesta>> ActualizarUno(int id, [FromBody] CrearActualizarTipoDTO dto)
        {
            try
            {
                var tp = await _service.ActualizarUnoPorId(id, dto);
                RespuestaExito exito = new RespuestaExito(
                    "Actualizado correctamente!",
                    HttpStatusCode.OK,
                    tp
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

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(Respuesta), StatusCodes.Status200OK)]
        [Authorize(Roles = $"{ROL.ADMIN}")]
        public async Task<ActionResult<Respuesta>> EliminarUno(int id)
        {
            try
            {
                await _service.EliminarUnoPorId(id);
                RespuestaExito exito = new RespuestaExito(
                    "Eliminado correctamente!",
                    HttpStatusCode.OK
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
}