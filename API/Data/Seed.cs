using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, 
            RoleManager<AppRole> roleManager, DataContext context)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Customer"},
                new AppRole{Name = "SuperCustomer"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "SuperAdmin"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "1234");
                if(user.OrderCount > 3)
                {
                    await userManager.AddToRoleAsync(user, "SuperCustomer");
                }
                    await userManager.AddToRoleAsync(user, "Customer");
                if(user.UserName == "blockeduser") {
                    user.IsBlocked = true;
                }  
            }

            var superAdmin = new AppUser
            {
                UserName = "superadmin"
            };
            await userManager.CreateAsync(superAdmin, "1234");
            await userManager.AddToRolesAsync(superAdmin, new[] {"SuperAdmin", "Admin"});

            
            var admin = new AppUser
            {
                UserName = "admin"
            };
            await userManager.CreateAsync(admin, "1234");
            await userManager.AddToRoleAsync(admin, "Admin");

            var productData = await System.IO.File.ReadAllTextAsync("Data/ProductsSeedData.json");
            var products = JsonSerializer.Deserialize<List<Products>>(productData);
            if (products == null) return;

            foreach (var product in products)
            {
                await context.Products.AddAsync(product);
            }

            await context.SaveChangesAsync();
        }
    }
}