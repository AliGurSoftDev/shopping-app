using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateOrderStatusToEnum : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Step 1: Update existing string values to corresponding integer enum values
            migrationBuilder.Sql("UPDATE \"Orders\" SET \"Status\" = 0 WHERE \"Status\" = 'Pending';");
            migrationBuilder.Sql("UPDATE \"Orders\" SET \"Status\" = 1 WHERE \"Status\" = 'Shipped';");
            migrationBuilder.Sql("UPDATE \"Orders\" SET \"Status\" = 2 WHERE \"Status\" = 'Delivered';");
            migrationBuilder.Sql("UPDATE \"Orders\" SET \"Status\" = 3 WHERE \"Status\" = 'Cancelled';");

            // Step 2: Alter the column type to integer
            migrationBuilder.Sql("ALTER TABLE \"Orders\" ALTER COLUMN \"Status\" TYPE integer USING \"Status\"::integer;");
        }


        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Orders",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");
        }
    }
}
