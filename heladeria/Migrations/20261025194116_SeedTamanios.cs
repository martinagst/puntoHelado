using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace heladeria.Migrations
{
    /// <inheritdoc />
    public partial class SeedTamanios : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Envase",
                table: "Tamanios",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "Tamanios",
                columns: new[] { "Id", "CantBochas", "Envase", "IsActivo", "Precio" },
                values: new object[,]
                {
                    { 1, 1, "Vasito", true, 3000.0 },
                    { 2, 2, "Vasito", true, 4000.0 },
                    { 3, 3, "Vasito", true, 4500.0 },
                    { 4, 1, "Cucurucho", true, 3500.0 },
                    { 5, 2, "Cucurucho", true, 4500.0 },
                    { 6, 3, "Cucurucho", true, 5000.0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tamanios_Envase_CantBochas",
                table: "Tamanios",
                columns: new[] { "Envase", "CantBochas" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tamanios_Envase_CantBochas",
                table: "Tamanios");

            migrationBuilder.DeleteData(
                table: "Tamanios",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Tamanios",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Tamanios",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Tamanios",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Tamanios",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Tamanios",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.AlterColumn<string>(
                name: "Envase",
                table: "Tamanios",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
