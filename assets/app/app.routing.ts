import { Routes, RouterModule } from "@angular/router";

import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { DiscoverComponent } from "./discover/discover.component";
import { ProfileComponent } from "./profile/profile.component";


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'discover', component: DiscoverComponent },
    { path: 'messages', component: MessagesComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
