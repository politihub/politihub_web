import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SigninComponent } from "./signin.component";
import { SignupComponent } from "./signup.component";
import { LogoutComponent } from "./logout.component";
import { authRouting } from "./auth.routing";
import { ProfileComponent } from "./profile.component";


@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent,
        LogoutComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        authRouting
    ]
})
export class AuthModule {

}