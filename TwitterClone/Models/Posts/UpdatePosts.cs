namespace TwitterClone.Models.Posts
{
    public class UpdatePosts : IPosts
    {
        public string UserName { get; private set; }
        public string Password { get; private set; }

        public bool IsAdmin { get; set; } = false; 
    }
}
