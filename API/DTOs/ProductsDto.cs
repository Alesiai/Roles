using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ProductsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Cost {get; set; }
    }
}