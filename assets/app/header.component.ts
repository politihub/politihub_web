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

            <li class="dropdown dropdown-notifications">
              <a href="#notifications-panel" class="dropdown-toggle" data-toggle="dropdown">
                <i data-count="2" class="glyphicon glyphicon-bell notification-icon"></i>
              </a>

              <div class="dropdown-container">

                <div class="dropdown-toolbar">
                  <div class="dropdown-toolbar-actions">
                    <a href="#">Mark all as read</a>
                  </div>
                  <h3 class="dropdown-toolbar-title">Notifications (2)</h3>
                </div><!-- /dropdown-toolbar -->

                <ul class="dropdown-menu">
                    ...
                </ul>

                <div class="dropdown-footer text-center">
                  <a href="#">View All</a>
                </div><!-- /dropdown-footer -->

              </div><!-- /dropdown-container -->
            </li><!-- /dropdown -->

            <li><a [routerLink]="['/auth']"><span class="glyphicon glyphicon-user"></span></a></li>
          </ul>


          </div>
        </nav>



    `
})
export class HeaderComponent {

}
