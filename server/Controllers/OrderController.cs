using AutoMapper;
using Microsoft.AspNetCore.Mvc;

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
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetOrdersByUserId(int userId)
    {
        var orders = await _unitOfWork.Orders.GetOrdersByUserIdAsync(userId);
        if (orders == null || !orders.Any())
            return NotFound();

        var ordersDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
        return Ok(ordersDtos);
    }

    // Get orders by status
    [HttpGet("status/{status}")]
    public async Task<IActionResult> GetOrdersByStatus(string status)
    {
        var orders = await _unitOfWork.Orders.GetOrdersByStatusAsync(status);
        if (orders == null || !orders.Any())
            return NotFound();

        var ordersDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
        return Ok(ordersDtos);
    }

    // Get orders by userId and status
    [HttpGet("user/{userId}/status={status}")]
    public async Task<IActionResult> GetOrdersByUserIdAndStatus(int userId, string status)
    {
        var orders = await _unitOfWork.Orders.GetOrdersByUserIdAndStatusAsync(userId, status);

        if (orders == null || !orders.Any())
            return NotFound($"No orders found for user with ID {userId} and status {status}.");

        var ordersDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
        return Ok(ordersDtos);
    }

    // Create a new order
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] OrderCreateDto orderCreateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var order = _mapper.Map<Order>(orderCreateDto);
        await _unitOfWork.Orders.AddAsync(order);
        await _unitOfWork.SaveChangesAsync();

        var orderDto = _mapper.Map<ProductDto>(order);
        return CreatedAtAction(nameof(GetById), new { id = orderDto.Id }, orderDto);
    }

    //Update an existing Order
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] OrderUpdateDto orderUpdateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existingOrder = await _unitOfWork.Orders.GetByIdAsync(id);
        if (existingOrder == null)
            return NotFound();

        _mapper.Map(orderUpdateDto, existingOrder);
        _unitOfWork.Orders.Update(existingOrder);
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