using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace heladeria.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedSabores : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Nombre",
                table: "Sabores",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "Sabores",
                columns: new[] { "Id", "IsActivo", "Nombre", "TipoHeladoId" },
                values: new object[,]
                {
                    { 1, true, "Chocolate", 1 },
                    { 2, true, "Vainilla", 1 },
                    { 3, true, "Limon a la crema", 1 },
                    { 4, true, "Dulce de Leche", 1 },
                    { 5, true, "Limon", 2 },
                    { 6, true, "Frutilla", 2 },
                    { 7, true, "Frutos Rojos", 2 },
                    { 8, true, "Naranja", 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Sabores_Nombre",
                table: "Sabores",
                column: "Nombre",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Sabores_Nombre",
                table: "Sabores");

            migrationBuilder.DeleteData(
                table: "Sabores",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Sabores",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Sabores",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Sabores",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Sabores",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Sabores",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Sabores",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Sabores",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.AlterColumn<string>(
                name: "Nombre",
                table: "Sabores",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
