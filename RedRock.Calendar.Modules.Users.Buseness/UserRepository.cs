using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Users.Buseness
{
    class UserRepository : IUserRepository
    {
        private readonly DbSet<User> users;

        public UserRepository(UserContext context) =>
            users = context.Users;

        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await users.FindAsync(id);
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await users.ToListAsync();
        }
    }
}
