import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";
import {FacebookService, LoginOptions, LoginResponse} from 'ngx-facebook';
import { Router } from "@angular/router";


declare const gapi: any;


@Injectable()
export class AuthService {
    constructor(private http: Http, 
                private errorService: ErrorService, 
                private fb: FacebookService,
                private router: Router) 
    {   
        this.googleInit(); 

        this.fb.init({
            appId: '118247712173533',
            xfbml: true,
            cookie: true,
            version: 'v2.6'
        });
    }

    public auth2: any;


    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('https://politihub-app.herokuapp.com/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('https://politihub-app.herokuapp.com/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
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

                let profile = googleUser.getBasicProfile();
                console.log('Token || ' + googleUser.getAuthResponse().id_token);
                console.log('ID: ' + profile.getId());
                console.log('Name: ' + profile.getName());
                console.log('Image URL: ' + profile.getImageUrl());
                console.log('Email: ' + profile.getEmail());
                //YOUR CODE HERE

                var names =  profile.getName().split(" ");
                // console.log(names);

                const user = new User(
                    profile.getEmail(),
                    profile.getId(),
                    names[0],
                    names[1]
                );

                if(!this.userExists(user)){
                    this.signup(user).subscribe(
                        data => console.log(data),
                        error => console.error(error)
                    );
                }

                this.signin(user).subscribe(
                    data => {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('userId', data.userId);
                        // this.router.navigateByUrl('/');
                    },
                    error => console.error(error)
                );

            }, (error) => {
                alert(JSON.stringify(error, undefined, 2));
            });
    }


    facebookLogin(){

        const loginOptions: LoginOptions = {
            enable_profile_selector: true,
            return_scopes: true,
            scope: 'public_profile,user_friends,email'
        };

        this.fb.login(loginOptions)
            .then((response: LoginResponse) => (console.log(response), this.fb.api('/me?fields=id,email,first_name,last_name')
                .then(res =>
                    (console.log(res), this.create(res)))
                .catch(e => console.log(e))))
            .catch((error: any) => console.error(error));

    }

    create(res) {
        const user = new User(
            res.email,
            res.id,
            res.first_name,
            res.last_name
        );

        // console.log(this.fb.getLoginStatus());

        if (!this.userExists(user)) {
            this.signup(user).subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        }

        this.signin(user).subscribe(
            data => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                this.router.navigateByUrl('/');
            },
            error => console.error(error)
        );

    }

    userExists(user: User){
        const body = JSON.stringify(user);
        // console.log(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        var exists = this.http.post('/user/exists', body, {headers: headers})
            .map((response: Response) => console.log(response));
        exists.subscribe(
            data => console.log(data)
        );
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}
