import { AuthService } from './../../services/auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private authService: AuthService,
		private router: Router
	) { }
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		this.authService.isAuthenticated().then((authenticated: boolean) => {
			if(authenticated === true) {
				return true;
			}
			else {
				this.router.navigate(['/']);
				return false;
			}
		}).catch((error: any) => {
			console.warn(error);
			this.router.navigate(['/']);
			return false;
		});

		return false;
	}

}