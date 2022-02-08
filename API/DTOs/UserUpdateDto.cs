using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserUpdateDto
    {
        
        public int OrderCount {get; set; }
        public bool IsBlocked {get; set;}
    }
}