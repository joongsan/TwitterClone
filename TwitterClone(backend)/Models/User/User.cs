using System;

namespace TwitterClone.Models.User
{
    public class User 
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool isAdmin { get; set; }
    }
}
