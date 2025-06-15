using ShoppingProject.Common;

public class AddressGetDto
{
    public int Id { get; set; }
    public string AddressName { get; set; } = string.Empty;
    public string AddressType { get; set; } = string.Empty;
    public string CountryName { get; set; } = string.Empty;
    public string CityName { get; set; } = string.Empty;
    public int PostCode { get; set; }
    public string AddressDetails { get; set; } = string.Empty;
    public string IsDefault { get; set; } = string.Empty;

}