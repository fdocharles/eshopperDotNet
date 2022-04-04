using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eshopperapi.Models
{
    public class ReviewModel
    {
        public int Id { get; set; }
        public int Product_id { get; set; }
        public string Cust_name { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
    }
}
