using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/product")]
public class ProductController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ProductController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    // Get all products
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _unitOfWork.Products.GetAllAsync();
        var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products);
        return Ok(productDtos);
    }

    // Get product by ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _unitOfWork.Products.GetByIdAsync(id);
        if (product == null)
            return NotFound();

        var productDto = _mapper.Map<ProductDto>(product);
        return Ok(productDto);
    }

    // Create a new product
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ProductCreateDto productCreateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var product = _mapper.Map<Product>(productCreateDto);
        await _unitOfWork.Products.AddAsync(product);
        await _unitOfWork.SaveChangesAsync();

        var productDto = _mapper.Map<ProductDto>(product);
        return CreatedAtAction(nameof(GetById), new { id = productDto.Id }, productDto);
    }

    //Update an existing product
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] ProductUpdateDto productUpdateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existingProduct = await _unitOfWork.Products.GetByIdAsync(id);
        if (existingProduct == null)
            return NotFound();

        _mapper.Map(productUpdateDto, existingProduct);
        _unitOfWork.Products.Update(existingProduct);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }

    // Delete a product
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _unitOfWork.Products.GetByIdAsync(id);
        if (product == null)
            return NotFound();

        _unitOfWork.Products.Delete(product);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
    }
}