using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using eshopperapi.Models;

namespace eshopperapi.Data
{
    public class eshopperapiContext : DbContext
    {
        public eshopperapiContext (DbContextOptions<eshopperapiContext> options)
            : base(options)
        {
        }

        public DbSet<eshopperapi.Models.ProductModel> ProductModel { get; set; }

        public DbSet<eshopperapi.Models.ReviewModel> ReviewModel { get; set; }
    }
}
