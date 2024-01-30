import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationGuard implements CanActivate {

  organization: any;
  id: any;

  constructor(
    private organizationService: OrganizationService,
     private router: Router,
     private auth: AuthService,
     private userService: UserService,
     ) {}

     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const requiredOrganizationId = route.data['organizationId']; // Use bracket notation
    
      // Get the user's organization ID from your service
      const userOrganizationId = this.organizationService.getOrganizationId();
    
      // Check if the user has the required organization ID
      if (userOrganizationId === requiredOrganizationId) {
        return true;
      } else {
        // Redirect to some error page or handle unauthorized access
        this.router.navigateByUrl('/unauthorized');
        return false;
      }
  
    }
  }
