import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  bLogin = true;
  constructor(private formBuilder: FormBuilder, private service: BookService,private router: Router ) { }

  public login(): void{
    this.service.login(this.loginForm.value).subscribe(result => {
      if(result.status === "error"){
        alert("login: Information incorrect!");
      }else{
        this.bLogin = false;
        this.service.setToken(result.token);
        this.router.navigate(['/books']);
      }
    });
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void{
    this.loginForm = this.formBuilder.group({
      Email: [],
      Password: []
    });
  }

}
