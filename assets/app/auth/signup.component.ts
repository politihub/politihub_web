import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { User } from "./user.model";
import {FacebookService, LoginOptions, LoginResponse} from 'ngx-facebook';
import { Router } from "@angular/router";


declare const gapi: any;


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;

    public auth2: any;

    constructor(private authService: AuthService, private fb: FacebookService, private router: Router) 
    {
        this.googleInit();

        this.fb.init({
            appId: '118247712173533',
            xfbml: true,
            cookie: true,
            version: 'v2.6'
        });
        
}

    public googleInit() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: '724212024060-i93r90vm7raj01viroet4mbqjivuiu21.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });
            this.attachSignin(document.getElementById('googleBtn'));
        });
    }

    public attachSignin(element) {
        this.auth2.attachClickHandler(element, {},
            (googleUser) => {

                var exists = true;

                let profile = googleUser.getBasicProfile();
                console.log('Token || ' + googleUser.getAuthResponse().id_token);
                console.log('ID: ' + profile.getId());
                console.log('Name: ' + profile.getName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail());
                //YOUR CODE HERE

                var names =  profile.getName().split(" ");
                // console.log(names);

                var user = new User(
                    profile.getEmail(),
                    profile.getId(),
                    names[0],
                    names[1]
                );

                this.authService.userExists(user).subscribe(
                    data => (console.log(data),  this.loginHelper(data, user)), //, exists = data
                    error => console.error(error)
                );
            });
    }

    facebookLogin()
    {
        const loginOptions: LoginOptions = {
            enable_profile_selector: true,
            return_scopes: true,
            scope: 'public_profile,user_friends,email'
        };

        console.log("hey");
        this.fb.login(loginOptions)
        .then((response: LoginResponse) => (console.log(response), this.fb.api('/me?fields=id,email,first_name,last_name')
            .then(res => this.facebookHelper(res))
            .catch(e => console.log(e))))
        .catch((error: any) => console.error(error));

    }

    facebookHelper(res){
        var user = new User(
            res.email,
            res.id,
            res.first_name,
            res.last_name
        );

        this.authService.userExists(user).subscribe(
            data => (console.log(data.message), this.loginHelper(data, user)),
            error => console.error(error)
        );
    }

    loginHelper(data, user){
        if(data.message == "false"){
            this.authService.signup(user)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        }

        console.log('inside');
        this.authService.signin(user)
        .subscribe(
            data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                this.router.navigateByUrl('/');
            },
            error => console.error(error)
        );
    }


    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );
        this.authService.signup(user)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
}