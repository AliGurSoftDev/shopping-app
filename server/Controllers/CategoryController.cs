using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/category")]
public class CategoryController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CategoryController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    // Get all categories
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _unitOfWork.Categories.GetAllAsync();
        var categoryDtos = _mapper.Map<IEnumerable<CategoryDto>>(categories);
        return Ok(categoryDtos);
    }

    // Get category by ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var category = await _unitOfWork.Categories.GetByIdAsync(id);
        if (category == null)
            return NotFound();

        var categoryDto = _mapper.Map<CategoryDto>(category);
        return Ok(categoryDto);
    }

    //Get featured categories
    [HttpGet("featured")]
    public async Task<IActionResult> GetFeaturedCategoriesAsync()
    {
        var featuredCategories = await _unitOfWork.Categories.GetFeaturedCategoriesAsync();
        var featuredCategoryDtos = _mapper.Map<IEnumerable<CategoryDto>>(featuredCategories);
        return Ok(featuredCategoryDtos);
    }

    // Create a new category
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CategoryDto categoryDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var category = _mapper.Map<Category>(categoryDto);
        await _unitOfWork.Categories.AddAsync(category);
        await _unitOfWork.SaveChangesAsync();

        var newCategoryDto = _mapper.Map<CategoryDto>(category);
        return CreatedAtAction(nameof(GetById), new { id = newCategoryDto.Id }, newCategoryDto);
    }

    //Update an existing category
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CategoryDto categoryDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existingCategory = await _unitOfWork.Categories.GetByIdAsync(id);
        if (existingCategory == null)
            return NotFound();

        _mapper.Map(categoryDto, existingCategory);
        _unitOfWork.Categories.Update(existingCategory);
        await _unitOfWork.SaveChangesAsync();

        return Ok();
    }

    // Delete a category
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var category = await _unitOfWork.Categories.GetByIdAsync(id);
        if (category == null)
            return NotFound();

        _unitOfWork.Categories.Delete(category);
        await _unitOfWork.SaveChangesAsync();

        return Ok();
    }
}