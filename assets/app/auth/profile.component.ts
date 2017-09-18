import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";


@Component({
    selector: 'app-profile',
    template: `
        <div class="container-fluid">
          <h2> This will be the profile page! </h2>
        </div>

        <div class="col-md-8 col-md-offset-2">
            <button class="btn btn-danger" (click)="onLogout()">Logout</button>
        </div>

    `
})
export class ProfileComponent {

    constructor(private authService: AuthService, private router: Router) {}
    

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    }

}
