using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace heladeria.Migrations
{
    /// <inheritdoc />
    public partial class AddRelHeladoSabor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HeladosSabores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HeladoId = table.Column<int>(type: "int", nullable: false),
                    SaborId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeladosSabores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HeladosSabores_Helados_HeladoId",
                        column: x => x.HeladoId,
                        principalTable: "Helados",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HeladosSabores_Sabores_SaborId",
                        column: x => x.SaborId,
                        principalTable: "Sabores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HeladosSabores_HeladoId",
                table: "HeladosSabores",
                column: "HeladoId");

            migrationBuilder.CreateIndex(
                name: "IX_HeladosSabores_SaborId",
                table: "HeladosSabores",
                column: "SaborId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HeladosSabores");
        }
    }
}
