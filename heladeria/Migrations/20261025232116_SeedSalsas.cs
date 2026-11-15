using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace heladeria.Migrations
{
    /// <inheritdoc />
    public partial class SeedSalsas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Gusto",
                table: "Salsas",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "Salsas",
                columns: new[] { "Id", "Gusto", "IsActivo" },
                values: new object[,]
                {
                    { 1, "Chocolate", true },
                    { 2, "Frutilla", true },
                    { 3, "Dulce de Leche", false }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Salsas_Gusto",
                table: "Salsas",
                column: "Gusto",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Salsas_Gusto",
                table: "Salsas");

            migrationBuilder.DeleteData(
                table: "Salsas",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Salsas",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Salsas",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.AlterColumn<string>(
                name: "Gusto",
                table: "Salsas",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
