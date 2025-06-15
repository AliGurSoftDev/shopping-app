using AutoMapper;
using ShoppingProject.Common;

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
        CreateMap<Product, ProductDto>().ForMember(dest => dest.ImageUrls, opts => opts.MapFrom(src => src.ImageUrls));
        CreateMap<ProductDto, Product>().ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals(GetDefaultValue(srcMember.GetType()))));

        CreateMap<ProductImage, ProductImageDto>();

        // Category
        CreateMap<Category, CategoryDto>();
        CreateMap<CategoryDto, Category>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals(GetDefaultValue(srcMember.GetType()))));

        // Cart
        CreateMap<Cart, CartDto>()
            .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items));

        // LineItem
        CreateMap<LineItemDto, LineItem>();
        CreateMap<LineItem, LineItemDto>()
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product != null ? src.Product.Name : "Product not found"))
            .ForMember(dest => dest.UnitPrice, opt => opt.MapFrom(src => src.Product != null ? src.Product.Price : 0))
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.Product != null && src.Product.ImageUrls != null &&
            src.Product.ImageUrls.Any(img => img.IsThumbnail == "Y") ? src.Product.ImageUrls.First(img => img.IsThumbnail == "Y").ImageUrl : "/images/placeholder.jpg"));

        // Order
        CreateMap<Order, OrderDto>();
        CreateMap<OrderDto, Order>()
            .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Items))
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals(GetDefaultValue(srcMember.GetType()))));
        CreateMap<OrderStatusUpdateDto, Order>();

        // Address
        CreateMap<Address, AddressGetDto>()
        .ForMember(dest => dest.CountryName, opt => opt.MapFrom(src => src.Country != null ? src.Country.CountryName : string.Empty))
        .ForMember(dest => dest.CityName, opt => opt.MapFrom(src => src.City != null ? src.City.CityName : string.Empty));
        CreateMap<AddressCreateDto, Address>()
            .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null && !srcMember.Equals(GetDefaultValue(srcMember.GetType()))));

        //Country
        CreateMap<Country, CountryDto>();
        CreateMap<CountryDto, Country>();

        //City
        CreateMap<City, CityDto>();
        CreateMap<CityDto, City>();
    }

    private object GetDefaultValue(Type type)
    {
        if (type == null) return null;
        if (!type.IsValueType || type == typeof(string)) return string.Empty;
        return Activator.CreateInstance(type);
    }
}