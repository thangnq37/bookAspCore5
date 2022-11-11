import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent implements OnInit {

  public books: any;
  bLogin = true;
  constructor(private service: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  private getBooks(): void{
    this.service.getBooks().subscribe(result => {
      this.books = result;
    });
  }

  public onDelete(id: any): void{
    var bDelete = confirm("Are you delete? "+id);
    if(bDelete){
      this.service.deleteBook(id).subscribe(result => {
        if(result.status === "success"){
          alert("Delete successful!");
          this.getBooks();
        }else{
          alert("Delete Error!");
        }
      });

    }
  }

}
