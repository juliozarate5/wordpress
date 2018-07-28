/**
 * Clase servicios posts ionic v2
 */
import { Injectable } from '@angular/core';
import {Post} from './post';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { LoginService } from './login.service';

@Injectable()
export class PostService{

    private options;
    private url = "http://localhost/wordpress/wp-json/wp/v2/posts";//url principal endpoint posts


    constructor(private http: Http, private login: LoginService){
        
        let user = localStorage.getItem("username");
        let passwd = localStorage.getItem("password");
        
        
        let headers = new Headers({
            'Content-type' : 'application/json',
            'Authorization' : 'Basic ' + btoa(`${user}:${passwd}`)// prueba con authorization basic
        });
        this.options = new RequestOptions({ headers: headers});
    }

    /**
     * obtiene todos los posts del endpoint
     * @returns {Observable} response
     */
    getPosts(): Observable <Post[]>{
        let url = `${this.url}`;
        return this.http.get(url, this.options)
                        .map( response => response.json())
                        .catch(this.handleError);
    }

    /**
     * otiene post por id
     * @param id 
     * @returns
     */
    getPostById(id: number): Observable <Post[]>{
        let url = `${this.url}/${id}`;
        return this.http.get(url, this.options)
                        .map(response => response.json())
                        .catch(this.handleError);
    }

    /**
     * Guardar un post nuevo
     * @param post 
     */
    savePost(post: Post){
        let url = `${this.url}`;
       // let author = localStorage.getPost('user');
        let BodyJSON = JSON.stringify({"title": post.title, "content": post.content, "status" : "publish"});
        return this.http.post(url, BodyJSON, this.options)
                .map(response => response.json())
                .catch(this.handleError);
    }

    /**
     * guarda la edición de un post
     * @param post 
     */
    editPost(post: any){
        console.log('servicio...');
        console.log(post);
        let url = `${this.url}/${post.id}`;
        console.log(url);
        let BodyJSON= JSON.stringify({"title": post.title.rendered, "content" : post.content.rendered});
        return this.http.put(url, BodyJSON, this.options)
                .map(response => response.json())
                .catch(this.handleError);
    }

    /**
     * controlador exceptions de peticiones al server
     * @param error 
     */
    public handleError(error: Response | any){
        let errMsg: string;
        if(error instanceof Response){
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }else{
            errMsg = error.message ? error.message: error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}