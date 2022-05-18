using System;
using System.IO;
using System.Net;

namespace SwaggerJSONFileGenerator
{
    internal class Program
    {
        internal static void Main(string[] args)
        {
            if (args.Length != 2)
                throw new ArgumentException("Expecting 2 arguments: URL, generatePath");

            var url = args[0];
            var generatePath = Path.Combine(Directory.GetCurrentDirectory(), args[1]);

            GenerateSwaggerFile(url, generatePath);
        }

        private static void GenerateSwaggerFile(string url, string path)
        {
            using WebClient client = new();
            var json = client.DownloadString(url);
            File.WriteAllText(path, json);
            Console.WriteLine("File generated!");
        }
    }
}
