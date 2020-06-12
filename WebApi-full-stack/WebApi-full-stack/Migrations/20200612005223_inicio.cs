using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi_full_stack.Migrations
{
    public partial class inicio : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Eventos",
                columns: table => new
                {
                    EventoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(nullable: true),
                    Cidade = table.Column<string>(nullable: true),
                    Bairro = table.Column<string>(nullable: true),
                    Data = table.Column<string>(nullable: true),
                    CargaHoraria = table.Column<int>(nullable: false),
                    ImagemUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Eventos", x => x.EventoId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Eventos");
        }
    }
}
