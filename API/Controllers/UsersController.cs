using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly UserManager<AppUser> _userManager;
        public UsersController(IUserRepository userRepository, IMapper mapper, UserManager<AppUser> userManager)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _userManager = userManager;
            
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            var users = await _userRepository.GetUsersAsync();

            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUser(string username)
        {
            return await _userRepository.GetUserByUsernameAsync(username);
        }

        [HttpPost]
        public async Task<ActionResult> UpdateUser(UserDto userUpdateDto)
        {
            var user = await _userRepository.GetUserByUsernameAsync(userUpdateDto.Username);
            
            user.OrderCount = userUpdateDto.OrderCount;
            user.IsBlocked = userUpdateDto.IsBlocked;

            if(user.OrderCount >= 3)
            {
               var roleResult = await _userManager.AddToRolesAsync(user, new[] {"SuperCustomer", "Customer"});
            }
            else{
                var roleResult = await _userManager.AddToRolesAsync(user, new[] {"Customer"});
            }

            _userRepository.Update(user);
            if (await _userRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update user");
        }
    }
}