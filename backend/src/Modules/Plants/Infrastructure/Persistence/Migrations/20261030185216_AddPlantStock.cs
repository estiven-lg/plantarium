using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Plantarium.Modules.Plants.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddPlantStock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Stock",
                table: "Plants",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Stock",
                table: "Plants");
        }
    }
}
