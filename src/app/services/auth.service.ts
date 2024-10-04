import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';
  private currentUserSubject : BehaviorSubject<User | null>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
  }

  register(user: User): Observable<User>{
    return this.http.post<User>(this.baseUrl, user);
  }

  login(email: string, password: string): Observable<User>{
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if(users.length > 0){
            localStorage.setItem('currentUser', JSON.stringify(users[0]));
            this.currentUserSubject.next(users[0]);
            return users[0];
          }
          else{
            throw new Error('Invalid login');
          }
        })
      );
  }

  logout(): void{
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): User | null{
    return this.currentUserSubject.value;
  }

  public isAuthenticated(): boolean{
    try{
      if(localStorage.getItem('currentUser')){
        return true;
      }
      return false;
    }
    catch(e){
      return false;
    }
  }
}
