using System;
using System.Collections.Generic;
using System.Text;

namespace RedRock.Calendar.Modules.Users.Buseness
{
    public interface IUserDatabase
    {
        public List<User> GetUsers();
        public User GetUserById(Guid id);
    }
}
