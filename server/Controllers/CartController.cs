using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/cart")]
public class CartController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CartController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    // Get all carts
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var carts = await _unitOfWork.Carts.GetAllAsync();
        var cartDtos = _mapper.Map<IEnumerable<CartDto>>(carts);
        return Ok(cartDtos);
    }

    // Get cart by ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var cart = await _unitOfWork.Carts.GetByIdAsync(id);
        if (cart == null)
            return NotFound();

        var cartDtos = _mapper.Map<IEnumerable<CartDto>>(cart);
        return Ok(cartDtos);
    }

    // Get cart by userId
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUserId(int userId)
    {
        var cart = await _unitOfWork.Carts.GetCartByUserId(userId);
        if (cart == null)
            return NotFound();

        var cartDtos = _mapper.Map<IEnumerable<CartDto>>(cart);
        return Ok(cartDtos);
    }
}
