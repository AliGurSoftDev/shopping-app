using AutoMapper;
using Microsoft.EntityFrameworkCore.Diagnostics;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // User
        CreateMap<User, UserDto>();
        CreateMap<UserCreateDto, User>();
        CreateMap<UserLoginDto, User>();
        CreateMap<UserUpdateDto, User>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals(GetDefaultValue(srcMember.GetType()))));

        // Product
        //CreateMap<Product, ProductDto>();
        CreateMap<ProductDto, Product>().ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals(GetDefaultValue(srcMember.GetType()))));

        // Category
        CreateMap<Category, CategoryDto>();
        CreateMap<CategoryDto, Category>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals(GetDefaultValue(srcMember.GetType()))));

        // Cart
        CreateMap<Cart, CartDto>()
            .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));

        // LineItem
        CreateMap<LineItem, LineItemDto>()
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product != null ? src.Product.Name : "Product not found"))
            .ForMember(dest => dest.UnitPrice, opt => opt.MapFrom(src => src.Product != null ? src.Product.Price : GetDefaultValue(src.Product.Price.GetType())));
        CreateMap<LineItemDto, LineItem>();

        // Order
        CreateMap<Order, OrderDto>();
        CreateMap<OrderDto, Order>()
            .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items))
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals(GetDefaultValue(srcMember.GetType()))));
        CreateMap<OrderStatusUpdateDto, Order>();
    }

    private object GetDefaultValue(Type type)
    {
        if (type == null) return null;
        if (!type.IsValueType || type == typeof(string)) return string.Empty;
        return Activator.CreateInstance(type);
    }
}