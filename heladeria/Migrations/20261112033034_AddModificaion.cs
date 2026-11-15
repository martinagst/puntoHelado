using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace heladeria.Migrations
{
    /// <inheritdoc />
    public partial class AddModificaion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HeladosSabores_Helados_HeladoId",
                table: "HeladosSabores");

            migrationBuilder.DropForeignKey(
                name: "FK_HeladosSabores_Sabores_SaborId",
                table: "HeladosSabores");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HeladosSabores",
                table: "HeladosSabores");

            migrationBuilder.RenameTable(
                name: "HeladosSabores",
                newName: "HeladoSabor");

            migrationBuilder.RenameIndex(
                name: "IX_HeladosSabores_SaborId",
                table: "HeladoSabor",
                newName: "IX_HeladoSabor_SaborId");

            migrationBuilder.RenameIndex(
                name: "IX_HeladosSabores_HeladoId",
                table: "HeladoSabor",
                newName: "IX_HeladoSabor_HeladoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HeladoSabor",
                table: "HeladoSabor",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HeladoSabor_Helados_HeladoId",
                table: "HeladoSabor",
                column: "HeladoId",
                principalTable: "Helados",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HeladoSabor_Sabores_SaborId",
                table: "HeladoSabor",
                column: "SaborId",
                principalTable: "Sabores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HeladoSabor_Helados_HeladoId",
                table: "HeladoSabor");

            migrationBuilder.DropForeignKey(
                name: "FK_HeladoSabor_Sabores_SaborId",
                table: "HeladoSabor");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HeladoSabor",
                table: "HeladoSabor");

            migrationBuilder.RenameTable(
                name: "HeladoSabor",
                newName: "HeladosSabores");

            migrationBuilder.RenameIndex(
                name: "IX_HeladoSabor_SaborId",
                table: "HeladosSabores",
                newName: "IX_HeladosSabores_SaborId");

            migrationBuilder.RenameIndex(
                name: "IX_HeladoSabor_HeladoId",
                table: "HeladosSabores",
                newName: "IX_HeladosSabores_HeladoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HeladosSabores",
                table: "HeladosSabores",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HeladosSabores_Helados_HeladoId",
                table: "HeladosSabores",
                column: "HeladoId",
                principalTable: "Helados",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_HeladosSabores_Sabores_SaborId",
                table: "HeladosSabores",
                column: "SaborId",
                principalTable: "Sabores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
