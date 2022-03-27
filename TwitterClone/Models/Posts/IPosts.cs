using System;

namespace TwitterClone.Models.Posts
{
    public class IPosts
    {
        public Guid PostsId { get; set; }
        public string PostsTitle { get; set;}
        public string PostsBody { get; set; }
        public string UserId { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
