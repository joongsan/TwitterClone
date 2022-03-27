using System;
using TwitterClone.Models.User;

namespace TwitterClone.Controllers.User
{
    public class ValidateUser
    {
        private IUser _userService;

        public ValidateUser(IUser userService)
        {
            _userService = userService;
        }

        public void CheckIfAdmin()
        {
            Console.WriteLine(_userService.IsAdmin ? "I am Admin" : "I am a user");
        }
    }
}
