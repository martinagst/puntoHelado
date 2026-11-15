using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace heladeria.Migrations
{
    /// <inheritdoc />
    public partial class HeladosSalsa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Salsa",
                table: "Helados");

            migrationBuilder.AddColumn<int>(
                name: "SalsaId",
                table: "Helados",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Helados_SalsaId",
                table: "Helados",
                column: "SalsaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Helados_Salsas_SalsaId",
                table: "Helados",
                column: "SalsaId",
                principalTable: "Salsas",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Helados_Salsas_SalsaId",
                table: "Helados");

            migrationBuilder.DropIndex(
                name: "IX_Helados_SalsaId",
                table: "Helados");

            migrationBuilder.DropColumn(
                name: "SalsaId",
                table: "Helados");

            migrationBuilder.AddColumn<string>(
                name: "Salsa",
                table: "Helados",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
