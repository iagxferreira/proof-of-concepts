using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.Models
{
    [Table("lanches")]
    public class Lanche
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome do lanche deve ser informado.")]
        [Display(Name = "Nome do Lanche")]
        [StringLength(80, MinimumLength = 10, ErrorMessage = " O nome deve ter no mínimo {1} e no máximo {2} caracteres")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "A descrição do lanche deve ser informada.")]
        [Display(Name = "Descrição do Lanche")]
        [MinLength(20, ErrorMessage = "Descrição deve ter no mínimo {1} caracteres.")]
        [MaxLength(200, ErrorMessage = "Descrição não pode exceder {1} caracteres.")]
        public string DescricaoCurta { get; set; } = string.Empty;

        [Required(ErrorMessage = "A descrição do lanche deve ser informada.")]
        [Display(Name = "Descrição do Lanche")]
        [MinLength(20, ErrorMessage = "Descrição detalhada deve ter no mínimo {1} caracteres.")]
        [MaxLength(200, ErrorMessage = "Descrição detalhada não pode exceder {1} caracteres.")]
        public string DescricaoLonga { get; set; } = string.Empty;


        [Required(ErrorMessage = "Informe o preço do lanche.")]
        [Display(Name = "Preço")]
        [Column(TypeName = "decimal(10,2)")]
        [Range(1, 999.99, ErrorMessage = "O {0} deve estar entre 1 e 999,99")]
        public decimal Preco { get; set; }

        [Display(Name = "Caminho imagem normal")]
        [StringLength(200, ErrorMessage = "O {0} deve ter no máximo {1} caracteres")]
        public string ImagemUrl { get; set; } = string.Empty;

        [Display(Name = "Caminho imagem miniatura")]
        [StringLength(200, ErrorMessage = "O {0} deve ter no máximo {1} caracteres")]
        public string ImagemThumbnailUrl { get; set; } = string.Empty;

        [Display(Name = "Preferido?")]
        public bool IsLanchePreferido {  get; set; }

        [Display(Name = "Estoque?")]
        public bool EmEstoque {  get; set; }

        [NotMapped]
        public DateTime DataDeCriacao {  get; set; }

        public int CategoriaId { get; set; }
        public virtual Categoria Categoria { get; set; } = new();
    }
}
