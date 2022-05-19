using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Users.Buseness
{
    class UserRepository : IUserRepository
    {
        private readonly UserContext context;

        public UserRepository(UserContext context) =>
            this.context = context;

        public async Task<User> GetUserByIdAsync(Guid id)
        {
            return await context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await context.Users.FirstOrDefaultAsync<User>(u => u.UserName.ToLower().Equals(username.ToLower()));
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await context.Users.ToListAsync();
        }

    }
}
