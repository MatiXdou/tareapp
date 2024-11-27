import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../firebase/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectIfAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authService.isLoggedIn();
    if (isAuthenticated) {
      this.router.navigate(['/tareas-pend']);
      return false;
    }
    return true;
  }
}
