import { Component } from "@angular/core";

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

}
