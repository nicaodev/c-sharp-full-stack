using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using WebApi_full_stack.Model;

namespace WebApi_full_stack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly ILogger<EventoController> _logger;

        public EventoController(ILogger<EventoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Evento>> Get()
        {
            return new Evento[]
            {
                new Evento()
                {
                Id = Guid.NewGuid(),
                CargaHoraria=20,
                Cidade = "Valparaíso de Goiás",
                Data = DateTime.Now.AddDays(7).ToString("dd/MM/yyyy"),
                Nome = "Curso de Angular"
                }
            };
        }
    }
}