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
        public async Task<User> ChangePasswordAsync(Guid id, string password)
        {
            var user = await context.Users.FindAsync(id);
            if (user != null)
            {
                user.Password = password;
                await context.SaveChangesAsync();
            }
            return user;
        }

        public async Task<User> UpdateUserAsync(Guid id, User user)
        {
            var userOld = await context.Users.FindAsync(id);
            if (userOld != null)
            {
                userOld.FullName = user.FullName;
                userOld.PrimaryColor = user.PrimaryColor;
                userOld.SecondaryColor = user.SecondaryColor;
                await context.SaveChangesAsync();
            }
            return userOld;
        }
    }
}
