using Microsoft.EntityFrameworkCore.Migrations;

namespace RedRock.Calendar.Modules.Users.Buseness.Migrations
{
    public partial class userUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Users");
        }
    }
}
