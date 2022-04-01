namespace TwitterClone.Models.User
{
    public interface IUser
    {
        string UserName { get; }
        string Password { get; }
        bool IsAdmin { get; }
    }
}
