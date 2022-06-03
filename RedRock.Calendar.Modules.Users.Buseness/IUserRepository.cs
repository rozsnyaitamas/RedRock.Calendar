﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RedRock.Calendar.Modules.Users.Buseness
{
    public interface IUserRepository
    {
        public Task<IEnumerable<User>> GetUsersAsync();
        public Task<User> GetUserByIdAsync(Guid id);
        public Task<User> GetUserByUsernameAsync(string username);
        public Task<User> UpdateUserAsync(Guid id, User user);

        public Task<User> ChangePasswordAsync(Guid id, string password);
    }
}
