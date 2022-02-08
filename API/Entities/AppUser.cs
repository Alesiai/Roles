using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public int OrderCount {get; set; }
        public bool IsBlocked{get; set;}
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}