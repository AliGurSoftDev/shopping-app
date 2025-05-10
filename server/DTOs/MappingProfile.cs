using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // User
        CreateMap<User, UserDto>();
        CreateMap<UserCreateDto, User>();
        CreateMap<UserLoginDto, User>();
        CreateMap<UserUpdateDto, User>()
                   .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        // Product
        CreateMap<Product, ProductDto>();
        CreateMap<ProductCreateDto, Product>();
        CreateMap<ProductUpdateDto, Product>()
                    .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        // Category
        CreateMap<Category, CategoryDto>();
        CreateMap<CategoryCreateDto, Category>();
        CreateMap<CategoryUpdateDto, Category>()
                    .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        // Cart
        CreateMap<Cart, CartDto>()
            .ForMember(dest => dest.Items, opt => opt.MapFrom(src => new List<CartItemDto>
            {
                new CartItemDto
                {
                    ProductId = src.ProductID,
                    ProductName = src.Product.Name,
                    Quantity = src.Quantity,
                    UnitPrice = src.Product.Price
                }
            }));
        
        // CartItem to CartItemDto Mapping (if needed separately)
        CreateMap<CartItemDto, Cart>();

        // Order
        CreateMap<Order, OrderDto>()
                    .ForMember(dest => dest.OrderItems, opt => opt.MapFrom(src => src.OrderItems));
        CreateMap<OrderCreateDto, Order>();
        CreateMap<OrderUpdateDto, Order>()
                    .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));

        // OrderItem
        CreateMap<OrderItem, OrderItemDto>()
                    .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name));
        CreateMap<OrderItemCreateDto, OrderItem>();
        CreateMap<OrderItemUpdateDto, OrderItem>()
                    .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
    }
}