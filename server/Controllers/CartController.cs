using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShoppingProject.Helpers;
using ShoppingProject.Common;

[ApiController]
[Route("api/cart")]
public class CartController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    private readonly int isWishlist = 1;
    private readonly int isCart = 0;

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
    [Authorize]
    [HttpGet("get")]
    public async Task<IActionResult> GetCartByUserId()
    {
        var userId = User.GetUserId();
        if (userId == null) return StatusCode(500, "Unexpected Token Error.");
        var cart = await _unitOfWork.Carts.GetCartByUserId(userId.Value, GlobalConstants.No);
        if (cart == null)
        {
            cart = new Cart { UserId = userId.Value, IsWishlist = GlobalConstants.No };
            await _unitOfWork.Carts.AddAsync(cart);
            await _unitOfWork.SaveChangesAsync();
        }

        var cartDto = _mapper.Map<CartDto>(cart);
        return Ok(cartDto);
    }

    // Get cart by userId
    [Authorize]
    [HttpGet("wishlist")]
    public async Task<IActionResult> GetCartByWishlistId()
    {
        var userId = User.GetUserId();
        if (userId == null) return StatusCode(500, "Unexpected Token Error.");

        var wishlist = await _unitOfWork.Carts.GetCartByUserId(userId.Value, GlobalConstants.Yes);
        if (wishlist == null)
        {
            wishlist = new Cart { UserId = userId.Value, IsWishlist = GlobalConstants.Yes };
            await _unitOfWork.Carts.AddAsync(wishlist);
            await _unitOfWork.SaveChangesAsync();
        }
        var wishlistDto = _mapper.Map<CartDto>(wishlist);
        return Ok(wishlistDto);
    }

    //Empty cart by userId
    [Authorize]
    [HttpDelete("emptyCart")]
    public async Task<IActionResult> EmptyCartByUserId()
    {
        var userId = User.GetUserId();
        if (userId == null) return StatusCode(500, "Unexpected Token Error.");

        await _unitOfWork.Carts.EmptyCartByUserId(userId.Value, GlobalConstants.No);
        await _unitOfWork.SaveChangesAsync();
        return Ok("Cart emptied");
    }

    //Empty cart by userId
    [Authorize]
    [HttpDelete("emptyWishlist")]
    public async Task<IActionResult> EmptyWishlistByUserId()
    {
        var userId = User.GetUserId();
        if (userId == null) return StatusCode(500, "Unexpected Token Error.");

        await _unitOfWork.Carts.EmptyCartByUserId(userId.Value, GlobalConstants.Yes);
        await _unitOfWork.SaveChangesAsync();
        return Ok("Wishlist emptied");
    }

    // Add product to cart
    [Authorize]
    [HttpPost("add")]
    public async Task<IActionResult> AddToCart([FromBody] LineItemDto lineItemDto)
    {
        var userId = User.GetUserId();
        if (userId == null) return StatusCode(500, "Unexpected Token Error.");

        await _unitOfWork.Carts.AddToCart(userId.Value, lineItemDto.ProductId, lineItemDto.Quantity, GlobalConstants.No);
        await _unitOfWork.SaveChangesAsync();
        return Ok("Item added to cart");
    }

    // Add product to wishlist
    [Authorize]
    [HttpPost("addwishlist")]
    public async Task<IActionResult> AddToWishlist([FromBody] LineItemDto lineItemDto)
    {
        var userId = User.GetUserId();
        if (userId == null) return StatusCode(500, "Unexpected Token Error.");

        await _unitOfWork.Carts.AddToCart(userId.Value, lineItemDto.ProductId, lineItemDto.Quantity, GlobalConstants.Yes);
        await _unitOfWork.SaveChangesAsync();
        return Ok("Item added to wishlist");
    }

    // Remove product from cart
    [Authorize]
    [HttpDelete("remove")]
    public async Task<IActionResult> RemoveFromCart([FromBody] LineItemDto lineItemDto)
    {
        var userId = User.GetUserId();
        if (userId == null) return StatusCode(500, "Unexpected Token Error.");

        var result = await _unitOfWork.Carts.RemoveFromCart(userId.Value, lineItemDto.ProductId, lineItemDto.Quantity, GlobalConstants.No);

        if (!result)
            return NotFound($"Item with ProductId: {lineItemDto.ProductId} not found in the cart for UserId: {userId}");

        await _unitOfWork.SaveChangesAsync();
        return Ok("Item removed from cart");
    }

    // Remove product from wishlist
    [Authorize]
    [HttpDelete("removewishlist")]
    public async Task<IActionResult> RemoveFromWishlist([FromBody] LineItemDto lineItemDto)
    {
        var userId = User.GetUserId();
        if (userId == null) return StatusCode(500, "Unexpected Token Error.");

        var result = await _unitOfWork.Carts.RemoveFromCart(userId.Value, lineItemDto.ProductId, lineItemDto.Quantity, GlobalConstants.Yes);

        if (!result)
            return NotFound($"Item with ProductId: {lineItemDto.ProductId} not found in the wishlist for UserId: {userId}");

        await _unitOfWork.SaveChangesAsync();
        return Ok("Item removed from wishlist");
    }

}
