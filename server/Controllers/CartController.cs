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

        var cartDto = _mapper.Map<CartDto>(cart);
        return Ok(cartDto);
    }

    // Get cart by userId
    [HttpGet("{userId}/get")]
    public async Task<IActionResult> GetCartByUserId(int userId)
    {
        var cart = await _unitOfWork.Carts.GetCartByUserId(userId);
        if (cart == null)
            return NotFound();

        var cartDto = _mapper.Map<CartDto>(cart);
        return Ok(cartDto);
    }

    //Empty cart by userId
    [HttpDelete("{userId}/empty")]
    public async Task<IActionResult> EmptyCartByUserId(int userId)
    {
        await _unitOfWork.Carts.EmptyCartByUserId(userId);
        await _unitOfWork.SaveChangesAsync();
        return Ok("Cart emptied");
    }
     // Add product to cart
    [HttpPost("{userId}/add")]
    public async Task<IActionResult> AddToCart(int userId, [FromBody] LineItemDto lineItemDto)
    {
        await _unitOfWork.Carts.AddToCart(userId, lineItemDto.ProductId, lineItemDto.Quantity);
        await _unitOfWork.SaveChangesAsync();
        return Ok("Item added to cart");
    }

    // Remove product from cart
    [HttpDelete("{userId}/remove")]
    public async Task<IActionResult> RemoveFromCart(int userId, [FromBody] LineItemDto lineItemDto)
    {
        var result = await _unitOfWork.Carts.RemoveFromCart(userId, lineItemDto.ProductId, lineItemDto.Quantity);

        if(!result)
            return NotFound($"Item with ProductId: {lineItemDto.ProductId} not found in the cart for UserId: {userId}");

        await _unitOfWork.SaveChangesAsync();
        return Ok("Item removed from cart");
    }

}
