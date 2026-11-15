using System.Net;
using Microsoft.AspNetCore.Mvc;
using heladeria.Dtos.Tamanio;
using heladeria.Models;
using heladeria.Services;
using heladeria.Utils.Respuestas;
using Microsoft.AspNetCore.Authorization;
using heladeria.Enums;

namespace heladeria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public class TamaniosController : ControllerBase
    {
        private readonly TamaniosService _service;
        public TamaniosController(TamaniosService service)
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

        [HttpGet("{id}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(Respuesta), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(Respuesta), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Respuesta>> ObtenerUnoPorId(int id)
        {
            try
            {
                var ta = await _service.ObtenerUnoPorId(id);
                RespuestaExito exito = new RespuestaExito(
                    "Id encontrado!",
                    HttpStatusCode.OK,
                    ta
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

        //POR EL MOMENTO NO SE CREAN OTROS TAMANIOS, SOLO  VASITO Y CUCURUCHO
        // [HttpPost]
        // [ProducesResponseType(typeof(Respuesta), StatusCodes.Status201Created)]
        // public ActionResult<Respuesta> CrearUnTamanio([FromBody] CrearTamanioDTO crearDto)
        // {
        //     try
        //     {
        //         var tamanio = _service.CrearUno(crearDto);
        //         RespuestaExito exito = new RespuestaExito(
        //             "Creado correctamente!",
        //             HttpStatusCode.Created,
        //             tamanio
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
        public async Task<ActionResult<Respuesta>> ActualizarUno(int id, [FromBody] ActualizarTamanioDTO dto)
        {
            try
            {
                var ta = await _service.ActualizarUnoPorId(id, dto);
                RespuestaExito exito = new RespuestaExito(
                    "Actualizado correctamente!",
                    HttpStatusCode.OK,
                    ta
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