namespace TwitterClone.Models.User
{
    public class AdminUser : IUser
    {
        public string UserName { get; private set; }
        public string Password { get; private set; }
        public bool IsAdmin { get; set; } = true;
    }
}
