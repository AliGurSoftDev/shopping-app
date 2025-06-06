using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using ShoppingProject.Common;

[ApiController]
[Route("api/address")]
public class AddressController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public AddressController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    //Get all Addresses
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var addresses = await _unitOfWork.Addresses.GetAllAsync();
        var addressDtos = _mapper.Map<IEnumerable<AddressDto>>(addresses);
        return Ok(addressDtos);
    }

    //Get address by Id
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var address = await _unitOfWork.Addresses.GetByIdAsync(id);
        var addressDto = _mapper.Map<AddressDto>(address);
        return Ok(addressDto);
    }

    //Get addresses by UserId
    [HttpGet("{userId}/get")]
    public async Task<IActionResult> GetAddressesByUserIdAsync(int userId)
    {
        var addresses = await _unitOfWork.Addresses.GetAddressesByUserIdAsync(userId);
        var addressDtos = _mapper.Map<IEnumerable<AddressDto>>(addresses);
        return Ok(addressDtos);
    }

    //Get active addresses by UserId
    [HttpGet("{userId}/getactive")]
    public async Task<IActionResult> GetActiveAddressesByUserIdAsync(int userId)
    {
        var addresses = await _unitOfWork.Addresses.GetActiveAddressesByUserIdAsync(userId);
        var addressDtos = _mapper.Map<IEnumerable<AddressDto>>(addresses);
        return Ok(addressDtos);
    }

    //Get default address by UserId
    [HttpGet("{userId}/getdefault")]
    public async Task<IActionResult> GetDefaultAddressByUserIdAsync(int userId)
    {
        var address = await _unitOfWork.Addresses.GetDefaultAddressByUserIdAsync(userId);
        var addressDto = _mapper.Map<AddressDto>(address);
        return Ok(addressDto);
    }

    //Get all countries
    [HttpGet("countries")]
    public async Task<IActionResult> GetCountriesAsync()
    {
        var countries = await _unitOfWork.Addresses.GetCountriesAsync();
        var countryDtos = _mapper.Map<IEnumerable<CountryDto>>(countries);
        return Ok(countryDtos);
    }

    //Get cities by CountryId
    [HttpGet("cities")]
    public async Task<IActionResult> GetCitiesByCountryIdAsync()
    {
        var cities = await _unitOfWork.Addresses.GetCitiesByCountryIdAsync();
        var cityDtos = _mapper.Map<IEnumerable<CityDto>>(cities);
        return Ok(cityDtos);
    }

    //Create new address
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AddressDto addressDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var address = _mapper.Map<Address>(addressDto);
        address.IsDefault = GlobalConstants.No; //A new address should be added isDefault=N at all times to prevent overlapping with another default address.

        await _unitOfWork.Addresses.AddAsync(address);
        await _unitOfWork.SaveChangesAsync();

        if (addressDto.IsDefault == GlobalConstants.Yes)
            await SetDefaultAddress(address.Id);


        var newAddressDto = _mapper.Map<AddressDto>(address);
        return CreatedAtAction(nameof(GetById), new { id = newAddressDto.Id }, newAddressDto);
    }

    //Update an existing address
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] AddressDto addressDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existingAddress = await _unitOfWork.Addresses.GetByIdAsync(id);
        if (existingAddress == null)
            return NotFound();

        _mapper.Map(addressDto, existingAddress);
        _unitOfWork.Addresses.Update(existingAddress);
        await _unitOfWork.SaveChangesAsync();

        return StatusCode(400, addressDto);
    }

    //Set an address as default by Id
    [HttpPut("{id}/setdefault")]
    public async Task<IActionResult> SetDefaultAddress(int id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var newDefaultAddress = await _unitOfWork.Addresses.GetByIdAsync(id);
        if (newDefaultAddress == null)
            return NotFound();

        var userId = newDefaultAddress.UserId;

        var oldDefaultAddress = await _unitOfWork.Addresses.GetDefaultAddressByUserIdAsync(userId);

        if (oldDefaultAddress != null)
        {
            oldDefaultAddress.IsDefault = GlobalConstants.No;
            _unitOfWork.Addresses.Update(oldDefaultAddress);
        }

        newDefaultAddress.IsDefault = GlobalConstants.Yes;
        _unitOfWork.Addresses.Update(newDefaultAddress);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }

    //Disable an address
    [HttpDelete("{id}/remove")]
    public async Task<IActionResult> RemoveAddressAsync(int id)
    {
        var address = await _unitOfWork.Addresses.GetByIdAsync(id);

        if (address == null)
            return NotFound();

        if (address.IsDefault == GlobalConstants.Yes)
            return BadRequest(new { message = "Unable to remove default address" });

        address.IsRemoved = GlobalConstants.Yes;
        _unitOfWork.Addresses.Update(address);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }

    //Delete an address
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var address = await _unitOfWork.Addresses.GetByIdAsync(id);
        if (address == null)
            return NotFound();

        if (address.IsDefault == GlobalConstants.Yes)
            return BadRequest(new { message = "Unable to remove default address" });

        _unitOfWork.Addresses.Delete(address);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }
}