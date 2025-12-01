using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CourseBookingApp.Api.Migrations
{
    /// <inheritdoc />
    public partial class RenameUserImgToImgUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Img",
                table: "Users",
                newName: "ImgUrl");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImgUrl",
                table: "Users",
                newName: "Img");
        }
    }
}
