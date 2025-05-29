using ShoppingProject.Common;

public class Address
{
    public int Id { get; set; }
    public string AddressName { get; set; } = string.Empty;
    public AddressType AddressType { get; set; }
    public int PostCode { get; set; }
    public string AddressDetails { get; set; } = string.Empty;
    public int IsDefault { get; set; }

    // Navigation property for line items
    public int UserId { get; set; }
    public User? User { get; set; }

    public int CountryId { get; set; }
    public Country? Country { get; set; }

    public int CityId { get; set; }
    public City? City { get; set; }

}