using System;
using System.Collections.Generic;

namespace RedRock.Calendar.Modules.Users.Buseness
{
    public class InMemoryDatabase : IUserDatabase
    {
        protected internal static List<User> inMemoryUsers;

        public InMemoryDatabase()
        {
            inMemoryUsers = initInMemoryDB();
        }

        private List<User> initInMemoryDB()
        {
            User newUser0 = new User
            {
                //Id = new Guid("ca6b7fc1-c0c3-425f-8b89-2331d1dedaa4"),
                Id = Guid.NewGuid(),
                UserName = "KKristof69",
                FullName = "Kondrat Kristof",
                Password = "password1"
            };

            User newUser1 = new User
            {
                //Id = new Guid("9023e30f-8524-4a98-88e4-e5b62644f737"),
                Id = Guid.NewGuid(),
                UserName = "KGyorgy",
                FullName = "Kovacs Gyorgy",
                Password = "password2"
            };

            User newUser2 = new User
            {
                //Id = new Guid("3dd6efdb-89b6-4f86-bdfd-a3c6015dc1e7"),
                Id = Guid.NewGuid(),
                UserName = "RTamas",
                FullName = "Rozsnyai Tamas",
                Password = "password3"
            };

            List<User> users = new List<User>();

            users.Add(newUser0);
            users.Add(newUser1);
            users.Add(newUser2);

            return users;
        }

        public List<User> GetUsers()
        {
            return inMemoryUsers;
        }

        public User GetUserById(Guid id)
        {
            User result = null;
            foreach (User user in inMemoryUsers)
            {
                if (user.Id.Equals(id))
                {
                    result = user;
                }
            }
            return result;
        }

    }
}
