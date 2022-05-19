using Microsoft.EntityFrameworkCore.Migrations;

namespace RedRock.Calendar.Modules.Users.Buseness.Migrations
{
    public partial class colordecomposed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "PrimaryColor",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecondaryColor",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrimaryColor",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SecondaryColor",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Users",
                type: "text",
                nullable: true);
        }
    }
}
