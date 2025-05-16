using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class CartConfiguration : IEntityTypeConfiguration<Cart>
{
    public void Configure(EntityTypeBuilder<Cart> builder)
    {
        builder.HasOne(c => c.User)
               .WithMany(u => u.Carts)
               .HasForeignKey(c => c.UserId);
    }
}
