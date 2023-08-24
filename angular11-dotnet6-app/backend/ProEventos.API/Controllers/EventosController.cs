using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Data;
using ProEventos.Application;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/eventos")]
public class EventosController : ControllerBase
{
    private readonly DataContext _context;
    public IEnumerable<Evento> _eventos = new[] {
        new Evento(){
            Id = 1,
            Tema = "Angular 11 e .NET 5",
            Local = "Belo Horizonte",
            Lote = new Lote(),
            QtdPessoas = 250,
            DataEvento = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
            ImagemURL = "foto.png"
        },
        new Evento(){
            Id = 2,
            Tema = "Angular e suas novidades",
            Local = "São Paulo",
            Lote = new Lote(),
            QtdPessoas = 350,
            DataEvento = DateTime.Now.AddDays(3).ToString("dd/MM/yyyy"),
            ImagemURL = "foto.png"
        }
    };

    public EventosController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Evento>? Get()
    {
        return _context.Eventos;
    }

    [HttpGet("{id}")]
    public Evento? GetById(int id)
    {
        return _context.Eventos?.FirstOrDefault(evento => evento.Id == id);
    }

    [HttpPost]
    public string Post()
    {
        return "exemplo post";
    }

    [HttpPut("{id}")]
    public string Put(int id)
    {
        return $"exemplo put {id}";
    }

    [HttpDelete("{id}")]
    public string Delete(int id)
    {
        return $"exemplo delete {id}";
    }
}
