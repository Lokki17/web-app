

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class HttpService {
    constructor(private http: Http) {
    }

    getCoffeeKinds() {
        // return this.http.get('http://localhost:8080/kind');
        return this.http.get('coffee.json');
    }
}
