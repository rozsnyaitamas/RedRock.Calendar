using Microsoft.EntityFrameworkCore;

namespace RedRock.Calendar.Modules.Users.Buseness
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options)
                : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
    }
}
