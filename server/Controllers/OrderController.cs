using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ShoppingProject.Helpers;
using ShoppingProject.Common;

[ApiController]
[Route("api/order")]
public class OrderController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public OrderController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    // Get all orders
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var orders = await _unitOfWork.Orders.GetAllAsync();
        var orderDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
        return Ok(orderDtos);
    }

    // Get order by ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var order = await _unitOfWork.Orders.GetByIdAsync(id);
        if (order == null)
            return NotFound();

        var orderDto = _mapper.Map<OrderDto>(order);
        return Ok(orderDto);
    }

    // Get orders by userId
    [Authorize]
    [HttpGet("get")]
    public async Task<IActionResult> GetOrdersByUserId()
    {
        var userId = User.GetUserId();
        if (userId == null) return StatusCode(500, "Unexpected Token Error.");

        var orders = await _unitOfWork.Orders.GetOrdersByUserIdAsync(userId.Value);
        if (orders == null || !orders.Any())
            return NotFound();

        var ordersDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
        return Ok(ordersDtos);
    }

    // Get orders by status
    [HttpGet("status={status}")]
    public async Task<IActionResult> GetOrdersByStatus(string status)
    {
        var orders = await _unitOfWork.Orders.GetOrdersByStatusAsync(status);
        if (orders == null || !orders.Any())
            return NotFound();

        var ordersDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
        return Ok(ordersDtos);
    }

    // Get orders by userId and status
    [Authorize]
    [HttpGet("get/status={status}")]
    public async Task<IActionResult> GetOrdersByUserIdAndStatus(string status)
    {
        var userId = User.GetUserId();
        if (userId == null) return StatusCode(500, "Unexpected Token Error.");

        var orders = await _unitOfWork.Orders.GetOrdersByUserIdAndStatusAsync(userId.Value, status);

        if (orders == null || !orders.Any())
            return NotFound($"No orders found for user with ID {userId} and status {status}.");

        var ordersDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
        return Ok(ordersDtos);
    }

    // Create a new order
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] OrderDto orderDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var order = _mapper.Map<Order>(orderDto);
        await _unitOfWork.Orders.AddAsync(order);
        await _unitOfWork.SaveChangesAsync();

        var newOrderDto = _mapper.Map<OrderDto>(order);
        return CreatedAtAction(nameof(GetById), new { id = newOrderDto.Id }, newOrderDto);
    }

    // Create an order from cart
    [Authorize]
    [HttpPost("placeOrder")]
    public async Task<IActionResult> CreateOrder()
    {
        var userId = User.GetUserId();
        if (userId == null) return StatusCode(500, "Unexpected Token Error.");

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var cart = await _unitOfWork.Carts.GetCartByUserId(userId.Value, GlobalConstants.No);
        if (cart == null || cart.Items == null || !cart.Items.Any())
            return NotFound("No items found in the cart.");

        var address = await _unitOfWork.Addresses.GetDefaultAddressByUserIdAsync(userId.Value);
        if (address == null)
        {
            return NotFound("No default address found for user");
        }
        try
            {
                var newOrder = await _unitOfWork.Orders.CreateOrder(cart, address.Id);
                if (newOrder == null)
                    return StatusCode(500, "Order creation failed.");

                await _unitOfWork.SaveChangesAsync();
                return Ok($"Order No:{newOrder.Id} successfully created.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while creating the order: {ex.Message}");
            }
    }

    //Update an existing Order
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] OrderDto orderDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existingOrder = await _unitOfWork.Orders.GetByIdAsync(id);
        if (existingOrder == null)
            return NotFound();

        _mapper.Map(orderDto, existingOrder);
        _unitOfWork.Orders.Update(existingOrder);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }

    //Update an an existing Order's Status
    [HttpPut("{id}/status={status}")]
    public async Task<IActionResult> UpdateOrderStatus(int id, string status)
    {
        await _unitOfWork.Orders.UpdateOrderStatus(id, status);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }

    //Cancel an order
    [HttpDelete("{id}/cancel")]
    public async Task<IActionResult> CancelOrderAsync(int id)
    {
        var order = await _unitOfWork.Orders.GetByIdAsync(id);
        if (order == null)
            return NotFound();

        order.Status = OrderStatusEnum.Cancelled;
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }

    // Delete an order
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var order = await _unitOfWork.Orders.GetByIdAsync(id);
        if (order == null)
            return NotFound();

        _unitOfWork.Orders.Delete(order);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }

}