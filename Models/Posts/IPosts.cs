using System;

namespace TwitterClone.Models.Posts
{
    public interface IPosts
    {
        
        string UserName { get; }
        string Password { get; }
        bool IsAdmin { get; }
    }
}
