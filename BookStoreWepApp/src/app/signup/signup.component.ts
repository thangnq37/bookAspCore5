import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signForm!: FormGroup;
  bLogin = true;
  constructor(private formBuilder: FormBuilder, private service: BookService,private router: Router ) { }

  public signup(): void{
    this.service.signup(this.signForm.value).subscribe(result => {
      if(result.status){
        if(result.status === "success"){
          alert("Create account successful.");
          this.router.navigate(['']);
        }
      }else{
        var messages = "";
        for (let i = 0; i < result.errors.length ; i++) {
            messages += result.errors[i].description+'\n';
        }
        alert(messages);
      }
    });
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void{
    this.signForm = this.formBuilder.group({
      FirstName: [],
      LastName: [],
      Email: [],
      Password: [],
      confirmPassword: []
    });
  }

}
