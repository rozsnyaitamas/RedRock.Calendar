using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace RedRock.Calendar.Modules.Users.Service
{
    public static class PasswordHasher
    {
        private const int SaltSize = 16;
        private const int KeySize = 32;
        private const int Iterations = 1000;

        
        public static bool Check(string hashedPassword, string password)
        {
            var parts = hashedPassword.Split('.', 2);
            var salt = Convert.FromBase64String(parts[0]);
            var key = Convert.FromBase64String(parts[1]);

            using (var algorithm = new Rfc2898DeriveBytes(
              password,
              salt,
              Iterations,
              HashAlgorithmName.SHA256))
            {
                var keyToCheck = algorithm.GetBytes(KeySize);

                return keyToCheck.SequenceEqual(key);
            }
        }

        public static string Hash(string password)
        {
            using (var algorithm = new Rfc2898DeriveBytes(
              password,
              SaltSize,
              Iterations,
              HashAlgorithmName.SHA256))
            {
                var key = Convert.ToBase64String(algorithm.GetBytes(KeySize));
                var salt = Convert.ToBase64String(algorithm.Salt);

                return $"{salt}.{key}";
            }
        }
    }
}
