using ShoppingProject.Common;

public class AddressCreateDto
{
    public int UserId { get; set; }
    public string AddressName { get; set; } = string.Empty;
    public string AddressType { get; set; } = string.Empty;
    public int CountryId { get; set; }
    public int CityId { get; set; }
    public int PostCode { get; set; }
    public string AddressDetails { get; set; } = string.Empty;
    public string IsDefault { get; set; } = GlobalConstants.No;
}