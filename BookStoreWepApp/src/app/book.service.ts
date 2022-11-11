import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import{ GlobalConstants } from './common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private basePathLogin = 'https://localhost:44301/api/account/login';
  private basePathSignup = 'https://localhost:44301/api/account/signup';
  private basePath = 'https://localhost:44301/api/books';
  private httpOptions = {};
  token: string = '';
  bLogin = false;
  constructor(private http: HttpClient ,private router: Router) {
  }

  private setHttpOtions(){
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.token })
    };
    return this.httpOptions;
  }

  public getBooks(): Observable<any>{
    if(this.token == ''){
      this.router.navigate(['']);
    }
    this.bLogin = true;
    this.setHttpOtions();
    return this.http.get(this.basePath, this.httpOptions);
  }

  public addBook(book: any): Observable<any>{
    this.setHttpOtions();
    return this.http.post(this.basePath, book, this.httpOptions);
  }

  public deleteBook(id: any): Observable<any>{
    this.setHttpOtions();
    return this.http.delete(this.basePath+'/'+id, this.httpOptions);
  }

  public login(login: any): Observable<any>{
    return this.http.post(this.basePathLogin, login);
  }

  public signup(signup: any): Observable<any>{
    return this.http.post(this.basePathSignup, signup);
  }

  public setToken(token: string){
    this.token = token;
  }
  public getToken(){
    return this.token;
  }
}
