public class City
{
    public int Id { get; set; }
    public string CityName { get; set; } = string.Empty;

    //Navigational Properties
    public int CountryId { get; set; }
    public Country? Country{ get; set; }
}