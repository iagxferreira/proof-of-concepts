using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POC.RabbitMQ.Consumer
{
    [Table("Messages")]
    public class GettingStartedMessage
    {

        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Value { get; set; }
    }
}
