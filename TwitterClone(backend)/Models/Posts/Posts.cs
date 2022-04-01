using System;

namespace TwitterClone.Models.Posts
{
    public class Posts
    {
        public Guid PostsId { get; set; }
        public string PostTitle { get; set; }
        public string PostBody { get; set; }
        public string UserId { get; set; }
        public string PostImage { get; set; }
        public string DateCreated { get; set; }

    }
}
