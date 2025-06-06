using ShoppingProject.Common;

public class AddressDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string AddressName { get; set; } = string.Empty;
    public AddressType AddressType { get; set; }
    public int CountryId { get; set; }
    public int CityId { get; set; }
    public int PostCode { get; set; }
    public string AddressDetails { get; set; } = string.Empty;
    public string IsDefault { get; set; } = string.Empty;

}