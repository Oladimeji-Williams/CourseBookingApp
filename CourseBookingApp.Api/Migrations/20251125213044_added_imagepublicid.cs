using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CourseBookingApp.Api.Migrations
{
    /// <inheritdoc />
    public partial class added_imagepublicid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Img",
                table: "Courses",
                newName: "ImgUrl");

            migrationBuilder.AddColumn<string>(
                name: "ImgPublicId",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImgPublicId",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImgPublicId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ImgPublicId",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "ImgUrl",
                table: "Courses",
                newName: "Img");
        }
    }
}
