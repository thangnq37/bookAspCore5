import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bLogin = true;
  public bookForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private service: BookService,private router: Router) {

  }

  public saveBook(): void{
    this.service.addBook(this.bookForm.value).subscribe(result => {
      alert(`New book added with id = ${result}`);
      this.router.navigate(['/books']);
    });
  }

  ngOnInit(): void {

    if(this.service.getToken()== ''){
      this.router.navigate(['']);
    }
    this.init();
  }

  private init(): void{
    this.bookForm = this.formBuilder.group({
      Title: [],
      Description: []
    });
  }

}
