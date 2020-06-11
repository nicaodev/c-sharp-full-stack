using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using WebApi_full_stack.Data;
using WebApi_full_stack.Model;

namespace WebApi_full_stack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventoController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ILogger<EventoController> _logger;

        public EventoController(ILogger<EventoController> logger, DataContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Evento>> Get()
        {
            return _context.Eventos.ToList();
        }
    }
}