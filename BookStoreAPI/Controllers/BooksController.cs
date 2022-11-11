using BookStoreAPI.Models;
using BookStoreAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;

        public BooksController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }
        [HttpGet("")]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _bookRepository.GetAllBooksAsync();
            return Ok(books);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdBook([FromRoute]int id)
        {
            var book = await _bookRepository.GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost("")]
        public async Task<IActionResult> AddBook([FromBody] BookModel bookModel)
        {
            var id = await _bookRepository.AddBookAsync(bookModel);
            return CreatedAtAction(nameof(GetByIdBook), new {id = id , controller =  "books"}, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook([FromBody] BookModel bookModel, [FromRoute] int id)
        {
            var result = new { status = "success", message = "" };
            try
            {
                await _bookRepository.UpdateBookAsync(id, bookModel);
            }
            catch (Exception ex)
            {
                result = new { status = "error", message = "Error update" };
            }
            return Ok(result);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateBookPatch([FromBody] JsonPatchDocument bookModel, [FromRoute] int id)
        {
            var result = new { status = "success", message = "" };
            try
            {
                await _bookRepository.UpdateBookPatchUpdate(id, bookModel);
            }
            catch (Exception ex)
            {
                result = new { status = "error", message = "Error update" };
            }
            return Ok(result);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook([FromRoute] int id)
        {
            var result = new {status = "success", message=""};
            try
            {
                await _bookRepository.DeleteBookAsync(id);
            }
            catch (Exception ex)
            {
                result = new { status = "error", message = "Error delete" };
            }
            return Ok(result);
        }
    }
}
