import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

    userName: string;
    logged: boolean;
    private options;
    private url = "http://localhost/wordpress/wp-json/";//url principal endpoint posts

    constructor(private http: Http) {
        this.userName = '';
        this.logged = false;
    }

    /**
     * Realizar login sin importar el usuario
     */

    logIn(user): any {
        let url = `${this.url}`;
        let userJSON = JSON.stringify(user);
        let headers = new Headers({
            'Content-type': 'application/json',
            'Authorization' : 'Basic ' + btoa(`${user.username}:${user.password}`)// prueba con authorization basic
        });
        this.options = new RequestOptions({ headers: headers });

        return this.http.get(url, this.options)
            .map(resp => resp.text())
            .map(resp => {
                if (resp == "error" || resp == "nofound") {
                    this.logged = false;
                } else {
                    localStorage.setItem('token', '1');
                    localStorage.setItem('username', user.username);
                    localStorage.setItem('password', user.password);//esto no es seguro
                    this.logged = true;
                }
                return this.logged;
            });
    }

    /**
     * Cerrar sesión actual
     */

    logOut(): void{
        localStorage.clear();
        this.logged = false;
    }

    /** 
     * Returna el estado de la sesión
     * @returns boolean
    */
    isLogin(): boolean{
        return this.logged;
    }
}
