import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router){}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    if(!isAuthenticated){
      //this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }
}
