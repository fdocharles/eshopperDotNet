using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eshopperapi.Models
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Featured { get; set; }
        public string Sizes { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public int Rating { get; set; }
    }
}
