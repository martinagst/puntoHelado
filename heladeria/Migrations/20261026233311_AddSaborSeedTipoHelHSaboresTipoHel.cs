using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace heladeria.Migrations
{
    /// <inheritdoc />
    public partial class AddSaborSeedTipoHelHSaboresTipoHel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sabores",
                table: "Helados");

            migrationBuilder.AlterColumn<string>(
                name: "Tipo",
                table: "TiposHelado",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "Sabores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActivo = table.Column<bool>(type: "bit", nullable: false),
                    TipoHeladoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sabores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sabores_TiposHelado_TipoHeladoId",
                        column: x => x.TipoHeladoId,
                        principalTable: "TiposHelado",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "TiposHelado",
                columns: new[] { "Id", "Tipo" },
                values: new object[,]
                {
                    { 1, "A la crema" },
                    { 2, "Al agua" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_TiposHelado_Tipo",
                table: "TiposHelado",
                column: "Tipo",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sabores_TipoHeladoId",
                table: "Sabores",
                column: "TipoHeladoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sabores");

            migrationBuilder.DropIndex(
                name: "IX_TiposHelado_Tipo",
                table: "TiposHelado");

            migrationBuilder.DeleteData(
                table: "TiposHelado",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "TiposHelado",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.AlterColumn<string>(
                name: "Tipo",
                table: "TiposHelado",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "Sabores",
                table: "Helados",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
