import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private http:HttpClient) { }

  isAuthenticated():boolean{
    if (localStorage.getItem('usermeta')!==null) {
        return true;
    }
    return false;
  }

  currentUser(): any {
    if (localStorage.getItem('usermeta') !== null) {
      let currentUserJson = localStorage.getItem('usermeta') ;    
      return JSON.parse(currentUserJson!);
    }
  }

  canAccess(){
    if (!this.isAuthenticated()) {
        //redirect to login
        this.router.navigate(['/login']);
    }
  }
  canAuthenticate(){
    if (this.isAuthenticated()) {
      //redirect to dashboard
      this.router.navigate(['/dashboard']);
    }
  }

  register(name:string,email:string,password:string){
      //send data to register api (firebase)
     return this.http
      .post<{idToken:string}>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]',
          {displayName:name,email,password}
      );
  }

  storeToken(token:string){
      sessionStorage.setItem('token',token);
  }

  storeLoginUser(data: any){
    localStorage.setItem('usermeta', JSON.stringify(data));

  }

  login(email:string,password:string){
        const loginData  = {
          'email' : email,
          'password' : password
        };
          return this.http
          .post<{idToken:string}>(
              'http://localhost:8081/api/v1/login',
              loginData
          );
  }

  detail(){
    let token = sessionStorage.getItem('token');

    return this.http.post<{users:Array<{localId:string,displayName:string}>}>(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY]',
        {idToken:token}
    );
  }

  removeToken(){
    localStorage.removeItem('usermeta');
  }



}
