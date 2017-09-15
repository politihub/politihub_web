import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    template: `
        <nav class="navbar navbar-default">
          <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" [routerLink]="['/messages']">
              <img class="logo" src="/images/logo.png" alt="">
            </a>
          </div>

          <form class="navbar-form navbar-left" role="search">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search">
            </div>
          </form>



          <ul class="nav navbar-nav navbar-right">
            <li><a [routerLink]="['/discover']"><span class="glyphicon glyphicon-dashboard"></span></a></li>

            <li></li>
            <li><a [routerLink]="['/auth']"><span class="glyphicon glyphicon-user"></span></a></li>
          </ul>


          </div>
        </nav>

  <!-- <li><span class="glyphicon glyphicon-bell"></span></li> -->

    `
})
export class HeaderComponent {

}
