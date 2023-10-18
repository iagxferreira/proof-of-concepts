using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Models
{
    [Table("categorias")]
    public class Categoria
    {
        [Key]
        public int Id { get; set; }


        [Required(ErrorMessage = "O nome da categoria deve ser informado.")]
        [Display(Name = "Nome da categoria")]
        [StringLength(100, ErrorMessage = "O tamanho máximo é de 100 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [StringLength(200, ErrorMessage = "O tamanho máximo é de 200 caracteres")]
        [Required(ErrorMessage = "A descrição da categoria deve ser informada.")]
        [Display(Name = "Descrição da categoria")]
        public string Descricao { get; set; } = string.Empty;

        public List<Lanche> Lanches { get; set;} = new List<Lanche>();
    }
}
