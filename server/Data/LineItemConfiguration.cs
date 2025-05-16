using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class LineItemConfiguration : IEntityTypeConfiguration<LineItem>
{
    public void Configure(EntityTypeBuilder<LineItem> builder)
    {
        builder.HasOne(l => l.Cart)
                .WithMany(c => c.Items)
                .HasForeignKey(l => l.CartId);
        
        builder.HasOne(l => l.Order)
                .WithMany(o => o.Items)
                .HasForeignKey(l => l.OrderId);
        
        builder.HasOne(l => l.Product)
                .WithMany()
                .HasForeignKey(l => l.ProductId);
    }
}
