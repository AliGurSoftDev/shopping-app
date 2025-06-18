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

    //Get products by categorId
    [HttpGet("category={categoryId}")]
    public async Task<IActionResult> GetProductByCategory(int categoryId)
    {
        var products = await _unitOfWork.Products.GetByCategoryAsync(categoryId);
        var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products);
        return Ok(productDtos);
    }

    //Get featured products
    [HttpGet("featured")]
    public async Task<IActionResult> GetFeaturedProductsAsync()
    {
        var featuredProducts = await _unitOfWork.Products.GetFeaturedProductsAsync();
        var featuredProductDtos = _mapper.Map<IEnumerable<ProductDto>>(featuredProducts);
        return Ok(featuredProductDtos);
    }

    //Get searched products
    [HttpGet("search={keyword}")]
    public async Task<IActionResult> GetSearchedProductsAsync(string keyword)
    {
        var searchedProducts = await _unitOfWork.Products.GetSearchedProductsAsync(keyword);
        var searchedProductDtos = _mapper.Map<IEnumerable<ProductDto>>(searchedProducts);
        return Ok(searchedProductDtos);
    }

    // Create a new product
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ProductDto productDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var product = _mapper.Map<Product>(productDto);
        await _unitOfWork.Products.AddAsync(product);
        await _unitOfWork.SaveChangesAsync();

        var newProductDto = _mapper.Map<ProductDto>(product);
        return CreatedAtAction(nameof(GetById), new { id = newProductDto.Id }, newProductDto);
    }

    //Update an existing product
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] ProductDto productDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existingProduct = await _unitOfWork.Products.GetByIdAsync(id);
        if (existingProduct == null)
            return NotFound();
        if (productDto.Name.Equals(default))
            _mapper.Map(productDto, existingProduct);
        _unitOfWork.Products.Update(existingProduct);
        await _unitOfWork.SaveChangesAsync();

        return Ok();
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

        return Ok();
    }
}