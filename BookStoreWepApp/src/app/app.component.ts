import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from './book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  title = "BookStoreWepApp";
  token = "";
  bLogin = false;
  constructor(private service: BookService,private router: Router ) { }
  ngOnInit(): void {
    var token = this.service.getToken();
    if(token != ""){
      this.router.navigate(['/books']);
    }
  }

  getBLogin(){
    return this.service.bLogin;
  }
}
