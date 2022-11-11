using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace BookStoreAPI.Models
{
    public class BookModel
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Please add title property")]
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
