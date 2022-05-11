using System;
using System.Linq;
using System.Security.Cryptography;

namespace RedRock.Calendar.Common.HassingHelpers
{
    public static class SHA256
    {
        private const int SaltSize = 16;
        private const int KeySize = 32;
        private const int Iterations = 1000;


        public static bool Check(string hashedValue, string value)
        {
            var parts = hashedValue.Split('.', 2);
            var salt = Convert.FromBase64String(parts[0]);
            var key = Convert.FromBase64String(parts[1]);

            using (var algorithm = new Rfc2898DeriveBytes(
              value,
              salt,
              Iterations,
              HashAlgorithmName.SHA256))
            {
                var keyToCheck = algorithm.GetBytes(KeySize);

                return keyToCheck.SequenceEqual(key);
            }
        }

        public static string Hash(string value)
        {
            using (var algorithm = new Rfc2898DeriveBytes(
              value,
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
