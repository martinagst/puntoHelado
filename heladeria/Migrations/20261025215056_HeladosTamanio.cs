using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace heladeria.Migrations
{
    /// <inheritdoc />
    public partial class HeladosTamanio : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Tamanio",
                table: "Helados");

            migrationBuilder.AddColumn<int>(
                name: "TamanioId",
                table: "Helados",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Helados_TamanioId",
                table: "Helados",
                column: "TamanioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Helados_Tamanios_TamanioId",
                table: "Helados",
                column: "TamanioId",
                principalTable: "Tamanios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Helados_Tamanios_TamanioId",
                table: "Helados");

            migrationBuilder.DropIndex(
                name: "IX_Helados_TamanioId",
                table: "Helados");

            migrationBuilder.DropColumn(
                name: "TamanioId",
                table: "Helados");

            migrationBuilder.AddColumn<string>(
                name: "Tamanio",
                table: "Helados",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
