using AutoMapper;
using Microsoft.AspNetCore.Mvc;

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
    [HttpGet("{userId}/get")]
    public async Task<IActionResult> GetCartByUserId(int userId)
    {
        var cart = await _unitOfWork.Carts.GetCartByUserId(userId, isCart);
        if (cart == null)
        {
            cart = new Cart { UserId = userId, IsWishlist = isCart };
            await _unitOfWork.Carts.AddAsync(cart);
            await _unitOfWork.SaveChangesAsync();
        }

        var cartDto = _mapper.Map<CartDto>(cart);
        return Ok(cartDto);
    }

    // Get cart by userId
    [HttpGet("{userId}/wishlist")]
    public async Task<IActionResult> GetCartByWishlistId(int userId)
    {
        var wishlist = await _unitOfWork.Carts.GetCartByUserId(userId, isWishlist);
        if (wishlist == null)
        {
            wishlist = new Cart { UserId = userId, IsWishlist = isWishlist };
            await _unitOfWork.Carts.AddAsync(wishlist);
            await _unitOfWork.SaveChangesAsync();
        }
        var wishlistDto = _mapper.Map<CartDto>(wishlist);
        return Ok(wishlistDto);
    }

    //Empty cart by userId
    [HttpDelete("{userId}/emptyCart")]
    public async Task<IActionResult> EmptyCartByUserId(int userId)
    {
        await _unitOfWork.Carts.EmptyCartByUserId(userId, isCart);
        await _unitOfWork.SaveChangesAsync();
        return Ok("Cart emptied");
    }
    //Empty cart by userId
    [HttpDelete("{userId}/emptyWishlist")]
    public async Task<IActionResult> EmptyWishlistByUserId(int userId)
    {
        await _unitOfWork.Carts.EmptyCartByUserId(userId, isWishlist);
        await _unitOfWork.SaveChangesAsync();
        return Ok("Wishlist emptied");
    }

    // Add product to cart
    [HttpPost("{userId}/add")]
    public async Task<IActionResult> AddToCart(int userId, [FromBody] LineItemDto lineItemDto)
    {
        await _unitOfWork.Carts.AddToCart(userId, lineItemDto.ProductId, lineItemDto.Quantity, isCart);
        await _unitOfWork.SaveChangesAsync();
        return Ok("Item added to cart");
    }

    // Add product to wishlist
    [HttpPost("{userId}/addwishlist")]
    public async Task<IActionResult> AddToWishlist(int userId, [FromBody] LineItemDto lineItemDto)
    {
        await _unitOfWork.Carts.AddToCart(userId, lineItemDto.ProductId, lineItemDto.Quantity, isWishlist);
        await _unitOfWork.SaveChangesAsync();
        return Ok("Item added to wishlist");
    }

    // Remove product from cart
    [HttpDelete("{userId}/remove")]
    public async Task<IActionResult> RemoveFromCart(int userId, [FromBody] LineItemDto lineItemDto)
    {
        var result = await _unitOfWork.Carts.RemoveFromCart(userId, lineItemDto.ProductId, lineItemDto.Quantity, isCart);

        if (!result)
            return NotFound($"Item with ProductId: {lineItemDto.ProductId} not found in the cart for UserId: {userId}");

        await _unitOfWork.SaveChangesAsync();
        return Ok("Item removed from cart");
    }

    // Remove product from wishlist
    [HttpDelete("{userId}/removewishlist")]
    public async Task<IActionResult> RemoveFromWishlist(int userId, [FromBody] LineItemDto lineItemDto)
    {
        var result = await _unitOfWork.Carts.RemoveFromCart(userId, lineItemDto.ProductId, lineItemDto.Quantity, isWishlist);

        if (!result)
            return NotFound($"Item with ProductId: {lineItemDto.ProductId} not found in the wishlist for UserId: {userId}");

        await _unitOfWork.SaveChangesAsync();
        return Ok("Item removed from wishlist");
    }

}
