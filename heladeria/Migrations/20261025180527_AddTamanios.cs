using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace heladeria.Migrations
{
    /// <inheritdoc />
    public partial class AddTamanios : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tamanios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IsActivo = table.Column<bool>(type: "bit", nullable: false),
                    Envase = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CantBochas = table.Column<int>(type: "int", nullable: false),
                    Precio = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tamanios", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tamanios");
        }
    }
}
