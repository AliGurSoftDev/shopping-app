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

        var categoryDtos = _mapper.Map<IEnumerable<CategoryDto>>(category);
        return Ok(categoryDtos);
    }

    // Create a new category
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CategoryCreateDto categoryCreateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var category = _mapper.Map<Category>(categoryCreateDto);
        await _unitOfWork.Categories.AddAsync(category);
        await _unitOfWork.SaveChangesAsync();

        var categoryDto = _mapper.Map<CategoryDto>(category);
        return CreatedAtAction(nameof(GetById), new { id = categoryDto.Id }, categoryDto);
    }

    //Update an existing category
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CategoryUpdateDto categoryUpdateDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existingCategory = await _unitOfWork.Categories.GetByIdAsync(id);
        if (existingCategory == null)
            return NotFound();

        _mapper.Map(categoryUpdateDto, existingCategory);
        _unitOfWork.Categories.Update(existingCategory);
        await _unitOfWork.SaveChangesAsync();

        return NoContent();
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

        return NoContent();
    }
}