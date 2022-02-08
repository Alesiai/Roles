namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public int OrderCount {get; set; }
        public bool IsBlocked {get; set;}
    }
}